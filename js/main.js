window.onload = function() {

	document.getElementById("addDatasetBtn").onclick = function(e) {
		e.preventDefault();
		const file = document.getElementById('datasetFile').files[0];
		if (file) {
			const reader = new FileReader();
			reader.readAsText(file);
			reader.onload = function(e) {
				json = JSON.parse(e.target.result);
				const dataset = new Dataset(json);
				const parent = document.getElementById('parentHolder');
				const tableRenderer = new TableRenderer(parent, dataset);
				tableRenderer.renderTable();
			}
		}else{
			alert("You must to select a file!");
		}
	};
}
