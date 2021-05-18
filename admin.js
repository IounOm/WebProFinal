window.onload = pageLoad;

function pageLoad(){
    getDataCatagories();
	getDataOrder();
	getDataOrderDetail();
}

// adminCatagories.html
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

// adminOrderList.html
async function getDataOrder(){
	const response = await fetch("\orderList");
	const content = await response.json();
	showTableOrder(content);
}

function showTableOrder(data){
	var keys = Object.keys(data);
	var keys2 = Object.keys(data[keys[0]]);
	var tablearea = document.getElementById("myOrderList");
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

async function getDataOrderDetail(){
	const response = await fetch("\orderDetail");
	const content = await response.json();
	showTableOrderDetail(content);
}

function showTableOrderDetail(data){
	var keys = Object.keys(data);
	var keys2 = Object.keys(data[keys[0]]);
	var tablearea = document.getElementById("myOrderdetail");
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