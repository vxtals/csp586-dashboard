'use strict';
class Filter {
  constructor(dataset){
    this.dataset = dataset
    this.df = dataset.dataframe
  }

  filterByColumn(selectedColumns){
    let filteredDataset = new Dataset()
    filteredDataset.setDataframe(this.df.select(...selectedColumns))
    return filteredDataset
  }

  filterByRow(){

  }

  filterByParameter(columnName, value){
    let filteredDataset = new Dataset()
    filteredDataset.setDataframe(this.df.filter(row => row.get(columnName) == value))
    return filteredDataset
  }

  filterByQuery(query){
    let filteredDataset = new Dataset()
    this.df.sql.register('dataset', true)
    // Request on Table
    filteredDataset.setDataframe(DataFrame.sql.request(query))
    return filteredDataset
  }

  filterByDate(columnName, startDate, endDate){
    if(!columnName || (!startDate && !endDate)){
      return null
    }
    let filteredDataset = new Dataset()
    this.df.sql.register('dataset', true)
    let queryBase = "SELECT * FROM dataset WHERE "
    let queryTail
    if(!!startDate && !!endDate){
      queryTail = "\"" + columnName + "\" > " + startDate + " AND \"" + columnName +  "\" < " + endDate
    }else if(!!startDate){
      queryTail = "\"" + columnName + "\" > " + startDate
    }else if(!!endDate){
      queryTail = "\"" + columnName +  "\" < " + endDate
    }

    filteredDataset.setDataframe(DataFrame.sql.request(queryBase + queryTail))
    return filteredDataset
  }
}