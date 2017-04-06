class TableRenderer{

	constructor(parent, dataset){
		this.parent = parent;
		this.dataset = dataset;
		this.dataframe = dataset.dataframe;
		this.nextRowToRender = 0;
	}

	renderTable(){
		let tableNode = document.getElementById("scrollTable")
		if(!!tableNode){
			while (tableNode.firstChild) {
			    tableNode.removeChild(tableNode.firstChild);
			}
			this.table = tableNode
		}else{
			this.table = document.createElement("table");
			this.table.setAttribute("id", "scrollTable");
		}
		
		this.appendHeader();
		this.appendChilds(50);

		const tableRenderer = this;

		this.parent.onscroll = function(){
			const element = tableRenderer.parent;
			const maxScrollTop = element.scrollHeight - element.clientHeight;
			if(maxScrollTop == element.scrollTop){
				tableRenderer.appendChilds(50);
			}
		};
	}

	appendHeader(){
		const header = document.createElement("tr");
		const columns = this.dataframe.listColumns();
		this.body = document.createElement
		for(let i = 0; i < columns.length; i++){
			const column = columns[i];
			const th = document.createElement("th");
			th.innerHTML = column;
			header.appendChild(th);

		}
		this.table.appendChild(header);
	}

	appendChilds(number){
		const rows = this.dataset.dataframe.toArray();
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

	cleanTable(){
		this.table.innerHTML = ""
	}

	reRenderTable(dataset){
		this.cleanTable();
		if(!!dataset){
			this.dataset = dataset;
			this.dataframe = dataset.dataframe;
		}
		this.nextRowToRender = 0;
		this.appendHeader();
		this.appendChilds(50);

	}



}