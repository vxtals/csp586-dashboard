// Bar Chart with list of Bar
class LineChart extends ConfiguredChart {
  constructor(ctx) {
    super();
    this.ctx = ctx
    this.type = 'line';
    this.options.addScales();
    this.options.addYAxes();
    this.options.addTicks('yAxes');
    this.options.setBeginAtZero('yAxes', true);
  }
}
