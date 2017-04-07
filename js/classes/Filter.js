'use strict';
class Filter {
  constructor(dataset){
    this.dataset = dataset
    this.df = dataset.dataframe
  }

  filterByColumn(selectedColumns){
    if(!selectedColumns){
      throw "selectedColumns is not defined"
    }
    let filteredDataset = new Dataset()
    filteredDataset.setDataframe(this.df.select(...selectedColumns))
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
    filteredDataset.setDataframe(this.df.filter(row => row.get(columnName) == value))
    return filteredDataset
  }

  filterByQuery(query){
    if(!query){
      throw "query is not defined"
    }
    let filteredDataset = new Dataset()
    this.df.sql.register('dataset', true)
    // Request on Table
    filteredDataset.setDataframe(DataFrame.sql.request(query))
    return filteredDataset
  }

  filterByRangeOrDate(columnName, minRange, maxRange){
    if(!columnName){
      throw "columnName is not defined"
    }else if(!minRange && !maxRange){
      throw "minRange or maxRange must be definer"
    }
    let filteredDataset = new Dataset()
    this.df.sql.register('dataset', true)
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
    return filteredDataset
  }
}