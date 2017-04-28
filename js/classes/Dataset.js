class Dataset {
  constructor(json) {
        this.columnTypes = []
        if(!!json){
            this.columns = this.parseColumns(json.meta.view.columns);
            this.rows = this.parseRows(json.data);
            this.dataframe = new DataFrame(this.rows, this.columns.map(
                function(col){
                    return col.name
                }
            ))
            this.dataframe = this.castColumns();
        }
    }

    parseColumns(columnsArray){
        const columns = [];
        for (let i = 0; i < columnsArray.length; i++) {
            const column = columnsArray[i];
            if(column.id >= 0){
                column.dataPosition = i;
                columns.push(column);
            }
        }

        // Sort columns by position
        columns.sort(function(a, b) {
            return a.position - b.position;
        });

        for(let i = 0; i < columns.length; i++){
            if(columns[i].dataTypeName == 'number'){
                this.columnTypes.push(Number);
            }else{
                this.columnTypes.push(String);
            }
        }

        return columns;
    }

    parseRows(rowsArray){
        const rows = [];

        for(let i = 0; i < rowsArray.length; i++){
            const currentRow = rowsArray[i];
            const row = [];
            for(let j = 0; j < this.columns.length; j++){
                row.push(currentRow[this.columns[j].dataPosition]);
            }
            rows.push(row);
        }

        return rows;
    }

    setDataframe(dataframe){
        this.dataframe = dataframe;
        this.columns = dataframe.listColumns()
        this.rows = dataframe.toArray()
    }

    getColumnPositionByName(name){
        let position = 0;
        this.dataframe.listColumns().map((column, index) => {
            if (column == name) {
                position = index;
            }
        });
        return position;
    }

    castColumns(){
        return this.dataframe.castAll(this.columnTypes);
    }

    datasToChartValues(column){
        const position = this.getColumnPositionByName(column);
        let value = "";
        let axis = [];
        let values = [];
        let rows = this.dataframe.toArray();

        for (var i = 0; i < rows.length; i++) {
            value = rows[i][position];
            if (axis.includes(value)) {
                values[axis.indexOf(value)] += 1;
            } else {
                axis.push(value);
                values.push(1);
            }
        }

        const axisValues = [axis, values];

        return axisValues;
    }

    twoDatasToChartValues(column1, column2){
      const position1 = this.getColumnPositionByName(column1);
      const position2 = this.getColumnPositionByName(column2);
      let value1 = "";
      let value2 = "";
      let values = [];
      let c1axis = [];
      let c2axis = [];
      let rows = this.dataframe.toArray();

      for (var i = 0; i < rows.length; i++) {
        value1 = rows[i][position1];
        value2 = rows[i][position2];
        if (!c1axis.includes(value1)) {
          c1axis.push(value1);
        }
        if (!c2axis.includes(value2)) {
          c2axis.push(value2);
        }
      }

      for (var i = 0; i < c2axis.length; i++) {
        values[i] = [];
        for (var j = 0; j < c1axis.length; j++) {
          values[i][j] = 0
        }
      }

      for (var j = 0; j < rows.length; j++) {
        value1 = rows[j][position1];
        value2 = rows[j][position2];
        values[c2axis.indexOf(value2)][c1axis.indexOf(value1)] += 1;

      }

      const axisValues = [c1axis, c2axis, values];

      return axisValues;
    }

    threeDatasToChartValues(column1, column2, column3){
      const position1 = this.getColumnPositionByName(column1);
      const position2 = this.getColumnPositionByName(column2);
      const position3 = this.getColumnPositionByName(column3);
      let value1 = "";
      let value2 = "";
      let value3 = "";
      let values = [];
      let c1axis = [];
      let c2axis = [];
      let c3axis = [];
      let rows = this.dataframe.toArray();

      for (var i = 0; i < rows.length; i++) {
        value1 = rows[i][position1];
        value2 = rows[i][position2];
        value3 = rows[i][position3];
        if (!c1axis.includes(value1)) {
          c1axis.push(value1);
        }
        if (!c2axis.includes(value2)) {
          c2axis.push(value2);
        }
        if (!c3axis.includes(value3)) {
          c3axis.push(value3);
        }
      }

      for (var i = 0; i < c3axis.length; i++) {
        values[i] = [];
        for (var j = 0; j < c2axis.length; j++) {
          values[i][j] = []
          for (var k = 0; k < c1axis.length; k++) {
            values[i][j][k] = 0
          }
        }
      }

      for (var j = 0; j < rows.length; j++) {
        value1 = rows[j][position1];
        value2 = rows[j][position2];
        value3 = rows[j][position3];
        values[c3axis.indexOf(value3)][c2axis.indexOf(value2)][c1axis.indexOf(value1)] += 1;
      }

      const axisValues = [c1axis, c2axis, c3axis, values];

      return axisValues;
    }

}
