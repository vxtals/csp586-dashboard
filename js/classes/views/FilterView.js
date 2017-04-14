class FilterView{

  constructor(){
    this.fc = FilterController.getInstance();
    this.filter = Filter.getInstance();
    this.addControlListeners();
    this.addFilterListeners();
  }
  
  addControlListeners(){
    let view = this;

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

    document.getElementById("undoBtn").onclick = function(e) {
      e.preventDefault();
      view.filter.setPreviousDataset();
      view.fc.applyColumnFilter();
    };

    document.getElementById("redoBtn").onclick = function(e) {
      e.preventDefault();
      view.filter.setNextDataset();
      view.fc.applyColumnFilter();
    };

    document.getElementById("resetFiltersBtn").onclick = function(e) {
      e.preventDefault();
      view.fc.resetFilters();
    };
  }

  addFilterListeners(){
    let view = this;
    
    document.getElementById("applyRowByParameterBtn").onclick = function(e) {
      e.preventDefault();
      view.fc.applyRowByParameter();
    };

    document.getElementById("applyQueryBtn").onclick = function(e) {
      e.preventDefault();
      view.fc.applyQuery();
    };

    document.getElementById("applyColumnFilterBtn").onclick = function(e) {
      e.preventDefault();
      view.fc.applyColumnFilter();
    };

    document.getElementById("applyDateBtn").onclick = function(e) {
      e.preventDefault();
      view.fc.applyDateFilter()
    };

    document.getElementById("applyRangeBtn").onclick = function(e) {
      e.preventDefault();
      view.fc.applyRangeFilter()
    };

    document.getElementById("queryInput").onfocus = function() {
      document.getElementById("queryInput").removeAttribute("class")
      document.getElementById("applyQueryBtn").disabled = false;
    };
  }
}