Imports Microsoft.VisualBasic
Imports System
Imports System.Collections.Generic
Imports System.Linq
Imports System.Web
Imports System.Web.UI
Imports System.Web.UI.WebControls

Namespace DxSample
	Partial Public Class index
		Inherits System.Web.UI.Page
		Protected Sub Page_Load(ByVal sender As Object, ByVal e As EventArgs)
			AddHandler (CType(pivotGrid, IDataSource)).DataSourceChanged, Sub(s, ea) pivotGrid.JSProperties("cpChartData") = pivotGrid.ToJson()
		End Sub
	End Class
End Namespace