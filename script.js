window.onload = pageLoad;

function pageLoad(){
	// document.getElementById('showData').onclick = getData;
    // document.getElementById('container') = getData;
    getData();
    // getBtnId();

}
// async function getBtnId(){
//     document.getElementById("1").onclick = getToCart;
//     document.getElementById("2").onclick = getToCart;
//     document.getElementById("3").onclick = getToCart;

//     // var btnToCart = document.getElementsByClassName("btnToCart");
//     // // var btnToCart = document.querySelectorAll("[class^=btnToCart]");
//     // for(var i = 1; i < 19; i++){
//     //     btnToCart[i].onclick = getToCart;
//     //     // document.getElementById(i).onclick = getToCart;
//     // }
//     // console.log(btnToCart.length);
// }


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
        container.className = "col-lg-4 bg-warning p-5";

        var furniture_name = document.createElement("p");
        var size = document.createElement("p");
        var wood = document.createElement("p");
        var price = document.createElement("p");
        var detail = document.createElement("p");
        var cartBtn = document.createElement("button");
        cartBtn.className = "btnToCart";
        cartBtn.id = [data[keys[i]].FID];
        // cartBtn.onclick = getToCart(this.id);
        // cartBtn.attachEvent('OnClick',getToCart(this.id));

        furniture_name.innerHTML = "Name : " + data[keys[i]].furniture_name;
        size.innerHTML = "Size : " + data[keys[i]].size;
        wood.innerHTML = "Wood : " + data[keys[i]].wood;
        price.innerHTML = "Price : " + data[keys[i]].price;
        detail.innerHTML = "Detail : " + data[keys[i]].detail;
        cartBtn.innerHTML = "Buy " + data[keys[i]].FID;

        
        container.appendChild(furniture_name);
        container.appendChild(size);
        container.appendChild(wood);
        container.appendChild(price);
        container.appendChild(detail);
        container.appendChild(cartBtn);

        showIDlayer.appendChild(container);

        document.getElementById(data[keys[i]].FID).onclick = getToCart;
        console.log(data[keys[i]].FID);

        // async function getToCart(clicked_id){
        //     alert(this.id);
        //     console.log(this.id);
        // }
    }
}

// button to cart

async function getToCart(clicked_id){
    // var FID = document.getElementsById(showData(data));
    // console.log(FID);
	// writeCart(FID);
    alert(this.id);
    console.log(this.id);
    writeCart(this.id);
    // const response = await fetch("\showDBcart");
	// const content = await response.json();
	// showDataCart(content);
}

async function writeCart(FID){
    console.log("Add furniture to cart server");
    const response = await fetch("/showDBcart", {
        method: "POST",
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
        post:FID})
    })
    const content = await response.json();
    console.log(content);
    showDataCart(content);
}

function showDataCart(data){
	var showIDlayer = document.getElementById("cart");
    var keys = Object.keys(data);
        var container = document.createElement("div");
        container.className = "col-lg-4 bg-warning p-5";

        var furniture_name = document.createElement("p");
        var size = document.createElement("p");
        var wood = document.createElement("p");
        var price = document.createElement("p");
        var detail = document.createElement("p");

        furniture_name.innerHTML = "Name : " + data[keys].furniture_name;
        size.innerHTML = "Size : " + data[keys].size;
        wood.innerHTML = "Wood : " + data[keys].wood;
        price.innerHTML = "Price : " + data[keys].price;
        detail.innerHTML = "Detail : " + data[keys].detail;

        
        container.appendChild(furniture_name);
        container.appendChild(size);
        container.appendChild(wood);
        container.appendChild(price);
        container.appendChild(detail);

        showIDlayer.appendChild(container);
}