class DatasetController{

  static getInstance(){
    if(!this.instance){
      this.instance = new DatasetController();
    }
    return this.instance;
  }

  init(){
    this.filter = Filter.getInstance();
    this.view = new DatasetView();
    this.reload = false;
  }

  getDataset(){
    return this.dataset;
  }

  processJson(rawJson){
    let json = JSON.parse(rawJson);
    this.dataset = new Dataset(json);
    this.filter.setDataset(this.dataset);
    let parent =  document.getElementById('parentHolder');
    let tableRenderer = TableRenderer.getInstance();
    tableRenderer.initTableRenderer(parent, this.filter.getDataset());
    tableRenderer.renderTable();
    this.setFilters(this.dataset);
    this.setCharts(this.dataset);
    if(!this.reload){
      this.reload = true;
    }
    document.getElementById("startSteps").className = "hidden-steps";
    document.getElementById("newDatasetBtn").className = "";
    document.getElementById("loadingGlass").hidden = true;
    document.getElementById("loadingGlassMsg").innerHTML = "";

  }

  setFilters(dataset){
    let filterController = FilterController.getInstance();
    if(!this.reload){
      document.getElementById('showFilterBtn').hidden = false;
      document.getElementById('resetFiltersBtn').hidden = false;
      document.getElementById('undoBtn').hidden = false;
      document.getElementById('redoBtn').hidden = false;
      filterController.updateDoButtons()
    }
    filterController.resetFilters()
    filterController.addColumnCheckers(dataset);
    filterController.setColumnSelectorValue(dataset);
    filterController.setColumnSelectorDate(dataset);
    filterController.setColumnSelectorRange(dataset);
  }

  setCharts(dataset){
    let chartController = ChartController.getInstance();
    if(!this.reload){
      document.getElementById('showChartBtn').hidden = false;
    }
    chartController.setColumnSelector(dataset, 'columnSelectorBar', 'Select Axis');
    chartController.setColumnSelector(dataset, 'columnSelectorStacked', 'Select Axis');
    chartController.setColumnSelector(dataset, 'columnSelectorStacked2', 'Select Stacked Data');
    chartController.setColumnSelector(dataset, 'columnSelectorPivot', 'Select Axis');
    chartController.setColumnSelector(dataset, 'columnSelectorPivot2', 'Select Grouped Data');
    chartController.setColumnSelector(dataset, 'columnSelectorPivot3', 'Select Stacked Data');
    chartController.setColumnSelector(dataset, 'columnSelectorLine', 'Select Axis');
    chartController.setColumnSelector(dataset, 'columnSelectorPie', 'Select Axis');
  }

  addRemoteDataset(url, estimatedSize)
  {
      let controller = this;
      let loadingGlass = document.getElementById("loadingGlass");
      let loadingGlassMsg = document.getElementById("loadingGlassMsg");
      loadingGlass.hidden = false;
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onprogress = function(evt) {
        if(!!estimatedSize){
          var percentComplete = (evt.loaded / estimatedSize)*100;
          loadingGlassMsg.innerHTML = "Downloading dataset " + Math.trunc(percentComplete) + " %";
        }
      }
      xmlHttp.onreadystatechange = function() {
          if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
            loadingGlassMsg.innerHTML = "Converting JSON ...";
            setTimeout(function() {
              controller.processJson(xmlHttp.responseText)
            }, 100);
          }
      }
      xmlHttp.open("GET", url, true);
      xmlHttp.send(null);
  }

  addLocalDataset(file){
    let controller = this;
    if (file) {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function(e) {
        document.getElementById("loadingGlass").hidden = false;
        document.getElementById("loadingGlassMsg").innerHTML = "Converting JSON ...";
        setTimeout(function() {
          controller.processJson(e.target.result)
        }, 100);
      }
    }else{
      alert("You must to select a file!");
    }
  }

  updateRowCounter(dataset){
    let rowCounter = document.getElementById("rowCounter");
    rowCounter.innerHTML = dataset.dataframe.toArray().length + " rows."
  }
}

DatasetController.instance = null;
