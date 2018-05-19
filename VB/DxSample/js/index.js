(function () {
    var viewModel = {
        dataSource: ko.observableArray(),
        series: ko.observableArray()
    };

    window.DxSample = window.DxSample || {};
    DxSample.updateChartData = function (data) {
        if (!data) return;
        var data = $.parseJSON(data);
        viewModel.dataSource(data.default.dataSource);
        viewModel.series(data.default.series);
    }

    $(function () {
        DxSample.updateChartData(pivotGrid.cpChartData);
        ko.applyBindings(viewModel);
    });
})();