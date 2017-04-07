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
}
