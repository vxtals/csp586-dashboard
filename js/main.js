let DataFrame = dfjs.DataFrame;

window.onload = function() {
  Filter.getInstance();
  DatasetController.getInstance().init();
	FilterController.getInstance().init();
	ChartController.getInstance().init();
}
