// Has Option and Configuration for the Chart
class ConfiguredChart extends BaseChart {
  constructor() {
    super();
    this.chartLabels = [];
    this.chartDatas = [];
  }

  addValue(label, data) {
    this.chartLabels.push(label);
    this.chartDatas.push(data);
  }

  addValues(labels, datas) {
    labels.map((label) => {
       this.chartLabels.push(label);
    });
    datas.map((data) => {
       this.chartDatas.push(data);
    });
  }
}
