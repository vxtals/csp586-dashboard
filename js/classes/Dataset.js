class Dataset {

    constructor(json) {
        this.columns = this.parseColumns(json.meta.view.columns);
        this.rows = this.parseRows(json.data);
        this.dataframe = new DataFrame(this.rows, this.columns.map(
            function(col){
                return col.name
            } 
        ))
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

        /*for(let i = 0; i < columns.length; i++){
            alert(columns[i].name);
        }*/

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

}