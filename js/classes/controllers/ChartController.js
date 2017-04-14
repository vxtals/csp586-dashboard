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
    let chartFactory = new ChartFactory();
    let ctxBar = document.getElementById("myBarChart").getContext("2d");
    this.myBarChart = chartFactory.createChart('bar',ctxBar);

    this.myBarChart.setLabel('Default Bar Chart');
    this.myBarChart.setChartColorBackground('rgba(255, 99, 132, 1)');
    this.myBarChart.setChartColorBorder('rgba(255, 99, 132, 1)');
    this.myBarChart.setOptions({    
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero:true
              }
          }]
      }
    });
    this.myBarChart.displayChart(ctxBar);

    let ctxLine = document.getElementById("myLineChart").getContext("2d");
    this.myLineChart = chartFactory.createChart('line',ctxLine);

    this.myLineChart.setLabel('Default Line Chart');
    this.myLineChart.displayChart(ctxLine);
    this.myLineChart.setOptions({    
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero:true
              }
          }]
      }
    });
    
    let ctxPie = document.getElementById("myPieChart").getContext("2d");
    this.myPieChart = chartFactory.createChart('pie',ctxPie);

    this.myPieChart.setLabel('Default Pie Chart');
    this.myPieChart.setChartColorBackground('rgba(255, 99, 132, 1)');
    this.myPieChart.setChartColorBorder('rgba(255, 99, 132, 1)');
    this.myPieChart.setOptions();
    
    this.myPieChart.displayChart(ctxPie);
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

      this.displayPieChart(axisValue, selector.value);
      selector.value = null;
    }
  }

  displayLineChart(datas, label) {
    this.myLineChart.remove();

    for (var i = 0; i < datas[0].length; i++) {
      this.myLineChart.addValue(datas[0][i], datas[1][i]);
    }

    this.myLineChart.setLabel(label);
    this.myLineChart.setChartColorBackground('rgba(255, 99, 132, 1)');
    this.myLineChart.setChartColorBorder('rgba(255, 99, 132, 1)');

    this.myLineChart.displayChart();
  }

  displayBarChart(datas, label) {
    this.myBarChart.remove();

    for (var i = 0; i < datas[0].length; i++) {
      this.myBarChart.addBar(new Bar(datas[0][i], datas[1][i]));
    }

    this.myBarChart.setLabel(label);
    let pieColors = this.getRandomColors(datas[0].length);
    this.myBarChart.setChartColorBackground(pieColors);
    this.myBarChart.setChartColorBorder('#FFFFFF');

    this.myBarChart.displayChart();
  }

  displayPieChart(datas, label) {
    this.myPieChart.remove();

    for (var i = 0; i < datas[0].length; i++) {
      this.myPieChart.addValue(datas[0][i], datas[1][i]);
    }

    this.myPieChart.setLabel(label);
    let pieColors = this.getRandomColors(datas[0].length);
    this.myPieChart.setChartColorBackground(pieColors);
    this.myPieChart.setChartColorBorder('#FFFFFF');

    this.myPieChart.displayChart();
  }

  setColumnSelectorBarChart(dataset){
    let columnsCheckers = document.getElementById("columnsCheckers");
    let columnSelectorBar = document.getElementById("columnSelectorBar");
    let colCheckboxes = columnsCheckers.getElementsByTagName('input');

    columnSelectorBar.innerHTML = ""
    let columnNames = dataset.dataframe.listColumns()
    for(let index = columnNames.length - 1; index > -1; index--){
      const selector = document.createElement("option")
      selector.setAttribute("value", columnNames[index])
      selector.innerHTML = columnNames[index]
      if(!colCheckboxes[index].checked){
        selector.disabled = true
      }
      columnSelectorBar.insertBefore(selector, columnSelectorBar.firstChild);
    }

    const emptyselector = document.createElement("option")
    emptyselector.innerHTML = "Select column"
    emptyselector.selected = true
    emptyselector.disabled = true
    emptyselector.setAttribute("value", null)

    columnSelectorBar.insertBefore(emptyselector, columnSelectorBar.firstChild);
  }

  setColumnSelectorLineChart(dataset){
    let columnsCheckers = document.getElementById("columnsCheckers");
    let columnSelectorLine = document.getElementById("columnSelectorLine");
    let colCheckboxes = columnsCheckers.getElementsByTagName('input');

    columnSelectorLine.innerHTML = ""
    let columnNames = dataset.dataframe.listColumns()
    for(let index = columnNames.length - 1; index > -1; index--){
      const selector = document.createElement("option")
      selector.setAttribute("value", columnNames[index])
      selector.innerHTML = columnNames[index]
      if(!colCheckboxes[index].checked){
        selector.disabled = true
      }
      columnSelectorLine.insertBefore(selector, columnSelectorLine.firstChild);
    }

    const emptyselector = document.createElement("option")
    emptyselector.innerHTML = "Select column"
    emptyselector.selected = true
    emptyselector.disabled = true
    emptyselector.setAttribute("value", null)

    columnSelectorLine.insertBefore(emptyselector, columnSelectorLine.firstChild);
  }

  setColumnSelectorPieChart(dataset){
    let columnsCheckers = document.getElementById("columnsCheckers");
    let columnSelectorPie = document.getElementById("columnSelectorPie");
    let colCheckboxes = columnsCheckers.getElementsByTagName('input');

    columnSelectorPie.innerHTML = ""
    let columnNames = dataset.dataframe.listColumns()
    for(let index = columnNames.length - 1; index > -1; index--){
      const selector = document.createElement("option")
      selector.setAttribute("value", columnNames[index])
      selector.innerHTML = columnNames[index]
      if(!colCheckboxes[index].checked){
        selector.disabled = true
      }
      columnSelectorPie.insertBefore(selector, columnSelectorPie.firstChild);
    }

    const emptyselector = document.createElement("option")
    emptyselector.innerHTML = "Select column"
    emptyselector.selected = true
    emptyselector.disabled = true
    emptyselector.setAttribute("value", null)

    columnSelectorPie.insertBefore(emptyselector, columnSelectorPie.firstChild);
  }

  showHideChart(checkbox, chartId) {
      var isChecked = checkbox.checked;
      var showHide = isChecked ?"":"none";
      document.getElementById(chartId).style.display = showHide;
  }

  getRandomColors(number) {
      // 4 basic colors
      let colorsList = [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
              ]
      for(let i = 0; i < number - 4; i++){
        let letters = '0123456789ABCDEF'.split('');
        let color = '#';
        for (let i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        colorsList.push(color);
      }
      return colorsList;
  }
}

ChartController.instance = null;