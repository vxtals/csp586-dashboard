// Stacked Chart
class StackedChart extends BarChart {
  constructor(ctx) {
    super();
    this.ctx = ctx;
    this.options.setStacked('yAxes', true);
  }
}
