'use strict';
class Filter {
  constructor(dataset){
    this.dataset = dataset; 
    this.df = this.dataset.dataframe 
  }

  filterByColumn(selectedColumns){
    let filteredDataset = new Dataset()
    filteredDataset.setDataframe(this.df.select(...selectedColumns))
    return filteredDataset
  }

  filterByRow(){

  }

  filterByParameter(){

  }

  filterByQuery(){

  }
}