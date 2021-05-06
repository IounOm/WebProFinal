window.onload = pageLoad;

function pageLoad(){
	// document.getElementById('showData').onclick = getData;
    document.getElementById('container') = getData;
}

async function getData(){
	const response = await fetch("\showDB");
	const content = await response.json();
	showData(content);
}

function showData(data){
	var showIDlayer = document.getElementById("fornitureInfo");
    var keys = Object.keys(data);
    for(var i = 0; i < keys.length; i++){
        var container = document.createElement("div");

        var furniture_name = document.createElement("p");
        var size = document.createElement("p");
        var wood = document.createElement("p");
        var price = document.createElement("p");
        var detail = document.createElement("p");

        furniture_name.innerHTML = "Name : " + data[keys[i]].brandname;
        size.innerHTML = "Size : " + data[keys[i]].size;
        wood.innerHTML = "Wood : " + data[keys[i]].wood;
        price.innerHTML = "Price : " + data[keys[i]].price;
        detail.innerHTML = "Detail : " + data[keys[i]].detail;
        
        container.appendChild(furniture_name);
        container.appendChild(size);
        container.appendChild(wood);
        container.appendChild(price);
        container.appendChild(detail);

        showIDlayer.appendChild(container);
    }
}