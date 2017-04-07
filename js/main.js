let DataFrame = dfjs.DataFrame;
let dataset, filteredDataset, tableRenderer, reload
const parent = document.getElementById('parentHolder');

window.onload = function() {
    document.getElementById("queryInput").onfocus = function() {
        document.getElementById("queryInput").removeAttribute("class")
        document.getElementById("applyQueryBtn").disabled = false;
    }

	document.getElementById("addDatasetBtn").onclick = function(e) {
        e.preventDefault();
        addDataset();
    };

    document.getElementById("showFilterBtn").onclick = function(e) {
        e.preventDefault();
        let filtersContainer = document.getElementsByClassName("filterContainer")[0]
        filtersContainer.className += ' visible-filters';
        document.getElementById('showFilterBtn').hidden = true;
        document.getElementById('hideFilterBtn').hidden = false;
        document.getElementById('resetFiltersBtn').hidden = false;
    };

    document.getElementById("hideFilterBtn").onclick = function(e) {
        e.preventDefault();
        let filtersContainer = document.getElementsByClassName("filterContainer")[0]
        filtersContainer.className = 'filterContainer';
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

    document.getElementById("applyDateBtn").onclick = function(e) {
        e.preventDefault();
        applyDateFilter()
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
                document.getElementById('showFilterBtn').removeAttribute("hidden");
                reload = true;
            }
            resetFilters()
            addColumnCheckers(dataset);
            setColumnSelectorValue(dataset);
            setColumnSelectorDate(dataset);
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
    setColumnSelectorValue(dataset)
    setColumnSelectorDate(dataset)
}

function applyRowByParameter(){
    let selector = document.getElementById("columnSelector");
    let errMsgParameter = document.getElementById("errMsgParameter");
    let selectedColumn = selector.options[selector.selectedIndex].value;
    let parameterValue = document.getElementById("parameterValue").value;
    if(!!selectedColumn){    
        let filter = new Filter(filteredDataset)
        let filteredTemp = filter.filterByParameter(selectedColumn, parameterValue)
        if(filteredTemp.dataframe.toArray().length < 1){
            errMsgParameter.innerHTML = "Filter didn't retrieve any data";
        }else{
            errMsgParameter.innerHTML = "";
            filteredDataset = filteredTemp;
            applyColumnFilter();
        }
    }
}

function applyQuery(){
    let textarea = document.getElementById("queryInput");
    let errMsgQuery = document.getElementById("errMsgQuery");
    errMsgQuery.innerHTML = "";
    let query = textarea.value;
    if(query.length > 0){    
        let filter = new Filter(filteredDataset)
        try {
            filteredDataset = filter.filterByQuery(query)
        }
        catch(err) {
            errMsgQuery.innerHTML = err.message;
            textarea.className += " errorTextarea";
            document.getElementById("applyQueryBtn").disabled = true
        }
        filteredDataset = filter.filterByQuery(query)
        applyColumnFilter();
    }
}

function applyDateFilter(){
    errMsgDate.innerHTML = "";
    let selector = document.getElementById("columnSelectorDate");
    let selectedColumn = selector.options[selector.selectedIndex].value;
    let startdate = document.getElementById("startDate").value
    let enddate = document.getElementById("endDate").value    
    let filter = new Filter(filteredDataset)
    let filteredTemp = filter.filterByDate(selectedColumn, startdate, enddate)
    if(!!filteredTemp){
        filteredDataset = filteredTemp
        applyColumnFilter();
    }else{
        errMsgDate.innerHTML = "Fields are not properly filled";
    }
}

function resetFilters(){
    checkAllColumns();
    let filterContainer = document.getElementsByClassName("filterContainer")[0]
    let inputFields = filterContainer.getElementsByTagName("input")
    let selectFields = filterContainer.getElementsByTagName("select")
    let textareaFields = filterContainer.getElementsByTagName("textarea")
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
    let colCheckboxes = document.getElementById("columnsCheckers").getElementsByTagName('input')
    let columnSelector = document.getElementById("columnSelector")
    columnSelector.innerHTML = ""
    let columnNames = dataset.dataframe.listColumns()
    for(let index = columnNames.length - 1; index > -1; index--){
        const selector = document.createElement("option")
        selector.setAttribute("value", columnNames[index])
        selector.innerHTML = columnNames[index]
        if(!colCheckboxes[index].checked){
            selector.disabled = true
        }
            // Get the <ul> element to insert a new node
        columnSelector.insertBefore(selector, columnSelector.firstChild);
    }
    const emptyselector = document.createElement("option")
    emptyselector.innerHTML = "Select column"
    emptyselector.selected = true
    emptyselector.disabled = true
    emptyselector.setAttribute("value", null)
        // Get the <ul> element to insert a new node
    columnSelector.insertBefore(emptyselector, columnSelector.firstChild);
}

function setColumnSelectorDate(dataset){
    let colCheckboxes = document.getElementById("columnsCheckers").getElementsByTagName('input')
    let columnSelectorValue = document.getElementById("columnSelectorDate")
    columnSelectorDate.innerHTML = ""
    let columnNames = dataset.dataframe.listColumns()
    for(let index = columnNames.length - 1; index > -1; index--){
        const selector = document.createElement("option")
        selector.setAttribute("value", columnNames[index])
        selector.innerHTML = columnNames[index]
        if(!colCheckboxes[index].checked || dataset.columns[index].dataTypeName != 'calendar_date'){
            selector.disabled = true
        }
            // Get the <ul> element to insert a new node
        columnSelectorDate.insertBefore(selector, columnSelectorDate.firstChild);
    }
    const emptyselector = document.createElement("option")
    emptyselector.innerHTML = "Select column"
    emptyselector.selected = true
    emptyselector.disabled = true
    emptyselector.setAttribute("value", null)
        // Get the <ul> element to insert a new node
    columnSelectorDate.insertBefore(emptyselector, columnSelectorDate.firstChild);
}