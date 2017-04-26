// Bar Chart with list of Bar
class BarChart extends ConfiguredChart {
  constructor(ctx) {
    super();
    this.ctx = ctx
    this.type = 'bar';
  }

  addValue(label, data) {
    this.chartLabels.push(label);
    this.chartDatas.push(data);
  }
}
