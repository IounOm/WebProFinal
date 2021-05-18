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
	showChairData(content);
}

function showChairData(data){
	var showIDlayer = document.getElementById("chairInfo");
    var keys = Object.keys(data);
    for(var i = 0; i < keys.length; i++){
        var container = document.createElement("div");
        container.className = "col-12 col-lg-4 py-2 text-center";
        var containerItem = document.createElement("div");
        containerItem.className = "bg-light pt-5 pt-lg-0 pt-xl-5 pb-5";
        var containerDetail = document.createElement("div");
        containerDetail.className = "mt-4 p-4 text-start";
        var containerButton = document.createElement("div");
        containerButton.className = "d-grid px-4";

        var furniture_pic = document.createElement("img");
        furniture_pic.className = "img-fluid";
        var furniture_name = document.createElement("h2");
        furniture_name.className = "pb-2 boldText";
        var size = document.createElement("p");
        var wood = document.createElement("p");
        var price = document.createElement("h3");
        price.className = "boldText";
        var detailLable = document.createElement("p");
        detailLable.className = "mb-0 pb-0";
        var detail = document.createElement("p");

        var cartBtn = document.createElement("button");
        cartBtn.className = "btn btn-orange";
        cartBtn.id = [data[keys[i]].FID];
        // cartBtn.onclick = getToCart(this.id);
        // cartBtn.attachEvent('OnClick',getToCart(this.id));

        furniture_pic.src = "furniturePic/" + data[keys[i]].furniture_pic;
        furniture_name.innerHTML = data[keys[i]].furniture_name;
        size.innerHTML = "ขนาด : " + data[keys[i]].size + " ซม.";
        wood.innerHTML = "เนื้อไม้ : " + data[keys[i]].wood;
        price.innerHTML = data[keys[i]].price + " บาท";
        detailLable.innerHTML = "รายละเอียดเพิ่มเติม :";
        detail.innerHTML = data[keys[i]].detail;
        cartBtn.innerHTML = "เพิ่มสินค้าลงตะกร้า";

        container.appendChild(containerItem);
        containerItem.appendChild(furniture_pic);
        containerItem.appendChild(containerDetail);
        containerDetail.appendChild(furniture_name);
        containerDetail.appendChild(size);
        containerDetail.appendChild(wood);
        containerDetail.appendChild(detailLable);
        containerDetail.appendChild(detail);
        containerDetail.appendChild(price);
        containerButton.appendChild(cartBtn);
        containerItem.appendChild(containerButton);

        showIDlayer.appendChild(container);

        document.getElementById(data[keys[i]].FID).onclick = getToCart;
    }
}

async function getDataCabinet(){
	const response = await fetch("\showDBCabinet");
	const content = await response.json();
	showCabinetData(content);
}

function showCabinetData(data){
	var showIDlayer = document.getElementById("cabinetInfo");
    var keys = Object.keys(data);
    for(var i = 0; i < keys.length; i++){
        var container = document.createElement("div");
        container.className = "col-12 col-lg-4 py-2 text-center";
        var containerItem = document.createElement("div");
        containerItem.className = "bg-light pt-5 pt-lg-0 pt-xl-5 pb-5";
        var containerDetail = document.createElement("div");
        containerDetail.className = "mt-4 p-4 text-start";
        var containerButton = document.createElement("div");
        containerButton.className = "d-grid px-4";

        var furniture_pic = document.createElement("img");
        furniture_pic.className = "img-fluid";
        var furniture_name = document.createElement("h2");
        furniture_name.className = "pb-2 boldText";
        var size = document.createElement("p");
        var wood = document.createElement("p");
        var price = document.createElement("h3");
        price.className = "boldText";
        var detailLable = document.createElement("p");
        detailLable.className = "mb-0 pb-0";
        var detail = document.createElement("p");

        var cartBtn = document.createElement("button");
        cartBtn.className = "btn btn-orange";
        cartBtn.id = [data[keys[i]].FID];
        // cartBtn.onclick = getToCart(this.id);
        // cartBtn.attachEvent('OnClick',getToCart(this.id));

        furniture_pic.src = "furniturePic/" + data[keys[i]].furniture_pic;
        furniture_name.innerHTML = data[keys[i]].furniture_name;
        size.innerHTML = "ขนาด : " + data[keys[i]].size + " ซม.";
        wood.innerHTML = "เนื้อไม้ : " + data[keys[i]].wood;
        price.innerHTML = data[keys[i]].price + " บาท";
        detailLable.innerHTML = "รายละเอียดเพิ่มเติม :";
        detail.innerHTML = data[keys[i]].detail;
        cartBtn.innerHTML = "เพิ่มสินค้าลงตะกร้า";

        container.appendChild(containerItem);
        containerItem.appendChild(furniture_pic);
        containerItem.appendChild(containerDetail);
        containerDetail.appendChild(furniture_name);
        containerDetail.appendChild(size);
        containerDetail.appendChild(wood);
        containerDetail.appendChild(detailLable);
        containerDetail.appendChild(detail);
        containerDetail.appendChild(price);
        containerButton.appendChild(cartBtn);
        containerItem.appendChild(containerButton);

        showIDlayer.appendChild(container);

        document.getElementById(data[keys[i]].FID).onclick = getToCart;
    }
}

async function getDataTable(){
	const response = await fetch("\showDBTable");
	const content = await response.json();
	showTableData(content);
}

function showTableData(data){
	var showIDlayer = document.getElementById("tableInfo");
    var keys = Object.keys(data);
    for(var i = 0; i < keys.length; i++){
        var container = document.createElement("div");
        container.className = "col-12 col-lg-4 py-2 text-center";
        var containerItem = document.createElement("div");
        containerItem.className = "bg-light pt-5 pt-lg-0 pt-xl-5 pb-5";
        var containerDetail = document.createElement("div");
        containerDetail.className = "mt-4 p-4 text-start";
        var containerButton = document.createElement("div");
        containerButton.className = "d-grid px-4";

        var furniture_pic = document.createElement("img");
        furniture_pic.className = "img-fluid";
        var furniture_name = document.createElement("h2");
        furniture_name.className = "pb-2 boldText";
        var size = document.createElement("p");
        var wood = document.createElement("p");
        var price = document.createElement("h3");
        price.className = "boldText";
        var detailLable = document.createElement("p");
        detailLable.className = "mb-0 pb-0";
        var detail = document.createElement("p");

        var cartBtn = document.createElement("button");
        cartBtn.className = "btn btn-orange";
        cartBtn.id = [data[keys[i]].FID];
        // cartBtn.onclick = getToCart(this.id);
        // cartBtn.attachEvent('OnClick',getToCart(this.id));

        furniture_pic.src = "furniturePic/" + data[keys[i]].furniture_pic;
        furniture_name.innerHTML = data[keys[i]].furniture_name;
        size.innerHTML = "ขนาด : " + data[keys[i]].size + " ซม.";
        wood.innerHTML = "เนื้อไม้ : " + data[keys[i]].wood;
        price.innerHTML = data[keys[i]].price + " บาท";
        detailLable.innerHTML = "รายละเอียดเพิ่มเติม :";
        detail.innerHTML = data[keys[i]].detail;
        cartBtn.innerHTML = "เพิ่มสินค้าลงตะกร้า";

        container.appendChild(containerItem);
        containerItem.appendChild(furniture_pic);
        containerItem.appendChild(containerDetail);
        containerDetail.appendChild(furniture_name);
        containerDetail.appendChild(size);
        containerDetail.appendChild(wood);
        containerDetail.appendChild(detailLable);
        containerDetail.appendChild(detail);
        containerDetail.appendChild(price);
        containerButton.appendChild(cartBtn);
        containerItem.appendChild(containerButton);

        showIDlayer.appendChild(container);

        document.getElementById(data[keys[i]].FID).onclick = getToCart;
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
        container.className = "row col-11 col-lg-12 bg-light mx-auto my-4 py-4 gx-4";
        var containerQuantity = document.createElement("div");
        containerQuantity.className = "col-2 col-lg-1 text-lg-center my-lg-auto";
        var containerPic = document.createElement("div");
        containerPic.className = "col-4 col-lg-2";
        var containerDetail = document.createElement("div");
        containerDetail.className = "col-6 col-lg-5 my-auto text-start ps-lg-2"
        var blankSpace = document.createElement("div");
        blankSpace.className = "col-6 col-lg-2";
        var containerPrice = document.createElement("div");
        containerPrice.className = "col-6 col-lg-2 mx-auto my-auto text-lg-end pt-4 p-lg-4"

        var furniture_pic = document.createElement("img");
        furniture_pic.className = "img-fluid my-auto mx-auto";
        var furniture_name = document.createElement("p");
        furniture_name.className = "boldText";
        var size = document.createElement("p");
        var wood = document.createElement("p");
        var totalPrice = document.createElement("h5");
        totalPrice.className = "boldText";
        var detailLable = document.createElement("p");
        detailLable.className = "mb-0 pb-0";
        var detail = document.createElement("p");
        detail.className = "mb-0 pb-0";
        var quantity = document.createElement("p");
        var price = document.createElement("p");
        var deleteFurniture = document.createElement("button");
        deleteFurniture.className = "btn btn-outline-danger";
        deleteFurniture.id = [data[keys[i]].FID];

        furniture_pic.src = "furniturePic/" + data[keys[i]].furniture_pic;
        furniture_name.innerHTML = data[keys[i]].furniture_name;
        size.innerHTML = "ขนาด : " + data[keys[i]].size + " ซม.";
        wood.innerHTML = "เนื้อไม้ : " + data[keys[i]].wood;
        price.innerHTML = "ราคาต่อชิ้น : " + data[keys[i]].price + " บาท";
        totalPrice.innerHTML = data[keys[i]].totalPrice + " บาท";
        detailLable.innerHTML = "รายละเอียดเพิ่มเติม :";
        detail.innerHTML = data[keys[i]].detail;
        quantity.innerHTML = data[keys[i]].quantity + " ชิ้น";
        deleteFurniture.innerHTML = "ลบสินค้า";

        container.appendChild(containerQuantity);
        containerQuantity.appendChild(quantity);
        container.appendChild(containerPic);
        containerPic.appendChild(furniture_pic)
        container.appendChild(containerDetail);
        containerDetail.appendChild(furniture_name);
        containerDetail.appendChild(size);
        containerDetail.appendChild(wood);
        containerDetail.appendChild(price);
        containerDetail.appendChild(detailLable);
        containerDetail.appendChild(detail);
        container.appendChild(blankSpace);
        container.appendChild(containerPrice);
        containerPrice.appendChild(totalPrice);
        containerPrice.appendChild(deleteFurniture);

        showIDlayer.appendChild(container);

        document.getElementById(data[keys[i]].FID).onclick = deleteFurId;
    }
}

async function deleteFurId(){
    // console.log(this.id);
    deleteFur(this.id);
}

async function deleteFur(FID){
    console.log("delete furniture from cart");
    const response = await fetch("/deleteFur", {
        method: "POST",
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
        post:FID}) // ส่งค่า FID ไปให้ server.js
    })
}