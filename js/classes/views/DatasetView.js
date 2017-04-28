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
      view.dc.addRemoteDataset("https://17588571.000webhostapp.com/getDataset.php?dataset=station_daily_entries.json", 1010889);
    };

    document.getElementById("towedVehiclesDataset").onclick = function(e) {
      e.preventDefault();
      view.dc.addRemoteDataset("https://17588571.000webhostapp.com/getDataset.php?dataset=towed_vehicles.json", 1662993);
    };

    document.getElementById("busDatasetCard").onclick = function(e) {
      e.preventDefault();
      view.dc.addRemoteDataset("https://17588571.000webhostapp.com/getDataset.php?dataset=cta_bus_routes_daily_use.json", 1131228);
    };

    document.getElementById("speedCameraDataset").onclick = function(e) {
      e.preventDefault();
      view.dc.addRemoteDataset("https://17588571.000webhostapp.com/getDataset.php?dataset=speed_camera_violations.json", 2615267);
    };

    document.getElementById("redLightsDataset").onclick = function(e) {
      e.preventDefault();
      view.dc.addRemoteDataset("https://17588571.000webhostapp.com/getDataset.php?dataset=red_light_camera_violations.json",3164100);
    };

    document.getElementById("newDatasetBtn").onclick = function(e) {
      e.preventDefault();
      document.getElementById("newDatasetBtn").className="hidden-button"
      document.getElementById("startSteps").className = "";
    };

  }
}