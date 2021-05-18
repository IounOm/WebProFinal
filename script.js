window.onload = pageLoad;

function pageLoad(){
	// document.getElementById('showData').onclick = getData;
    // document.getElementById('container') = getData;
    getDataChair();
    getDataCabinet();
    getDataTable();
    getDataCart();
    loginResult();
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

// async function loginResult(){
// 	const response = await fetch("\auth");
// 	const content = await response.json();
// 	showLogin(content);
// }

// function showData(data){
//     var loginId = document.getElementById("loginBtn");
//     var key = Object.keys(data);
//     if(key != null){
//         loginId.style.display = "none";
//     }
//     else{
//         loginId.style.display = "block";
//     }
// }

async function getDataChair(){
	const response = await fetch("\showDBChair");
	const content = await response.json();
	showData(content);
}

async function getDataCabinet(){
	const response = await fetch("\showDBCabinet");
	const content = await response.json();
	showData(content);
}

async function getDataTable(){
	const response = await fetch("\showDBTable");
	const content = await response.json();
	showData(content);
}

function showData(data){
	var showIDlayer = document.getElementById("fornitureInfo");
    var keys = Object.keys(data);
    for(var i = 0; i < keys.length; i++){
        var container = document.createElement("div");
        container.className = "col col-lg-4 p-5 text-center bg-warning";

        var furniture_pic = document.createElement("img");
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

        furniture_pic.src = "furniturePic/" + data[keys[i]].furniture_pic;
        furniture_name.innerHTML = "Name : " + data[keys[i]].furniture_name;
        size.innerHTML = "Size : " + data[keys[i]].size + " ซม.";
        wood.innerHTML = "Wood : " + data[keys[i]].wood;
        price.innerHTML = "Price : " + data[keys[i]].price + " บาท";
        detail.innerHTML = "Detail : " + data[keys[i]].detail;
        cartBtn.innerHTML = "Add to cart";

        container.appendChild(furniture_pic);
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

async function getToCart(){
    console.log(this.id);
    writeCart(this.id);
}

async function writeCart(FID){
    console.log("Add furniture to cart server");
    const response = await fetch("/addDBcart", {
        method: "POST",
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
        post:FID}) // ส่งค่า FID ไปให้ server.js
    })
    // const content = await response.json(); // ไม่ได้ใช้เนื่องจากไม่จำเป็นต้องเอาค่าที่ได้ไปทำอะไร
    // console.log(content);
    // showDataCart(content);
}

async function getDataCart(){
	const response = await fetch("\showDBCart");
	const content = await response.json();
	showDataCart(content);
}

function showDataCart(data){
	var showIDlayer = document.getElementById("myCart");
    var keys = Object.keys(data);
    for(var i = 0; i < keys.length; i++){
        var container = document.createElement("div");
        container.className = "col-lg-4 bg-warning p-5";

        var furniture_pic = document.createElement("img");
        var furniture_name = document.createElement("p");
        var size = document.createElement("p");
        var wood = document.createElement("p");
        var price = document.createElement("p");
        var detail = document.createElement("p");
        var inputQuantity = document.createElement("input");
        inputQuantity.type = "number";
        // inputQuantity.id = [data[keys[i]].FID];
        inputQuantity.name = "inputQuantity";
        inputQuantity.min = "1";
        inputQuantity.max = "10";
        
        // var increaseQ = document.createElement("button");
        // increaseQ.className = "btnUpdate";
        // increaseQ.id = [data[keys[i]].FID];
        // var decreaseQ = document.createElement("button");
        // decreaseQ.className = "btnUpdate";
        // decreaseQ.id = [data[keys[i]].FID];

        furniture_pic.src = "furniturePic/" + data[keys[i]].furniture_pic;
        furniture_name.innerHTML = "Name : " + data[keys[i]].furniture_name;
        size.innerHTML = "Size : " + data[keys[i]].size + " ซม.";
        wood.innerHTML = "Wood : " + data[keys[i]].wood;
        price.innerHTML = "Price : " + data[keys[i]].price + " บาท";
        detail.innerHTML = "Detail : " + data[keys[i]].detail;
        inputQuantity.value = "1";
        // increaseQ.innerHTML = "+";
        // decreaseQ.innerHTML = "-";

        container.appendChild(furniture_pic);
        container.appendChild(furniture_name);
        container.appendChild(size);
        container.appendChild(wood);
        container.appendChild(price);
        container.appendChild(detail);
        // container.appendChild(decreaseQ);
        container.appendChild(inputQuantity);
        // container.appendChild(increaseQ);

        showIDlayer.appendChild(container);
    }
}