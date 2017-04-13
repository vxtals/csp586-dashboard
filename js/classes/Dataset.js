class Dataset {
  constructor(json) {
        this.numberColumns = []
        this.dateColumns = []
        if(!!json){
            this.columns = this.parseColumns(json.meta.view.columns);
            this.rows = this.parseRows(json.data);
            this.dataframe = new DataFrame(this.rows, this.columns.map(
                function(col){
                    return col.name
                }
            ))
            this.dataframe = this.castNumberColumns();
        }
    }

    parseColumns(columnsArray){
        const columns = [];
        for (let i = 0; i < columnsArray.length; i++) {
            const column = columnsArray[i];
            console.log(columnsArray[i])
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
                this.numberColumns.push(columns[i].name);
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
        this.columns.map((column) => {
            if (column.name === name) {
                position = column.position;
            }
        });
        return position;
    }

    castNumberColumns(){
        let newDataframe = this.dataframe;
        for(let i = 0; i < this.numberColumns.length; i++){
            console.log(this.numberColumns[i]);
            newDataframe = newDataframe.cast(this.numberColumns[i], Number);
        }
        return newDataframe;
    }

    datasToChartValues(column){
        const position = this.getColumnPositionByName(column);
        let value = "";
        let axis = [];
        let values = [];

        for (var i = 0; i < this.rows.length; i++) {
            value = this.rows[i][position-1];
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

}
