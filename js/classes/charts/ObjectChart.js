// Upper Object that call Chart.js
class ObjectChart {
  displayChart() {
    // TODO : Move this elsewhere and change backgroud color
    const myChart = new Chart(this.ctx, {
        type: this.type,
        data: {
            labels: this.chartLabels,
            datasets: [{
                label: this.chartLabel,
                data: this.chartDatas,
                borderWidth: 1,
                backgroundColor: this.chartColors,
                borderColor: this.chartColors
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
  }
}
