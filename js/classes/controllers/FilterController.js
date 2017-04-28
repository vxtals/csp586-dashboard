class FilterController{

  static getInstance(){
    if(!this.instance){
      this.instance = new FilterController();
    }
    return this.instance;
  }

  init(){
    this.filter = Filter.getInstance();
    this.datasetController = DatasetController.getInstance();
    this.chartController = ChartController.getInstance();
    this.tableRenderer = TableRenderer.getInstance();
    this.view = new FilterView();
  }

  applyRowByParameter(){
    let selector = document.getElementById("columnSelector");
    let errMsgParameter = document.getElementById("errMsgParameter");
    let parameterValue = document.getElementById("parameterValue");

    errMsgParameter.innerHTML = "";
    let selectedColumn = selector.options[selector.selectedIndex].value;

    if(!selectedColumn || selectedColumn == "null"){
      errMsgParameter.innerHTML = "You must select a column";
    }else if(!parameterValue.value){
      errMsgParameter.innerHTML = "You must enter a value";
    }else{
      let exactMatch = document.getElementById("exactMatchValue").checked
      this.filter.filterByParameter(selectedColumn, parameterValue.value, exactMatch)
      parameterValue.value = null;
      this.applyColumnFilter();
    }
  }

  applyQuery(){
    let queryInput = document.getElementById("queryInput");
    let errMsgQuery = document.getElementById("errMsgQuery");
    let applyQueryBtn = document.getElementById("applyQueryBtn");

    errMsgQuery.innerHTML = "";
    let query = queryInput.value;
    if(query.length > 0){
      try {
        this.filter.filterByQuery(query)
      }
      catch(err) {
        errMsgQuery.innerHTML = err.message;
        queryInput.className += " error-textarea";
        applyQueryBtn.disabled = true
      }
      queryInput.value = null;
      this.applyColumnFilter();
    }else{
      errMsgQuery.innerHTML = "Query is empty.";
    }
  }

  applyColumnFilter(){
    let dataset = this.datasetController.getDataset();
    let selectedColumns = this.getCheckedColumns();
    let filteredByColumns = this.filter.filterByColumn(selectedColumns)
    this.tableRenderer.refreshTable(filteredByColumns)
    this.datasetController.updateRowCounter(this.filter.getDataset())
    this.updateDoButtons()
    this.setColumnSelectorValue(dataset)
    this.setColumnSelectorDate(dataset)
    this.setColumnSelectorRange(dataset);

    this.chartController.setColumnSelector(dataset, 'columnSelectorBar');
    this.chartController.setColumnSelector(dataset, 'columnSelectorStacked');
    this.chartController.setColumnSelector(dataset, 'columnSelectorStacked2');
    this.chartController.setColumnSelector(dataset, 'columnSelectorPivot');
    this.chartController.setColumnSelector(dataset, 'columnSelectorPivot2');
    this.chartController.setColumnSelector(dataset, 'columnSelectorPivot3');
    this.chartController.setColumnSelector(dataset, 'columnSelectorLine');
    this.chartController.setColumnSelector(dataset, 'columnSelectorPie');
  }

  applyDateFilter(){
    let errMsgDate = document.getElementById("errMsgDate");
    let columnSelectorDate = document.getElementById("columnSelectorDate");
    let startDate = document.getElementById("startDate");
    let endDate = document.getElementById("endDate");

    errMsgDate.innerHTML = "";
    let selectedColumn = columnSelectorDate.options[columnSelectorDate.selectedIndex].value;
    if(!selectedColumn || selectedColumn == "null"){
      errMsgDate.innerHTML = "You must select a column";
    }else if((!startDate.value && !endDate.value)){
      errMsgDate.innerHTML = "You must select at least one among start and end dates";
    }else{
      this.filter.filterByRangeOrDate(selectedColumn, startDate.value, endDate.value)
      startDate.value = null;
      endDate.value = null;
      this.applyColumnFilter();
    }
  }

  applyRangeFilter(){
    let errMsgRange = document.getElementById("errMsgRange");
    let columnSelectorRange = document.getElementById("columnSelectorRange");
    let minRange = document.getElementById("minRange");
    let maxRange = document.getElementById("maxRange");

    errMsgRange.innerHTML = "";
    let selectedColumn = columnSelectorRange.options[columnSelectorRange.selectedIndex].value;
    if(!selectedColumn || selectedColumn == "null"){
      errMsgRange.innerHTML = "You must select a column";
    }else if((!minRange.value && !maxRange.value)){
      errMsgRange.innerHTML = "You must select at least one among min and max values";
    }else{
      this.filter.filterByRangeOrDate(selectedColumn, minRange.value, maxRange.value)
      minRange.value = null;
      maxRange.value = null;
      this.applyColumnFilter();
    }
  }

  resetFilters(){
    let filterContainer = document.getElementById("filterContainer");
    let inputFields = filterContainer.getElementsByTagName("input")
    let selectFields = filterContainer.getElementsByTagName("select")
    let textareaFields = filterContainer.getElementsByTagName("textarea")

    for(let i = 0; i < inputFields.length; i++){
      if(inputFields[i].getAttribute("type") == "checkbox"){
        inputFields[i].checked = true;
      }else{
        inputFields[i].value = null
      }
    }
    for(let i = 0; i < selectFields.length; i++){
      selectFields[i].value = null
    }
    for(let i = 0; i < textareaFields.length; i++){
      textareaFields[i].value = null
    }
    let dataset = this.datasetController.getDataset();
    this.filter.setDataset(dataset)
    this.tableRenderer.refreshTable(this.filter.getDataset())
    this.datasetController.updateRowCounter(this.filter.getDataset());
    this.updateDoButtons()
  }

  getCheckedColumns(){
    let columnCheckers = document.getElementById("columnsCheckers")
    let colCheckboxes = columnCheckers.getElementsByTagName('input')
    let selectedColumns = []
    for(let i = 0; i < colCheckboxes.length; i++){
      if(colCheckboxes[i].checked){
        selectedColumns.push(colCheckboxes[i].value)
      }
    }
    return selectedColumns;
  }

  setColumnSelectorValue(dataset){
    let columnsCheckers = document.getElementById("columnsCheckers");
    let columnSelector = document.getElementById("columnSelector");
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

  setColumnSelectorDate(dataset){
    let columnsCheckers = document.getElementById("columnsCheckers");
    let columnSelectorDate = document.getElementById("columnSelectorDate");
    let colCheckboxes = columnsCheckers.getElementsByTagName('input');

    columnSelectorDate.innerHTML = "";
    let columnNames = dataset.dataframe.listColumns()
    for(let index = columnNames.length - 1; index > -1; index--){
      const selector = document.createElement("option")
      selector.setAttribute("value", columnNames[index])
      selector.innerHTML = columnNames[index]
      if(!colCheckboxes[index].checked || dataset.columns[index].dataTypeName != 'calendar_date'){
        selector.disabled = true
      }
      columnSelectorDate.insertBefore(selector, columnSelectorDate.firstChild);
    }

    const emptyselector = document.createElement("option")
    emptyselector.innerHTML = "Select column"
    emptyselector.selected = true
    emptyselector.disabled = true
    emptyselector.setAttribute("value", null)

    columnSelectorDate.insertBefore(emptyselector, columnSelectorDate.firstChild);
  }

  setColumnSelectorRange(dataset){
    let columnsCheckers = document.getElementById("columnsCheckers");
    let columnSelectorRange = document.getElementById("columnSelectorRange");
    let colCheckboxes = columnsCheckers.getElementsByTagName('input');

    columnSelectorRange.innerHTML = "";
    let columnNames = dataset.dataframe.listColumns()
    for(let index = columnNames.length - 1; index > -1; index--){
      const selector = document.createElement("option")
      selector.setAttribute("value", columnNames[index])
      selector.innerHTML = columnNames[index]
      if(!colCheckboxes[index].checked || dataset.columns[index].dataTypeName == 'calendar_date'){
        selector.disabled = true
      }
      columnSelectorRange.insertBefore(selector, columnSelectorRange.firstChild);
    }

    const emptyselector = document.createElement("option")
    emptyselector.innerHTML = "Select column"
    emptyselector.selected = true
    emptyselector.disabled = true
    emptyselector.setAttribute("value", null)

    columnSelectorRange.insertBefore(emptyselector, columnSelectorRange.firstChild);
  }

  addColumnCheckers(dataset){
    let columnCheckers = document.getElementById("columnsCheckers")
    columnCheckers.innerHTML = ""
    let columnNames = dataset.dataframe.listColumns()
    for(let index = columnNames.length - 1; index > -1; index--){
      const checkbox = document.createElement("input")
      checkbox.setAttribute("type", "checkbox")
      checkbox.setAttribute("value", columnNames[index])
      checkbox.checked = true;
      const span = document.createElement("span")
      span.className = "checker-name"
      span.innerHTML = columnNames[index]
      columnCheckers.insertBefore(span, columnCheckers.firstChild);
      columnCheckers.insertBefore(checkbox, columnCheckers.firstChild);
    }
  }

  updateDoButtons(){
    document.getElementById('undoBtn').disabled = !this.filter.getUndoStatus();
    document.getElementById('redoBtn').disabled = !this.filter.getRedoStatus();
  }
}
FilterController.instance = null;
