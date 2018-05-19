Imports Microsoft.VisualBasic
Imports DevExpress.Data.ChartDataSources
Imports DevExpress.Web.ASPxPivotGrid
Imports DevExpress.XtraPivotGrid
Imports System.Text
Imports System.Web.UI
Imports System.Linq
Imports System.Collections
Imports System.Collections.Generic
Imports System

Namespace DxSample
	Public Module Extensions
		<System.Runtime.CompilerServices.Extension> _
		Public Function ToJson(ByVal dataSource As IDataSource) As String
			Dim result As New StringBuilder()
			result.Append("{")
			For Each viewName As String In dataSource.GetViewNames()
				result.AppendFormat("""{0}"":{1},",If(String.IsNullOrEmpty(viewName), "default", viewName), New ChartDataSourceCreator(CType(dataSource.GetView(viewName), PivotChartDataSourceView)).DataSource)
			Next viewName
			result.Remove(result.Length - 1, 1)
			result.Append("}")
			Return result.ToString()
		End Function

		Private Class ChartDataSourceCreator
			Private series As New List(Of String)()

			Public Sub New(ByVal view As PivotChartDataSourceView)
				fDataSource.Append("{""dataSource"":[")
				Dim data = _
                    From i In view.ChartDataSource.Cast(Of PivotChartDataSourceRowItem)() _
                    Group i By i.Argument Into Group _
                    Select Argument = Argument, Series = Group
				For Each item In data
                    fDataSource.AppendFormat("{{""argument"":""{0}"",", item.Argument)
                    Dim seriesData = _
                        From i In item.Series _
                        Select New Tuple(Of String, Object)(CStr(i.Series), i.Value)
					CreateSeriesData(seriesData)
					fDataSource.Append("},")
				Next item
				fDataSource.Remove(fDataSource.Length - 1, 1)
				fDataSource.Append("],""series"":[")
				For Each s As String In series
					fDataSource.AppendFormat("{{""name"":""{0}"",""valueField"":""{1}""}},", s, s.ToSeriesFieldName())
				Next s
				fDataSource.Remove(fDataSource.Length - 1, 1)
				fDataSource.Append("]}")
			End Sub

			Private fDataSource As New StringBuilder()
			Public ReadOnly Property DataSource() As String
				Get
					Return fDataSource.ToString()
				End Get
			End Property

			Private Sub CreateSeriesData(ByVal data As IEnumerable(Of Tuple(Of String, Object)))
				For Each item As Tuple(Of String, Object) In data
					fDataSource.AppendFormat("""{0}"":{1},", item.Item1.ToSeriesFieldName(), item.Item2)
					If (Not series.Contains(item.Item1)) Then
						series.Add(item.Item1)
					End If
				Next item
				fDataSource.Remove(fDataSource.Length - 1, 1)
			End Sub
		End Class

		<System.Runtime.CompilerServices.Extension> _
		Private Function ToSeriesFieldName(ByVal value As String) As String
			Return value.Replace(" | ", String.Empty).Replace(" ", "_")
		End Function
	End Module
End Namespace