// Label, Chart type...
class Options {
  constructor(options){
    if(!!options){
      this.options = options;
    }else{
      this.options = {};
    }
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

  addScales(scales){
    this.options.scales = !!scales ? scale : {};
  }

  addYAxes(yaxes){
    if(!this.options.scales){
      throw 'You must define scales property before';
    }else{
      this.options.scales.yAxes = !!yaxes ? yaxes : [{}];
    }
  }

  addXAxes(xaxes){
    if(!this.options.scales){
      throw 'You must define scales property before';
    }else{
      this.options.scales.xAxes = !!xaxes ? xaxes : [{}];
    }
  }

  addTicks(axesName, ticks){
    let validInput = ['yAxes', 'xAxes']
    if(validInput.indexOf(axesName) < 0){
      throw 'First argument must be one of' + validInput;
    }else if(!this.options.scales){
      throw 'You must define scales property before';
    }else if(!this.options.scales[axesName]){
      throw 'You must define ' + axesName + ' property before';
    }else{
      this.options.scales[axesName][0].ticks = !!ticks ? ticks : {};
    }
  }

  setStacked(axesName, value){
    let validInput = ['yAxes', 'xAxes']
    if(validInput.indexOf(axesName) < 0){
      throw 'First argument must be one of' + validInput
    }else if(!this.options.scales){
      throw 'You must define scales property before';
    }else if(!this.options.scales[axesName]){
      throw 'You must define ' + axesName + ' property before';
    }else{
      this.options.scales[axesName][0].stacked = value;
    }
  }

  setBeginAtZero(axesName, value){
    let validInput = ['yAxes', 'xAxes']
    if(validInput.indexOf(axesName) < 0){
      throw 'First argument must be one of' + validInput
    }else if(!this.options.scales){
      throw 'You must define scales property before';
    }else if(!this.options.scales[axesName]){
      throw 'You must define ' + axesName + ' property before';
    }else if(!this.options.scales[axesName][0].ticks){
      throw 'You must define ticks property before';
    }else{
      this.options.scales[axesName][0].ticks.beginAtZero = value;
    }
  }
}
