'use strict';
class ChartFactory{
  createChart(type, ctx){
    switch(type){
      case 'pie':
        return new PieChart(ctx);
      case 'bar':
        return new BarChart(ctx);
      case 'stacked':
        return new StackedChart(ctx);
      case 'pivot':
        return new PivotChart(ctx);
      case 'line':
        return new LineChart(ctx);
    }
  }
}
