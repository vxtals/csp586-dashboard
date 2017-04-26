class BaseChart extends ObjectChart {
  constructor() {
    super();

    // 1D array with in [1=>label of dataset 0, 1=> label of dataset 1, ...]
    this.datasetsLabel = [];

    // 2D array with in [1=> dataset 0, 1=> dataset 1, ...]
    this.datasetsData = [];
  }

  setDatasetLabel(label) {
    this.datasetsLabel = label;
  }

  addDatasetLabel(label) {
    this.datasetsLabel.push(label);
  }

  getDatasetLabel(position) {
    return this.datasetsLabel[position];
  }

  setDatasetData(array) {
    this.datasetsData = array;
  }

  addDatasetData(array) {
    this.datasetsData.push(array);
  }

  getDatasetData(position) {
    return this.datasetsData[position];
  }

  displayChart() {

    this.datasets = [];

    if (this.datasetsData.length > 1) {
      for (var i = 0; i < this.datasetsData.length; i++) {
        let color = this.getColor();
        this.datasets.push(
          {
              label: this.datasetsLabel[i],
              data: this.datasetsData[i],
              borderWidth: 1,
              backgroundColor: color,
              borderColor: color
          }
        )
      }
    } else {
      this.datasets = [{
          label: this.datasetsLabel,
          data: this.datasetsData[0],
          borderWidth: 1,
          backgroundColor: this.chartColorBackground,
          borderColor: this.chartColorBorder
      }];
    }

    this.displayChartJS()
  }

  getColor() {
    let color = '#';
    let letters = '0123456789ABCDEF'.split('');
      for (let i = 0; i < 6; i++ ) {
          color += letters[Math.floor(Math.random() * 16)];
      }
    return color;
  }


}
