// Represent each Bar in the Bar Chart
class Bar {
  constructor(label, data, color) {
    this.label = label;
    this.data = data;
  }

  getLabel() {
    return this.label
  }

  getData() {
    return this.data
  }
}
