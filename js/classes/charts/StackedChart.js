// Stacked Chart
class StackedChart extends BarChart {
  constructor(ctx) {
    super();
    this.ctx = ctx
    this.options.addScales();
    this.options.addYAxes();
    this.options.addTicks('yAxes');
    this.options.setBeginAtZero('yAxes', true);
    this.options.setStacked('yAxes', true);
  }
}
