// Bar Chart with list of Bar
class PieChart extends ConfiguredChart {
  constructor(ctx) {
    super();
    this.ctx = ctx
    this.type = 'pie';
  }

  addValue(label, data) {
    this.chartLabels.push(label);
    this.chartDatas.push(data);
  }
}
