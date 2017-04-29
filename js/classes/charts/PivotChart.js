// Pivot Chart
class PivotChart extends StackedChart {
  constructor(ctx) {
    super();
    this.ctx = ctx;
    this.options.addScales();
    this.options.addYAxes();
    this.options.addXAxes();
    this.options.setStacked('yAxes', true);
    this.options.setStacked('xAxes', true);
  }
}
