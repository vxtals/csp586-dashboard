class BaseChart extends ObjectChart {
  constructor() {
    super();
    // Default Label
    this.chartLabel = '# of Label';
  }

  setLabel(label) {
    this.chartLabel = label;
  }

  // TODO: Add datasets
}
