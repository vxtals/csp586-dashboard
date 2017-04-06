// Area and settings configuration of the Chart
class BaseChart extends ObjectChart {
  constructor() {
    super();
    this.chartLabel = '# of Label';
    /*
    this.chartArray = {
        type: this.type,
        data: {
            labels: this.chartLabels,
            datasets: [{
                label: this.chartLabel,
                data: this.chartDatas,
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
    }
    if (this.chartColors && this.type == 'bar') {
      const addColor = {
        backgroundColor: this.chartColors,
        borderColor: this.chartColors
      };
      this.chartArray.data.datasets.push({addColor});
    }
    */
  }

  setLabel(label) {
    this.chartLabel = label;
  }
}
