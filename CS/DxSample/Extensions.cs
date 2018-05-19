using DevExpress.Data.ChartDataSources;
using DevExpress.Web.ASPxPivotGrid;
using DevExpress.XtraPivotGrid;
using System.Text;
using System.Web.UI;
using System.Linq;
using System.Collections;
using System.Collections.Generic;
using System;

namespace DxSample {
    public static class Extensions {
        public static string ToJson(this IDataSource dataSource) {
            StringBuilder result = new StringBuilder();
            result.Append("{");
            foreach (string viewName in dataSource.GetViewNames())
                result.AppendFormat("\"{0}\":{1},", string.IsNullOrEmpty(viewName) ?
                    "default" : viewName, new ChartDataSourceCreator(
                        (PivotChartDataSourceView)dataSource.GetView(viewName)).DataSource);
            result.Remove(result.Length - 1, 1);
            result.Append("}");
            return result.ToString();
        }

        class ChartDataSourceCreator {
            List<string> series = new List<string>();

            public ChartDataSourceCreator(PivotChartDataSourceView view) {
                fDataSource.Append("{\"dataSource\":[");
                var data = from i in view.ChartDataSource.Cast<PivotChartDataSourceRowItem>()
                           group i by i.Argument into g
                           select g;
                foreach (var item in data) {
                    fDataSource.AppendFormat("{{\"argument\":\"{0}\",", item.Key);
                    var seriesData = from i in item
                                     select new Tuple<string, object>((string)i.Series, i.Value);
                    CreateSeriesData(seriesData);
                    fDataSource.Append("},");
                }
                fDataSource.Remove(fDataSource.Length - 1, 1);
                fDataSource.Append("],\"series\":[");
                foreach (string s in series)
                    fDataSource.AppendFormat("{{\"name\":\"{0}\",\"valueField\":\"{1}\"}},", s, s.ToSeriesFieldName());
                fDataSource.Remove(fDataSource.Length - 1, 1);
                fDataSource.Append("]}");
            }

            StringBuilder fDataSource = new StringBuilder();
            public string DataSource {
                get { return fDataSource.ToString(); }
            }

            void CreateSeriesData(IEnumerable<Tuple<string, object>> data) {
                foreach (Tuple<string, object> item in data) {
                    fDataSource.AppendFormat("\"{0}\":{1},", item.Item1.ToSeriesFieldName(), item.Item2);
                    if (!series.Contains(item.Item1))
                        series.Add(item.Item1);
                }
                fDataSource.Remove(fDataSource.Length - 1, 1);
            }
        }

        static string ToSeriesFieldName(this string value) {
            return value.Replace(" | ", string.Empty).Replace(" ", "_");
        }
    }
}