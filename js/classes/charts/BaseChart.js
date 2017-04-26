class BaseChart extends ObjectChart {
  constructor() {
    super();

    // 1D array with in [1=>label of dataset 0, 1=> label of dataset 1, ...]
    this.datasetsLabel = [];

    // 2D array with in [1=> dataset 0, 1=> dataset 1, ...]
    this.datasetsData = [];
  }

  setDatasetLabel(label, position) {
    this.datasetsLabel[position] = label;
  }

  addDatasetLabel(label) {
    this.datasetsLabel.push(label);
  }

  getDatasetLabel(position) {
    return this.datasetsLabel[position];
  }

  setDatasetData(array, position) {
    this.datasetsData[position] = array;
  }

  addDatasetData(array) {
    this.datasetsData.push(array);
  }

  getDatasetData(position) {
    return this.datasetsData[position];
  }

  displayChart() {
    this.datasets = [{
        label: this.datasetsLabel[0],
        data: this.datasetsData[0],
        borderWidth: 1,
        backgroundColor: this.chartColorBackground,
        borderColor: this.chartColorBorder
    }];

    this.datasets.push(
      {
          label: this.datasetsLabel[0],
          data: this.datasetsData[0],
          borderWidth: 1,
          backgroundColor: this.chartColorBackground,
          borderColor: this.chartColorBorder
      }
    )
    this.displayChartJS()
  }

}
