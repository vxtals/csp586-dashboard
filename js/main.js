let DataFrame = dfjs.DataFrame;
let dataset, filter, filteredDataset, tableRenderer, reload
const parent = document.getElementById('parentHolder');

window.onload = function() {

	document.getElementById("addDatasetBtn").onclick = function(e) {
		e.preventDefault();
		addDataset();
	};
/*
	document.getElementById("barChart").onclick = function(e) {
		e.preventDefault();
		ctx = null;
		myChart = null;
		ctx = document.getElementById("myChart");
		myChart = new BarChart(ctx);
		myChart.addValues(
			['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
			[12, 19, 3, 5, 2, 3],
			[
				'rgba(255, 99, 132, 1)',
				'rgba(54, 162, 235, 1)',
				'rgba(255, 206, 86, 1)',
				'rgba(75, 192, 192, 1)',
				'rgba(153, 102, 255, 1)',
				'rgba(255, 159, 64, 1)'
			]
		);
		myChart.addValue('Violet', 9, 'rgba(255, 0, 64, 1)');
		myChart.displayChart(ctx);
		myChart.setLabel('Mon CHAR');
	};

	document.getElementById("lineChart").onclick = function(e) {
		e.preventDefault();
		ctx = null;
		myChart = null;
		ctx = document.getElementById("myChart");
		myChart = new LineChart(ctx);
		myChart.addValues(
			['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
			[12, 19, 3, 5, 2, 3]
		);
		myChart.addValue('Violet', 9);
		myChart.displayChart(ctx);
		myChart.setLabel('Mon CHAR');
	};
	*/


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

	document.getElementById("newDatasetBtn").onclick = function(e) {
		e.preventDefault();
		document.getElementById("newDatasetBtn").className="hidden-button"
		document.getElementById("startSteps").className = "";
	};

	document.getElementById("undoBtn").onclick = function(e) {
		e.preventDefault();
		filter.setPreviousDataset();
		applyColumnFilter();
	};

	document.getElementById("redoBtn").onclick = function(e) {
		e.preventDefault();
		filter.setNextDataset();
		applyColumnFilter();
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
			filter = new Filter(dataset)
			tableRenderer = new TableRenderer(parent, filter.getDataset());
			tableRenderer.renderTable()
			if(!reload){
				document.getElementById('showFilterBtn').hidden = false;
				document.getElementById('showChartBtn').hidden = false;
				document.getElementById('resetFiltersBtn').hidden = false;
				document.getElementById('undoBtn').hidden = false;
				document.getElementById('redoBtn').hidden = false;
				updateDoButtons()
				reload = true;
			}
			resetFilters()
			addColumnCheckers(dataset);
			setColumnSelectorValue(dataset);
			setColumnSelectorDate(dataset);
			setColumnSelectorRange(dataset);
			setColumnSelectorBarChart(dataset);
			setColumnSelectorLineChart(dataset);
			document.getElementById("startSteps").className = "hidden-steps";
			document.getElementById("newDatasetBtn").className = "";
		}
	}else{
		alert("You must to select a file!");
	}
}

function applyColumnFilter(){
	let selectedColumns = getCheckedColumns();
	let filteredByColumns = filter.filterByColumn(selectedColumns)
	tableRenderer.refreshTable(filteredByColumns)
	updateRowCounter(filter.getDataset())
	updateDoButtons()
	setColumnSelectorValue(dataset)
	setColumnSelectorDate(dataset)
	setColumnSelectorRange(dataset);
	setColumnSelectorBarChart(dataset);
	setColumnSelectorLineChart(dataset);
}

function applyRowByParameter(){
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
		filter.filterByParameter(selectedColumn, parameterValue.value)
		parameterValue.value = null;
		applyColumnFilter();
	}
}

function applyQuery(){
	let queryInput = document.getElementById("queryInput");
	let errMsgQuery = document.getElementById("errMsgQuery");
	let applyQueryBtn = document.getElementById("applyQueryBtn");

	errMsgQuery.innerHTML = "";
	let query = queryInput.value;
	if(query.length > 0){
		try {
			filter.filterByQuery(query)
		}
		catch(err) {
			errMsgQuery.innerHTML = err.message;
			queryInput.className += " error-textarea";
			applyQueryBtn.disabled = true
		}
		queryInput.value = null;
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
	if(!selectedColumn || selectedColumn == "null"){
		errMsgDate.innerHTML = "You must select a column";
	}else if((!startDate.value && !endDate.value)){
		errMsgDate.innerHTML = "You must select at least one among start and end dates";
	}else{
		filter.filterByRangeOrDate(selectedColumn, startDate.value, endDate.value)
		startDate.value = null;
		endDate.value = null;
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
	if(!selectedColumn || selectedColumn == "null"){
		errMsgRange.innerHTML = "You must select a column";
	}else if((!minRange.value && !maxRange.value)){
		errMsgRange.innerHTML = "You must select at least one among min and max values";
	}else{
		filter.filterByRangeOrDate(selectedColumn, minRange.value, maxRange.value)
		minRange.value = null;
		maxRange.value = null;
		applyColumnFilter();
	}
}

function resetFilters(){
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
	filter.setDataset(dataset)
	tableRenderer.refreshTable(filter.getDataset())
	updateRowCounter(filter.getDataset());
	updateDoButtons()
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

function setColumnSelectorBarChart(dataset){
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

function setColumnSelectorLineChart(dataset){
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


function updateRowCounter(dataset){
	let rowCounter = document.getElementById("rowCounter");
	rowCounter.innerHTML = dataset.dataframe.toArray().length + " rows."
}

function updateDoButtons(){
	document.getElementById('undoBtn').disabled = !filter.getUndoStatus();
	document.getElementById('redoBtn').disabled = !filter.getRedoStatus();
}

function showHideChart(checkbox, chartId) {
    var isChecked = checkbox.checked;
    var showHide = isChecked ?"":"none";
    document.getElementById(chartId).style.display = showHide;
}
