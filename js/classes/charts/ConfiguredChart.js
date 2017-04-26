// Has Option and Configuration for the Chart
class ConfiguredChart extends BaseChart {
  constructor() {
    super();
    this.chartLabels = [];
    this.chartDatas = [];
    this.options = new Options({});
  }

  setOptionsObject(options){
    this.options = new Options(options);
  }

  getOptionsObject(){
    return this.options;
  }

  setChartColorBackground(color) {
    this.chartColorBackground = color
  }

  setChartColorBorder(color) {
    this.chartColorBorder = color
  }

  remove() {
    this.chartLabels = [];
    this.chartDatas = [];
  }
}
