class DatasetView{

  constructor(){
    this.dc = DatasetController.getInstance();
    this.filter = Filter.getInstance();
    this.addDatasetListeners();
  }

  addDatasetListeners(){
    let view = this;

    document.getElementById("addDatasetBtn").onclick = function(e) {
      e.preventDefault();

      let file = document.getElementById('datasetFile').files[0];
      view.dc.addLocalDataset(file);
    };

    document.getElementById("trainDatasetCard").onclick = function(e) {
      e.preventDefault();
      view.dc.addRemoteDataset("https://data.cityofchicago.org/api/views/5neh-572f/rows.json?accessType=DOWNLOAD", 134200813);
    };

    document.getElementById("towedVehiclesDataset").onclick = function(e) {
      e.preventDefault();
      view.dc.addRemoteDataset("https://data.cityofchicago.org/api/views/ygr5-vcbg/rows.json?accessType=DOWNLOAD", 1466435);
    };

    document.getElementById("busDatasetCard").onclick = function(e) {
      e.preventDefault();
      view.dc.addRemoteDataset("https://data.cityofchicago.org/api/views/jyb9-n7fm/rows.json?accessType=DOWNLOAD", 110832248);
    };

    document.getElementById("speedCameraDataset").onclick = function(e) {
      e.preventDefault();
      view.dc.addRemoteDataset("https://data.cityofchicago.org/api/views/hhkd-xvj4/rows.json?accessType=DOWNLOAD", 37627983);
    };

    document.getElementById("redLightsDataset").onclick = function(e) {
      e.preventDefault();
      view.dc.addRemoteDataset("https://data.cityofchicago.org/api/views/spqx-js37/rows.json?accessType=DOWNLOAD",104120865);
    };

    document.getElementById("newDatasetBtn").onclick = function(e) {
      e.preventDefault();
      document.getElementById("newDatasetBtn").className="hidden-button"
      document.getElementById("startSteps").className = "";
    };

  }
}