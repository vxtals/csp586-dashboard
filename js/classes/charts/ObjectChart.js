// Upper Object that call Chart.js
class ObjectChart {
  displayChart() {
    const myChart = new Chart(this.ctx, {
        type: this.type,
        data: {
            labels: this.chartLabels,
            datasets: [{
                label: '# of Votes',
                data: this.chartDatas,
                backgroundColor: this.chartColors,
                borderColor: this.chartColors,
                borderWidth: 1
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
