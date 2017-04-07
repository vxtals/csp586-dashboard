'use strict';
class Filter {
  constructor(dataset){
    this.dataset = dataset
  }

  setDataset(dataset){
    this.dataset = dataset;
  }

  getDataset(){
    return this.dataset
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
      queryTail = "\"" + columnName + "\" > " + minRange + " AND \"" + columnName +  "\" < " + maxRange
    }else if(!!minRange){
      queryTail = "\"" + columnName + "\" > " + minRange
    }else if(!!maxRange){
      queryTail = "\"" + columnName +  "\" < " + maxRange
    }

    filteredDataset.setDataframe(DataFrame.sql.request(queryBase + queryTail))
    this.dataset = filteredDataset
  }
}