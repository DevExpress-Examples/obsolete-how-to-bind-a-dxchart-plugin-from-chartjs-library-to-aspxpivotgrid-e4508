using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace DxSample {
    public partial class index :System.Web.UI.Page {
        protected void Page_Load(object sender, EventArgs e) {
            ((IDataSource)pivotGrid).DataSourceChanged += (s, ea) =>
                pivotGrid.JSProperties["cpChartData"] = pivotGrid.ToJson();
        }
    }
}