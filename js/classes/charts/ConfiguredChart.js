// Has Option and Configuration for the Chart
class ConfiguredChart extends BaseChart {
  constructor() {
    super();
    this.chartLabels = [];
    this.chartDatas = [];
    this.chartColors = [];
  }

  /*
  addValue(label, data, color = "") {
    this.chartLabels.push(label);
    this.chartDatas.push(data);
    if (color != null) {
      this.chartColors.push(color);
    }
  }

  addValues(labels, datas, colors = []) {
    labels.map((label) => {
       this.chartLabels.push(label);
    });
    datas.map((data) => {
       this.chartDatas.push(data);
    });
    if (colors.length != 0 && this.type == 'bar') {
      colors.map((color) => {
         this.chartColors.push(color);
      });
    }
  }
  */
}
