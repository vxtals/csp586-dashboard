// Bar Chart with list of Bar
class StackedChart extends BarChart {
  constructor(ctx) {
    super();
    this.ctx = ctx
    // TODO: Here
    this.options.setOptionsObject({
      scales: {
          yAxes: [{
              stacked: true,
              ticks: {
                  beginAtZero:true
              }
          }]
      }
    });
  }
}
