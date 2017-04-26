class ChartController{

  static getInstance(){
    if(!this.instance){
      this.instance = new ChartController();
    }
    return this.instance;
  }

  init(){
    this.filter = Filter.getInstance();
    this.view = new ChartView();

    this.initBarChart();
    this.initStackedChart();
    this.initLineChart();
    this.initPieChart();
  }

  initBarChart(){
    let chartFactory = new ChartFactory();
    // Creates BarChart instance.
    let ctxBar = document.getElementById("myBarChart").getContext("2d");
    this.myBarChart = chartFactory.createChart('bar',ctxBar);
    this.myBarChart.setOptionsObject({
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero:true
              }
          }]
      }
    });
    this.myBarChart.displayChart(ctxBar);
    this.barChartRedraw = false;
  }

  initStackedChart(){
    let chartFactory = new ChartFactory();
    // Creates StackedChart instance.
    let ctxStacked = document.getElementById("myStackedChart").getContext("2d");
    this.myStackedChart = chartFactory.createChart('stacked',ctxStacked);
    this.myStackedChart.setOptionsObject({
      scales: {
          yAxes: [{
              stacked: true,
              ticks: {
                  beginAtZero:true
              }
          }]
      }
    });
    this.myStackedChart.displayChart(ctxStacked);
    this.stackedChartRedraw = false;
  }

  initLineChart(){
    let chartFactory = new ChartFactory();
    // Creates LineChart instance.
    let ctxLine = document.getElementById("myLineChart").getContext("2d");
    this.myLineChart = chartFactory.createChart('line',ctxLine);
    this.myLineChart.setOptionsObject({
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero:true
              }
          }]
      }
    });
    this.myLineChart.displayChart(ctxLine);
    this.lineChartRedraw = false;
  }

  initPieChart(){
    let chartFactory = new ChartFactory();
    // Creates PieChart instance.
    let ctxPie = document.getElementById("myPieChart").getContext("2d");
    this.myPieChart = chartFactory.createChart('pie',ctxPie);
    this.myPieChart.setOptionsObject({});
    this.myPieChart.displayChart(ctxPie);
    this.pieChartRedraw = false;
  }

  applyColumnSelectorBar(){
    let selector = document.getElementById("columnSelectorBar");
    let errMsgBar = document.getElementById("errMsgBar");

    errMsgBar.innerHTML = "";
    let selectedColumn = selector.options[selector.selectedIndex].value;

    if(!selectedColumn || selectedColumn == "null"){
      errMsgBar.innerHTML = "You must select a column";
    }else{
      let axisValue = this.filter.getDataset().datasToChartValues(selector.value);

      this.displayBarChart(axisValue, selector.value);
      selector.value = null;
    }
  }

  applyColumnSelectorStacked(){
    let selector = document.getElementById("columnSelectorStacked");
    let selector2 = document.getElementById("columnSelectorStacked2");
    let errMsgStacked = document.getElementById("errMsgStacked");

    errMsgStacked.innerHTML = "";
    let selectedColumn = selector.options[selector.selectedIndex].value;
    let selectedColumn2 = selector2.options[selector2.selectedIndex].value;

    if(!selectedColumn || selectedColumn == "null" ||
        !selectedColumn2 || selectedColumn2 == "null"){
      errMsgStacked.innerHTML = "You must select two columns";
    }else{
      let axisValue = this.filter.getDataset().datasToChartValues(selector.value);

      this.displayStackedChart(axisValue, selector.value);
      selector.value = null;
      selector2.value = null;
    }
  }

  applyColumnSelectorLine(){
    let selector = document.getElementById("columnSelectorLine");
    let errMsgLine = document.getElementById("errMsgLine");

    errMsgLine.innerHTML = "";
    let selectedColumn = selector.options[selector.selectedIndex].value;

    if(!selectedColumn || selectedColumn == "null"){
      errMsgLine.innerHTML = "You must select a column";
    }else{
      let axisValue = this.filter.getDataset().datasToChartValues(selector.value);

      this.displayLineChart(axisValue, selector.value);
      selector.value = null;
    }
  }

  applyColumnSelectorPie(){
    let selector = document.getElementById("columnSelectorPie");
    let errMsgPie = document.getElementById("errMsgPie");

    errMsgPie.innerHTML = "";
    let selectedColumn = selector.options[selector.selectedIndex].value;

    if(!selectedColumn || selectedColumn == "null"){
      errMsgPie.innerHTML = "You must select a column";
    }else{
      let axisValue = this.filter.getDataset().datasToChartValues(selector.value);
      //Hide legend when there are too many values
      this.myPieChart.getOptionsObject().setDisplayLegend(axisValue[0].length <= 35);

      this.displayPieChart(axisValue, selector.value);
      selector.value = null;
    }
  }

  displayBarChart(datas, label) {
    let myDivBarChart = document.getElementById("myDivBarChart");
    let checkBar = document.getElementById("checkBar");
    let tmpArray = [];
    this.showHideChart(checkBar, 'myDivBarChart');

    this.myBarChart.remove();
    // TODO HERE
    for (var i = 0; i < datas[0].length; i++) {
      this.myBarChart.addValue(datas[0][i]);
      tmpArray.push(datas[1][i]);
    }

    this.myBarChart.addDatasetData(tmpArray);
    this.myBarChart.setDatasetLabel(label, 0);
    let color = this.getColor();
    this.myBarChart.setChartColorBackground(color);
    this.myBarChart.setChartColorBorder(color);

    this.myBarChart.displayChart();
    this.barChartRedraw = true;
  }

  displayStackedChart(datas, label) {
    let myDivStackedChart = document.getElementById("myDivStackedChart");
    let checkStacked = document.getElementById("checkStacked");
    let tmpArray = [];
    this.showHideChart(checkStacked, 'myDivStackedChart');

    this.myStackedChart.remove();

    for (var i = 0; i < datas[0].length; i++) {
      this.myStackedChart.addValue(datas[0][i]);
      tmpArray.push(datas[1][i]);
    }

    this.myStackedChart.addDatasetData(tmpArray);
    this.myStackedChart.setDatasetLabel(label, 0);
    let color = this.getColor();
    this.myStackedChart.setChartColorBackground(color);
    this.myStackedChart.setChartColorBorder(color);

    this.myStackedChart.displayChart();
    this.stackedChartRedraw = true;
  }

  displayLineChart(datas, label) {
    let myDivLineChart = document.getElementById("myDivLineChart");
    let checkLine = document.getElementById("checkLine");
    let tmpArray = [];
    this.showHideChart(checkLine, 'myDivLineChart');

    this.myLineChart.remove();

    for (var i = 0; i < datas[0].length; i++) {
      this.myLineChart.addValue(datas[0][i]);
      tmpArray.push(datas[1][i]);
    }

    this.myLineChart.addDatasetData(tmpArray);
    this.myLineChart.setDatasetLabel(label, 0);
    let color = this.getColor();
    this.myLineChart.setChartColorBackground(color);
    this.myLineChart.setChartColorBorder(color);

    this.myLineChart.displayChart();
    this.lineChartRedraw = true;
  }

  displayPieChart(datas, label) {
    let myDivPieChart = document.getElementById("myDivPieChart");
    let checkPie = document.getElementById("checkPie");
    let tmpArray = [];
    this.showHideChart(checkPie, 'myDivPieChart');

    this.myPieChart.remove();

    for (var i = 0; i < datas[0].length; i++) {
      this.myPieChart.addValue(datas[0][i]);
      tmpArray.push(datas[1][i]);
    }

    this.myPieChart.addDatasetData(tmpArray);
    this.myPieChart.setDatasetLabel(label, 0);
    let pieColors = this.getRandomColors(datas[0].length);
    this.myPieChart.setChartColorBackground(pieColors);
    this.myPieChart.setChartColorBorder(pieColors);

    this.myPieChart.displayChart();
    this.pieChartRedraw = true;
  }

  setColumnSelector(dataset, idSelector){
    let columnsCheckers = document.getElementById("columnsCheckers");
    let columnSelector = document.getElementById(idSelector);
    let colCheckboxes = columnsCheckers.getElementsByTagName('input');

    columnSelector.innerHTML = ""
    let columnNames = dataset.dataframe.listColumns()
    for(let index = columnNames.length - 1; index > -1; index--){
      const selector = document.createElement("option")
      selector.setAttribute("value", columnNames[index])
      selector.innerHTML = columnNames[index]
      if(!colCheckboxes[index].checked){
        selector.disabled = true
      }
      columnSelector.insertBefore(selector, columnSelector.firstChild);
    }

    const emptyselector = document.createElement("option")
    emptyselector.innerHTML = "Select column"
    emptyselector.selected = true
    emptyselector.disabled = true
    emptyselector.setAttribute("value", null)

    columnSelector.insertBefore(emptyselector, columnSelector.firstChild);
  }

  showHideChart(checkbox, chartId) {
      var isChecked = checkbox.checked;
      var showHide = isChecked ?"":"none";
      document.getElementById(chartId).style.display = showHide;
  }

  getColor() {
    let color = '#';
    let letters = '0123456789ABCDEF'.split('');
      for (let i = 0; i < 6; i++ ) {
          color += letters[Math.floor(Math.random() * 16)];
      }
    return color;
  }

  getRandomColors(number) {
      // 4 basic colors
      let colorsList = [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
              ]
      for(let i = 0; i < number - 4; i++){
        let color = this.getColor();
        colorsList.push(color);
      }
      return colorsList;
  }
}

ChartController.instance = null;
