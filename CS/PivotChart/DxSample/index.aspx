<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="index.aspx.cs" Inherits="DxSample.index" %>

<%@ Register Assembly="DevExpress.Web.ASPxPivotGrid.v12.2, Version=12.2.0.0, Culture=neutral, PublicKeyToken=79868b8147b5eae4" Namespace="DevExpress.Web.ASPxPivotGrid" TagPrefix="dxpg"  %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <link rel="stylesheet" type="text/css" href="css/dxtreme.desktop.default-12.2.css" />
    <link rel="stylesheet" type="text/css" href="css/site.css" />
    <script type="text/javascript" src="js/jquery-1.7.2.min.js"></script>
    <script type="text/javascript" src="js/knockout-2.1.0.js"></script>
    <script type="text/javascript" src="js/globalize.js"></script>
    <script type="text/javascript" src="js/dxtreme.core-12.2.js"></script>
    <script type="text/javascript" src="js/dxtreme.framework-12.2.js"></script>
    <script type="text/javascript" src="js/dxtreme.viz-12.2.js"></script>
    <script type="text/javascript" src="js/index.js"></script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <dxpg:ASPxPivotGrid runat="server" DataSourceID="salesPersonSource" ID="pivotGrid" ClientInstanceName="pivotGrid">
            <Fields>
                <dxpg:PivotGridField FieldName="CategoryName" Area="RowArea" />
                <dxpg:PivotGridField FieldName="ProductName" Area="FilterArea" />
                <dxpg:PivotGridField FieldName="Country" Area="ColumnArea" />
                <dxpg:PivotGridField FieldName="Sales Person" Area="FilterArea" />
                <dxpg:PivotGridField FieldName="Extended Price" Area="DataArea" />
            </Fields>
            <ClientSideEvents EndCallback="function(s, e) { window.DxSample.updateChartData(pivotGrid.cpChartData); }" />
        </dxpg:ASPxPivotGrid>
        <asp:AccessDataSource runat="server" SelectCommand="select Country, ProductName, CategoryName, [Extended Price], [Sales Person] from SalesPerson" ID="salesPersonSource" DataFile="~/app_data/nwind.mdb" />
        <div class="chart-container" data-bind="dxChart: { commonSeriesSettings: { argumentField: 'argument' }, series: series, dataSource: dataSource }"></div>
    </div>
    </form>
</body>
</html>