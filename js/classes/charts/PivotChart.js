// Pivot Chart
class PivotChart extends StackedChart {
  constructor(ctx) {
    super();
    this.ctx = ctx;
    this.options.setStacked('xAxes', true);
  }
}
