let DataFrame = dfjs.DataFrame;
let dataset, filteredDataset, tableRenderer
const parent = document.getElementById('parentHolder');

window.onload = function() {
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
            document.getElementById('showFilterBtn').removeAttribute("hidden");
            addColumnCheckers(dataset);
            setColumnSelector(dataset);
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
    setColumnSelector(dataset)
}

function applyRowByParameter(){
    let selector = document.getElementById("columnSelector");
    let selectedColumn = selector.options[selector.selectedIndex].value;
    let parameterValue = document.getElementById("parameterValue").value;
    if(!!selectedColumn){    
        let filter = new Filter(filteredDataset)
        filteredDataset = filter.filterByParameter(selectedColumn, parameterValue)
        applyColumnFilter();
    }
}

function resetFilters(){
    checkAllColumns();
    filteredDataset = dataset
    tableRenderer.refreshTable(filteredDataset)
}

function addColumnCheckers(dataset){
    let columnCheckers = document.getElementById("columnsCheckers")
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

function setColumnSelector(dataset){
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
    emptyselector.innerHTML = "Select value"
    emptyselector.selected = true
    emptyselector.disabled = true
    emptyselector.setAttribute("value", null)
        // Get the <ul> element to insert a new node
    columnSelector.insertBefore(emptyselector, columnSelector.firstChild);
}