class BaseChart extends ObjectChart {
  constructor() {
    super();

    // 1D array with in [1=>label of dataset 0, 1=> label of dataset 1, ...]
    this.datasetsLabel = [];

    // 1D array with in [1=>label of the group 0, 1=> label of the group 1, ...]
    this.datasetsLabelGroup = [];

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

  setDatasetLabelGroup(label) {
    this.datasetsLabelGroup = label;
  }

  addDatasetLabelGroup(label) {
    this.datasetsLabelGroup.push(label);
  }

  getDatasetLabelGroup(position) {
    return this.datasetsLabelGroup[position];
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
    const datasetsLabelGroupLength = this.datasetsLabelGroup.length;
    let j = -1;
    let k = 0;

    if (this.datasetsData.length > 1) {
      for (var i = 0; i < this.datasetsData.length; i++) {
        let color = this.getColor();
        if (datasetsLabelGroupLength > 0) {
          j += ((i % datasetsLabelGroupLength == 0) ? 1 : 0);
          k = i % datasetsLabelGroupLength;
          this.datasets.push(
            {
                label: this.datasetsLabel[j]+' - '+this.datasetsLabelGroup[k],
                data: this.datasetsData[i],
                stack: this.datasetsLabelGroup[k],
                borderWidth: 1,
                backgroundColor: color,
                borderColor: color
            }
          )
        } else {
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
