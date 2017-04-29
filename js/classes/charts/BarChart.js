// Bar Chart
class BarChart extends ConfiguredChart {
  constructor(ctx) {
    super();
    this.ctx = ctx
    this.type = 'bar';
    this.options.addScales();
    this.options.addYAxes();
    this.options.addTicks('yAxes');
    this.options.setBeginAtZero('yAxes', true);
  }
}
