// Has Option for the Chart
class ConfiguredChart extends BaseChart {
  constructor() {
    super();
    this.chartMainLabels = [];
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
    this.chartMainLabels = [];
    // TODO: Empty all datasets
    //this.chartDatas = [];
  }

  addValue(label) {
    this.chartMainLabels.push(label);
  }
}
