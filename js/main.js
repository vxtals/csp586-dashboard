let DataFrame = dfjs.DataFrame;

window.onload = function() {
    let dataset, tableRenderer
    const parent = document.getElementById('parentHolder');

	document.getElementById("addDatasetBtn").onclick = function(e) {
        e.preventDefault();
        const file = document.getElementById('datasetFile').files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function(e) {
            	json = JSON.parse(e.target.result);
            	dataset = new Dataset(json);
                tableRenderer = new TableRenderer(parent, dataset);
                tableRenderer.renderTable();
                document.getElementById('showFilterBtn').removeAttribute("disabled");
            }
        }else{
        	alert("You must to select a file!");
        }
    };

    document.getElementById("showFilterBtn").onclick = function(e) {
        e.preventDefault();
        document.getElementsByClassName("filterContainer")[0].removeAttribute("hidden");
        addColumnCheckers(dataset);
    };

    document.getElementById("applyColumnFilterBtn").onclick = function(e) {
        e.preventDefault();
        let selectedColumns = getCheckedColumns();
        let filter = new Filter(dataset)
        let filteredDataset = filter.filterByColumn(selectedColumns)
        tableRenderer.reRenderTable(filteredDataset)
    };

    document.getElementById("resetColumnFilterBtn").onclick = function(e) {
        e.preventDefault();
        checkAllColumns();
    };
}

function addColumnCheckers(dataset){
    let columnCheckers = document.getElementsByClassName("columnsCheckers")[0]
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
    let columnCheckers = document.getElementsByClassName("columnsCheckers")[0]
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
    let columnCheckers = document.getElementsByClassName("columnsCheckers")[0]
    let colCheckboxes = columnCheckers.getElementsByTagName('input')
    for(let i = 0; i < colCheckboxes.length; i++){
        colCheckboxes[i].checked = true
    }
}