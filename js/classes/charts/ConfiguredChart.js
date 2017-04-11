// Has Option and Configuration for the Chart
class ConfiguredChart extends BaseChart {
  constructor() {
    super();
    this.chartLabels = [];
    this.chartDatas = [];
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
