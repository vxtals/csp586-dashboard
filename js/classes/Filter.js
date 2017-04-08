'use strict';
class Filter {
  constructor(dataset){
    this.dataset = dataset;
    this.datasetHistory = [];
    this.datasetHistory.push(this.dataset) 
    this.historyPointer = 0;
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

  filterByRow(){

  }

  filterByParameter(columnName, value){
    if(!columnName){
      throw "columnName is not defined"
    }else if(!value){
      throw "value is not defined"
    }
    let filteredDataset = new Dataset()
    filteredDataset.setDataframe(this.dataset.dataframe.filter(row => row.get(columnName) == value))
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
    this.dataset.dataframe.sql.register('dataset', true)
    let queryBase = "SELECT * FROM dataset WHERE "
    let queryTail
    if(!!minRange && !!maxRange){
      queryTail = "\"" + columnName + "\" >= " + minRange + " AND \"" + columnName +  "\" <= " + maxRange
    }else if(!!minRange){
      queryTail = "\"" + columnName + "\" >= " + minRange
    }else if(!!maxRange){
      queryTail = "\"" + columnName +  "\" <= " + maxRange
    }

    filteredDataset.setDataframe(DataFrame.sql.request(queryBase + queryTail))
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