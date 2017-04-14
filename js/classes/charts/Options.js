// Label, Chart type...
class Options {
  constructor(options){
    this.options = options;
  }

  getOptions(){
    return this.options;
  }

  setOptions(options){
    this.options = options;
  }

  setDisplayLegend(display){
    if(!this.options.legend){
      this.options.legend = {};
    }
    this.options.legend.display = display;
  }

  getDisplayLegend(){
    return this.options.legend.display;
  }
}
