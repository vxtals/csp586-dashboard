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

}
