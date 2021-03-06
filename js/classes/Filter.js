'use strict';
class Filter {

  static getInstance(){
    if(!this.instance){
      this.instance = new Filter();
    }
    return this.instance;
  }

  setDataset(dataset){
    this.dataset = dataset;
    this.datasetHistory = [];
    this.datasetHistory.push(this.dataset)
    this.historyPointer = 0;
  }

  getDataset(){
    return this.dataset;
  }

  filterByColumn(selectedColumns){
    if(!selectedColumns){
      throw "selectedColumns is not defined"
    }
    let filteredDataset = new Dataset()
    filteredDataset.setDataframe(this.dataset.dataframe.select(...selectedColumns))
    return filteredDataset
  }

  filterByParameter(columnName, value, exactMatch){
    if(!columnName){
      throw "columnName is not defined"
    }else if(!value){
      throw "value is not defined"
    }
    let filteredDataset = new Dataset()

    if(exactMatch){
      filteredDataset.setDataframe(this.dataset.dataframe.filter(row => row.get(columnName) == value))
    }else{
      filteredDataset.setDataframe(this.dataset.dataframe.filter(row => !!row.get(columnName) && row.get(columnName).indexOf(value) >= 0))
    }
    this.dataset = filteredDataset
    this.addDatasetToHistory(this.dataset)
  }

  filterByQuery(query){
    if(!query){
      throw "query is not defined"
    }
    let filteredDataset = new Dataset()
    this.dataset.dataframe.sql.register('dataset', true)
    // Request on Table
    filteredDataset.setDataframe(DataFrame.sql.request(query))
    this.dataset = filteredDataset
    this.addDatasetToHistory(this.dataset)
  }

  filterByRangeOrDate(columnName, minRange, maxRange){
    if(!columnName){
      throw "columnName is not defined"
    }else if(!minRange && !maxRange){
      throw "minRange or maxRange must be definer"
    }
    let filteredDataset = new Dataset()
    let newDataframe = this.dataset.dataframe.where(function(row){
      let getRow = false
      let columnValue = row.get(columnName)
      if(!!minRange && !!maxRange){
        getRow = (columnValue >= minRange) && (columnValue <= maxRange); 
      }else if(!!minRange){
        getRow = columnValue >= minRange; 
      }else if(!!maxRange){
        getRow = columnValue <= maxRange; 
      }
      return getRow;
    })

    filteredDataset.setDataframe(newDataframe)
    this.dataset = filteredDataset
    this.addDatasetToHistory(this.dataset)
  }

  addDatasetToHistory(dataset){
    if(this.historyPointer < this.datasetHistory.length - 1){
      this.datasetHistory.splice(this.historyPointer, this.datasetHistory.length - this.historyPointer);
    }
    if(this.historyPointer == 5){
      this.datasetHistory.shift();
      this.datasetHistory[this.historyPointer] = dataset;
    }else{
      this.datasetHistory[++this.historyPointer] = dataset;
    }
  }

  setPreviousDataset(){
    if(this.historyPointer > 0){
      this.dataset = this.datasetHistory[--this.historyPointer]
    }
  }

  setNextDataset(){
    if(this.historyPointer < this.datasetHistory.length -1){
      this.dataset = this.datasetHistory[++this.historyPointer]
    }
  }

  getUndoStatus(){
    return this.historyPointer > 0
  }

  getRedoStatus(){
    return this.historyPointer < this.datasetHistory.length -1
  }
}

Filter.instance = null;
