// Upper Object that call Chart.js
class ObjectChart {

  displayChart() {
    if(!!this.myChart){
        this.myChart.destroy();
    }
    this.myChart = new Chart(this.ctx, {
        type: this.type,
        data: {
            labels: this.chartMainLabels,
            datasets: [{
                label: this.datasetsLabel[0],
                data: this.datasetsData[0],
                borderWidth: 1,
                backgroundColor: this.chartColorBackground,
                borderColor: this.chartColorBorder
            },{
                label: this.datasetsLabel[0],
                data: this.datasetsData[0],
                borderWidth: 1,
                backgroundColor: this.chartColorBackground,
                borderColor: this.chartColorBorder
            }]
        },
        options: this.options.getOptions()
    });
  }
}
