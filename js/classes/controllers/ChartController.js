class ChartController extends Observer{

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
    this.initPivotChart();
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

  initPivotChart(){
    let chartFactory = new ChartFactory();
    // Creates PivotChart instance.
    let ctxPivot = document.getElementById("myPivotChart").getContext("2d");
    this.myPivotChart = chartFactory.createChart('stacked',ctxPivot);
    this.myPivotChart.setOptionsObject({
        scales: {
            xAxes: [{
                stacked: true,
            }],
            yAxes: [{
                stacked: true
            }]
        }
    });
    this.myPivotChart.displayChart(ctxPivot);
    this.pivotChartRedraw = false;
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
    var selectedColumn = selector.options[selector.selectedIndex].value;
    var selectorValue = selector.value;

    if(!selectedColumn || selectedColumn == "null"){
      selectedColumn = this.selectedColumnBar;
      selectorValue = this.selectorValueBar;
    }

    if(!selectedColumn || selectedColumn == "null"){
      errMsgBar.innerHTML = "You must select a column";
    }else{
      // Values stored to update automatically when dataset is updated
      this.selectedColumnBar = selectedColumn;
      this.selectorValueBar = selectorValue;
      let axisValue = this.filter.getDataset().datasToChartValues(selectorValue);

      this.displayBarChart(axisValue, selectorValue);
      selector.value = null;
    }
  }

  applyColumnSelectorStacked(){
    let selector = document.getElementById("columnSelectorStacked");
    let selector2 = document.getElementById("columnSelectorStacked2");
    let errMsgStacked = document.getElementById("errMsgStacked");

    errMsgStacked.innerHTML = "";
    var selectedColumn = selector.options[selector.selectedIndex].value;
    var selectedColumn2 = selector2.options[selector2.selectedIndex].value;
    var selectorValue = selector.value;
    var selectorValue2 = selector2.value;

    if(!selectedColumn || selectedColumn == "null"){
      selectedColumn = this.selectedColumnStacked;
      selectedColumn2 = this.selectedColumnStacked2;
      selectorValue = this.selectorValueStacked;
      selectorValue2 = this.selectorValueStacked2;
    }

    if(!selectedColumn || selectedColumn == "null" ||
        !selectedColumn2 || selectedColumn2 == "null"){
      errMsgStacked.innerHTML = "You must select two columns";
    }else{
      // Values stored to update automatically when dataset is updated
      this.selectedColumnStacked = selectedColumn;
      this.selectedColumnStacked2 = selectedColumn2;
      this.selectorValueStacked = selectorValue;
      this.selectorValueStacked2 = selectorValue2;
      let axisValue = this.filter.getDataset().twoDatasToChartValues(selectorValue, selectorValue2);

      this.displayStackedChart(axisValue);
      selector.value = null;
      selector2.value = null;
    }
  }

  applyColumnSelectorPivot(){
    let selector = document.getElementById("columnSelectorPivot");
    let selector2 = document.getElementById("columnSelectorPivot2");
    let selector3 = document.getElementById("columnSelectorPivot3");
    let errMsgPivot = document.getElementById("errMsgPivot");

    errMsgPivot.innerHTML = "";
    var selectedColumn = selector.options[selector.selectedIndex].value;
    var selectedColumn2 = selector2.options[selector2.selectedIndex].value;
    var selectedColumn3 = selector3.options[selector3.selectedIndex].value;
    var selectorValue = selector.value;
    var selectorValue2 = selector2.value;
    var selectorValue3 = selector3.value;


    if(!selectedColumn || selectedColumn == "null"){
      // Restore values stored
      selectedColumn = this.selectedColumnPivot;
      selectedColumn2 = this.selectedColumnPivot2;
      selectedColumn3 = this.selectedColumnPivot3;
      selectorValue = this.selectorValuePivot;
      selectorValue2 = this.selectorValuePivot2;
      selectorValue3 = this.selectorValuePivot3;
    }

    if(!selectedColumn || selectedColumn == "null" ||
        !selectedColumn2 || selectedColumn2 == "null"  ||
            !selectedColumn3 || selectedColumn3 == "null"){
      errMsgPivot.innerHTML = "You must select three columns";
    }else{
      // Values stored to update automatically when dataset is updated
      this.selectedColumnPivot = selectedColumn;
      this.selectedColumnPivot2 = selectedColumn2;
      this.selectedColumnPivot3 = selectedColumn3;
      this.selectorValuePivot = selectorValue;
      this.selectorValuePivot2 = selectorValue2;
      this.selectorValuePivot3 = selectorValue3;

      let axisValue = this.filter.getDataset().threeDatasToChartValues(selectorValue, selectorValue2, selectorValue3);
      let totalComb = axisValue[1].length * axisValue[2].length;
      this.myPivotChart.getOptionsObject().setDisplayLegend(totalComb <= 35);

      this.displayPivotChart(axisValue);
      selector.value = null;
      selector2.value = null;
      selector3.value = null;
    }
  }

  applyColumnSelectorLine(){
    let selector = document.getElementById("columnSelectorLine");
    let errMsgLine = document.getElementById("errMsgLine");

    errMsgLine.innerHTML = "";
    var selectedColumn = selector.options[selector.selectedIndex].value;
    var selectorValue = selector.value;

    if(!selectedColumn || selectedColumn == "null"){
      // Restore values stored
      selectedColumn = this.selectedColumnLine;
      selectorValue = this.selectorValueLine;
    }

    if(!selectedColumn || selectedColumn == "null"){
      errMsgLine.innerHTML = "You must select a column";
    }else{
      // Values stored to update automatically when dataset is updated
      this.selectedColumnLine = selectedColumn;
      this.selectorValueLine = selectorValue;

      let axisValue = this.filter.getDataset().datasToChartValues(selectorValue);

      this.displayLineChart(axisValue, selectorValue);
      selector.value = null;
    }
  }

  applyColumnSelectorPie(){
    let selector = document.getElementById("columnSelectorPie");
    let errMsgPie = document.getElementById("errMsgPie");

    errMsgPie.innerHTML = "";
    var selectedColumn = selector.options[selector.selectedIndex].value;
    var selectorValue = selector.value;

    if(!selectedColumn || selectedColumn == "null"){
      selectedColumn = this.selectedColumnPie;
      selectorValue = this.selectorValuePie;
    }

    if(!selectedColumn || selectedColumn == "null"){
      errMsgPie.innerHTML = "You must select a column";
    }else{
      // Values stored to update automatically when dataset is updated
      this.selectedColumnPie = selectedColumn;
      this.selectorValuePie = selectorValue;
      let axisValue = this.filter.getDataset().datasToChartValues(selectorValue);
      //Hide legend when there are too many values
      this.myPieChart.getOptionsObject().setDisplayLegend(axisValue[0].length <= 35);

      this.displayPieChart(axisValue, selectorValue);
      selector.value = null;
    }
  }

  displayBarChart(datas, label) {
    let myDivBarChart = document.getElementById("myDivBarChart");
    let checkBar = document.getElementById("checkBar");
    let tmpArray = [];
    this.showHideChart(checkBar, 'myDivBarChart');

    this.myBarChart.remove();
    for (var i = 0; i < datas[0].length; i++) {
      this.myBarChart.addMainLabel(datas[0][i]);
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

  displayStackedChart(datasSelector) {
    let myDivStackedChart = document.getElementById("myDivStackedChart");
    let checkStacked = document.getElementById("checkStacked");
    let mainDatasetData = [];
    let mainChartLabels = []
    this.showHideChart(checkStacked, 'myDivStackedChart');

    this.myStackedChart.remove();
    // datasSelector[0] => c1 axis
    // datasSelector[1] => c2 axis
    // datasSelector[2] => 2d array of value values[c2][c1]
    this.myStackedChart.addMainLabels(datasSelector[0]);
    this.myStackedChart.setDatasetLabel(datasSelector[1]);
    this.myStackedChart.setDatasetData(datasSelector[2]);
    this.myStackedChart.displayChart();
    this.stackedChartRedraw = true;
  }

  displayPivotChart(datasSelector) {
    let myDivPivotChart = document.getElementById("myDivPivotChart");
    let checkPivot = document.getElementById("checkPivot");
    let mainDatasetData = [];
    let mainChartLabels = []
    this.showHideChart(checkPivot, 'myDivPivotChart');

    this.myPivotChart.remove();
    // datasSelector[0] => c1 axis
    // datasSelector[1] => c2 axis
    // datasSelector[2] => c3 axis
    // datasSelector[3] => 3d array of value values[c3][c2][c1]
    this.myPivotChart.addMainLabels(datasSelector[0]);
    this.myPivotChart.setDatasetLabelGroup(datasSelector[1]);
    this.myPivotChart.setDatasetLabel(datasSelector[2]);
    for (var i = 0; i < datasSelector[3].length; i++) {
      for (var j = 0; j < datasSelector[1].length; j++) {
        this.myPivotChart.addDatasetData(datasSelector[3][i][j]);
      }
    }

    this.myPivotChart.displayChart();
    this.pivotChartRedraw = true;
  }

  displayLineChart(datas, label) {
    let myDivLineChart = document.getElementById("myDivLineChart");
    let checkLine = document.getElementById("checkLine");
    let tmpArray = [];
    this.showHideChart(checkLine, 'myDivLineChart');

    this.myLineChart.remove();

    for (var i = 0; i < datas[0].length; i++) {
      this.myLineChart.addMainLabel(datas[0][i]);
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
      this.myPieChart.addMainLabel(datas[0][i]);
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

  setColumnSelector(dataset, idSelector, nameCol){
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
    emptyselector.innerHTML = nameCol
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

  notify(){
    //Dataset is updated, repaint charts

    if(this.selectedColumnBar)
      this.applyColumnSelectorBar();

    if(this.selectedColumnLine)
      this.applyColumnSelectorLine();

    if(this.selectedColumnPie)
      this.applyColumnSelectorPie();

    if(this.selectedColumnPivot)
      this.applyColumnSelectorPivot();

    if(this.selectedColumnStacked)
      this.applyColumnSelectorStacked();
  }
}

ChartController.instance = null;
