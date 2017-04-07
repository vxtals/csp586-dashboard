let DataFrame = dfjs.DataFrame;
let dataset, filteredDataset, tableRenderer, reload
const parent = document.getElementById('parentHolder');

window.onload = function() {

	document.getElementById("addDatasetBtn").onclick = function(e) {
        e.preventDefault();
        addDataset();
    };

    document.getElementById("showFilterBtn").onclick = function(e) {
        e.preventDefault();
        let filterContainer = document.getElementById("filterContainer");
        filterContainer.className = 'visible-filters';
        document.getElementById('showFilterBtn').hidden = true;
        document.getElementById('hideFilterBtn').hidden = false;
    };

    document.getElementById("hideFilterBtn").onclick = function(e) {
        e.preventDefault();
        let filterContainer = document.getElementById("filterContainer");
        filterContainer.className = 'hidden-filters';
        document.getElementById('showFilterBtn').hidden = false;
        document.getElementById('hideFilterBtn').hidden = true;
    };

    document.getElementById("applyColumnFilterBtn").onclick = function(e) {
        e.preventDefault();
        applyColumnFilter();
    };

    document.getElementById("resetFiltersBtn").onclick = function(e) {
        e.preventDefault();
        resetFilters();
    };

    document.getElementById("applyRowByParameterBtn").onclick = function(e) {
        e.preventDefault();
        applyRowByParameter();
    };

    document.getElementById("applyQueryBtn").onclick = function(e) {
        e.preventDefault();
        applyQuery();
    };

    document.getElementById("queryInput").onfocus = function() {
        document.getElementById("queryInput").removeAttribute("class")
        document.getElementById("applyQueryBtn").disabled = false;
    }

    document.getElementById("applyDateBtn").onclick = function(e) {
        e.preventDefault();
        applyDateFilter()
    };

    document.getElementById("applyRangeBtn").onclick = function(e) {
        e.preventDefault();
        applyRangeFilter()
    };


}

function addDataset(){
    const file = document.getElementById('datasetFile').files[0];
    if (file) {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function(e) {
            json = JSON.parse(e.target.result);
            dataset = new Dataset(json);
            filteredDataset = dataset
            tableRenderer = new TableRenderer(parent, dataset);
            tableRenderer.renderTable();
            if(!reload){
                document.getElementById('showFilterBtn').hidden = false;
                document.getElementById('resetFiltersBtn').hidden = false;
                reload = true;
            }
            resetFilters()
            addColumnCheckers(dataset);
            setColumnSelectorValue(dataset);
            setColumnSelectorDate(dataset);
            setColumnSelectorRange(dataset);
        }
    }else{
        alert("You must to select a file!");
    }
}

function applyColumnFilter(){
    let selectedColumns = getCheckedColumns();
    let filter = new Filter(filteredDataset)
    let visibleDataset = filter.filterByColumn(selectedColumns)
    tableRenderer.refreshTable(visibleDataset)
    updateRowCounter(visibleDataset)
    setColumnSelectorValue(dataset)
    setColumnSelectorDate(dataset)
    setColumnSelectorRange(dataset);
}

function applyRowByParameter(){
    let selector = document.getElementById("columnSelector");
    let errMsgParameter = document.getElementById("errMsgParameter");
    let parameterValue = document.getElementById("parameterValue");

    errMsgParameter.innerHTML = "";
    let selectedColumn = selector.options[selector.selectedIndex].value;
    
    if(!selectedColumn || selectedColumn == "null"){
        errMsgParameter.innerHTML = "You must select a column";
    }else{ 
        let filter = new Filter(filteredDataset)
        let filteredTemp = filter.filterByParameter(selectedColumn, parameterValue.value)
        if(filteredTemp.dataframe.toArray().length < 1){
            errMsgParameter.innerHTML = "Filter didn't retrieve any data";
        }else{
            filteredDataset = filteredTemp;
            applyColumnFilter();
        }
    }
}

function applyQuery(){
    let queryInput = document.getElementById("queryInput");
    let errMsgQuery = document.getElementById("errMsgQuery");
    let applyQueryBtn = document.getElementById("applyQueryBtn");

    errMsgQuery.innerHTML = "";
    let query = queryInput.value;
    if(query.length > 0){    
        let filter = new Filter(filteredDataset)
        try {
            filteredDataset = filter.filterByQuery(query)
        }
        catch(err) {
            errMsgQuery.innerHTML = err.message;
            queryInput.className += " error-textarea";
            applyQueryBtn.disabled = true
        }
        filteredDataset = filter.filterByQuery(query)
        applyColumnFilter();
    }else{
        errMsgQuery.innerHTML = "Query is empty.";
    }
}

function applyDateFilter(){
    let errMsgDate = document.getElementById("errMsgDate");
    let columnSelectorDate = document.getElementById("columnSelectorDate");
    let startDate = document.getElementById("startDate");
    let endDate = document.getElementById("endDate");

    errMsgDate.innerHTML = "";
    let selectedColumn = columnSelectorDate.options[columnSelectorDate.selectedIndex].value;   
    if(!selectedColumn || (!startDate.value && !endDate.value)){
        errMsgDate.innerHTML = "Fields are not properly filled";
    }else{
        let filter = new Filter(filteredDataset)
        filteredDataset = filter.filterByRangeOrDate(selectedColumn, startDate.value, endDate.value)
        applyColumnFilter();
    }
}

function applyRangeFilter(){
    let errMsgRange = document.getElementById("errMsgRange");
    let columnSelectorRange = document.getElementById("columnSelectorRange");
    let minRange = document.getElementById("minRange");
    let maxRange = document.getElementById("maxRange");

    errMsgRange.innerHTML = "";
    let selectedColumn = columnSelectorRange.options[columnSelectorRange.selectedIndex].value;     
    if(!selectedColumn || (!minRange.value && !maxRange.value)){
        errMsgRange.innerHTML = "Fields are not properly filled";
    }else{
        let filter = new Filter(filteredDataset)
        filteredDataset = filter.filterByRangeOrDate(selectedColumn, minRange.value, maxRange.value)
        applyColumnFilter();
    }
}

function resetFilters(){
    let filterContainer = document.getElementById("filterContainer");
    let inputFields = filterContainer.getElementsByTagName("input")
    let selectFields = filterContainer.getElementsByTagName("select")
    let textareaFields = filterContainer.getElementsByTagName("textarea")

    checkAllColumns();
    for(let i = 0; i < inputFields.length; i++){
        inputFields[i].value = null
    }
    for(let i = 0; i < selectFields.length; i++){
        selectFields[i].value = null
    }
    for(let i = 0; i < textareaFields.length; i++){
        textareaFields[i].value = null
    }
    filteredDataset = dataset
    tableRenderer.refreshTable(filteredDataset)
    updateRowCounter(filteredDataset);
}

function addColumnCheckers(dataset){
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
            // Get the <ul> element to insert a new node
        columnCheckers.insertBefore(span, columnCheckers.firstChild);
        columnCheckers.insertBefore(checkbox, columnCheckers.firstChild);
    }
}

function getCheckedColumns(){
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

function checkAllColumns(){
    let columnCheckers = document.getElementById("columnsCheckers")
    let colCheckboxes = columnCheckers.getElementsByTagName('input')
    for(let i = 0; i < colCheckboxes.length; i++){
        colCheckboxes[i].checked = true
    }
}

function setColumnSelectorValue(dataset){
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

function setColumnSelectorDate(dataset){
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

function setColumnSelectorRange(dataset){
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

function updateRowCounter(dataset){
    let rowCounter = document.getElementById("rowCounter");
    rowCounter.innerHTML = dataset.dataframe.toArray().length + " rows."
}