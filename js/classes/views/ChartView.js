class ChartView{

  constructor(){
    this.cc = ChartController.getInstance();
    this.filter = Filter.getInstance();
    this.addControlListeners();
    this.addChartListeners();
  }

  addControlListeners(){
    document.getElementById("showChartBtn").onclick = function(e) {
      e.preventDefault();
      let chartContainer = document.getElementById("chartContainer");
      chartContainer.className = 'visible-charts';
      document.getElementById('showChartBtn').hidden = true;
      document.getElementById('hideChartBtn').hidden = false;
    };

    document.getElementById("hideChartBtn").onclick = function(e) {
      e.preventDefault();
      let chartContainer = document.getElementById("chartContainer");
      chartContainer.className = 'hidden-charts';
      document.getElementById('showChartBtn').hidden = false;
      document.getElementById('hideChartBtn').hidden = true;
    };
  }

  addChartListeners(){
    let view = this;

    document.getElementById("applyColumnSelectorBar").onclick = function(e) {
      e.preventDefault();
      view.cc.applyColumnSelectorBar();
    };

    document.getElementById("applyColumnSelectorStacked").onclick = function(e) {
      e.preventDefault();
      view.cc.applyColumnSelectorStacked();
    };

    document.getElementById("applyColumnSelectorLine").onclick = function(e) {
      e.preventDefault();
      view.cc.applyColumnSelectorLine();
    };

    document.getElementById("applyColumnSelectorPie").onclick = function(e) {
      e.preventDefault();
      view.cc.applyColumnSelectorPie();
    };

    document.getElementById("checkPie").onchange = function(e) {
      e.preventDefault();
      if(!this.checked || view.cc.pieChartRedraw){
        view.cc.showHideChart(this, 'myDivPieChart');
      }
    };

    document.getElementById("checkBar").onchange = function(e) {
      e.preventDefault();
      if(!this.checked || view.cc.barChartRedraw){
        view.cc.showHideChart(this, 'myDivBarChart');
      }
    };

    document.getElementById("checkStacked").onchange = function(e) {
      e.preventDefault();
      if(!this.checked || view.cc.stackedChartRedraw){
        view.cc.showHideChart(this, 'myDivStackedChart');
      }
    };

    document.getElementById("checkLine").onchange = function(e) {
      e.preventDefault();
      if(!this.checked || view.cc.lineChartRedraw){
        view.cc.showHideChart(this, 'myDivLineChart');
      }
    };

  }
}
