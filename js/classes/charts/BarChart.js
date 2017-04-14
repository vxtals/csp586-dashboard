// Bar Chart with list of Bar
class BarChart extends ConfiguredChart {
  constructor(ctx) {
    super();
    this.ctx = ctx
    this.type = 'bar';
  }

  addBar(bar) {
    this.chartLabels.push(bar.label);
    this.chartDatas.push(bar.data);
  }

  addBars(bars) {
    bars.map((bar) => {
      this.chartLabels.push(bar.label);
      this.chartDatas.push(bar.data);
    });
  }
}
