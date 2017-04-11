// Represent each Bar in the Bar Chart
class Bar {
  constructor(label, data, color) {
    this.label = label;
    this.data = data;
    this.color = color;
  }

  getLabel() {
    return this.label
  }

  getData() {
    return this.data
  }

  getColor() {
    return this.color
  }
}
