class TableRenderer{

	constructor(parent, dataset){
		this.parent = parent;
		this.dataset = dataset;
		this.nextRowToRender = 0;
	}

	renderTable(){
		this.table = document.createElement("table");
		this.table.setAttribute("id", "scrollTable");
		
		this.appendHeader();
		this.appendChilds(50);

		const tableRenderer = this;

		this.parent.onscroll = function(){
			const element = tableRenderer.parent;
			console.log(element);
			const maxScrollTop = element.scrollHeight - element.clientHeight;
			console.log(maxScrollTop + " " + element.scrollTop);
			if(maxScrollTop == element.scrollTop){
				tableRenderer.appendChilds(50);
			}
		};
	}

	appendHeader(){
		const header = document.createElement("tr");
		const columns = this.dataset.columns;
		this.body = document.createElement
		for(let i = 0; i < columns.length; i++){
			const column = columns[i];
			const th = document.createElement("th");
			th.innerHTML = column.name;
			header.appendChild(th);

		}
		this.table.appendChild(header);
	}

	appendChilds(number){
		const rows = this.dataset.rows;
		if(rows.length - this.nextRowToRender < number){
			number = rows.length - this.nextRowToRender;
		}
		let lastRowRendered = this.nextRowToRender-1;
		for(let i = this.nextRowToRender; i < this.nextRowToRender+number; i++){
			const row = rows[i];
			const tableRow = document.createElement("tr");
			for(let j = 0; j < row.length; j++){
				const td = document.createElement("td");
				td.innerHTML = row[j];
				tableRow.appendChild(td);
			}
			this.table.appendChild(tableRow);
			lastRowRendered = i;
		}
		this.nextRowToRender = lastRowRendered+1;
		this.parent.appendChild(this.table);
	}



}