// Upper Object that call Chart.js
class ObjectChart {

  displayChartJS() {
    if(!!this.myChart){
        this.myChart.destroy();
    }
    this.myChart = new Chart(this.ctx, {
        type: this.type,
        data: {
            labels: this.chartMainLabels,
            datasets: this.datasets
        },
        options: this.options.getOptions()
    });
  }
}
