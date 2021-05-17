window.onload = pageLoad;

function pageLoad(){
    getDataCatagories();

}

async function getDataCatagories(){
	const response = await fetch("\showDBCatagories");
	const content = await response.json();
	showTableCatagories(content);
}

function showTableCatagories(data){
	var keys = Object.keys(data);
	var keys2 = Object.keys(data[keys[0]]);
	var tablearea = document.getElementById("myCatagories");
	var table = document.createElement("table");
	var tr = document.createElement("tr");
	for (var i = 0; i <keys2.length; i++) {
		var th = document.createElement("th");
		th.innerHTML = keys2[i];
		tr.appendChild(th);
	}
	table.appendChild(tr);
	for (var i=0;i<keys.length;i++){
		var tr = document.createElement("tr");
		for (var j=0;j<keys2.length;j++){
			var td = document.createElement("td");
			var temp = data[keys[i]];
			td.innerHTML = temp[keys2[j]];
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
	tablearea.innerHTML = "";
	tablearea.appendChild(table);
}