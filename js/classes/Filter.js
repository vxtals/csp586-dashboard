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

  filterByQuery(){

  }
}