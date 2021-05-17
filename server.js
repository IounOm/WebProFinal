const express = require('express');
const app = express();
const hostname = 'localhost';
const port = 3001;
const bodyParser = require('body-parser');
const mysql = require('mysql');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var alert = require('alert');
const multer = require('multer');
const path = require('path');

app.use(express.static(__dirname));
// app.use(express.static('public')); // ไม่ได้ใช้

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

///////////////////////////////////////////////////////////
// สำหรับ upload file ภาพ
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, 'furniturePic/');
    },

    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

const imageFilter = (req, file, cb) => {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
///////////////////////////////////////////////////////////

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cookieParser());

// ใส่ค่าตามที่เราตั้งไว้ใน mysql
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "OPEN_HOUSE_IDEA",
    // socketPath: '/var/run/mysqld/mysqld.sock',
    // port:"3001",
    // multipleStatements: true
})


con.connect(err => {
    if(err) throw(err);
    else{
        console.log("MySQL connected");
    }
})

const queryDB = (sql) => {
    return new Promise((resolve,reject) => {
        // query method
        con.query(sql, (err,result, fields) => {
            if (err) reject(err);
            else
                resolve(result)
        })
    })
}

// register new member
app.post("/addDB",async (req,res) => {
    let sql = `INSERT INTO OPEN_HOUSE_IDEA.members (username, email, password) VALUES ("${req.body.regisUsername}", "${req.body.regisEmail}", "${req.body.regisPassword}")`;
    let result = await queryDB(sql);
    // console.log(result);
    // var alert = require('alert');
    alert("Register Complete");
    res.redirect('/login.html');

    // การเขียนโค้ดอีกเเบบหนึ่ง ใช้ได้เหมือนกับโค้ดด้านบน
    // const username = req.body.regisUsername;
    // const email = req.body.regisEmail;
    // const password = req.body.regisPassword;
    // con.query('INSERT INTO members (username, email, password) VALUES (?, ?, ?)', [username, email, password], (err, result) => {
    //     if(err){ // เช็คว่าสามารถดึงข้อมูลจาก database ได้หรือไม่(กรณีเกิด error )
    //         console.log(err);
    //         res.status(500).send('While connect to db got an error ${err}');
    //     }
    //     else{
    //         res.json(result); // return respones ค่า result เป็นเเบบ json (result คือข้อมูลจาก database)
    //         // res.end("Register Complete");
    //     }
    // });
})

// Login

// app.get('/', function(request, response) {
// 	response.sendFile(path.join(__dirname + '/login.html'));
// });

///////////////////////////////////////////////////////////
// เช็ดการ login
app.post('/auth', async function(request, response) {
	let email = request.body.loginEmail;
	let password = request.body.loginPassword;

    let UID = `SELECT UID FROM OPEN_HOUSE_IDEA.members WHERE email = "${email}"`;
    let result = await queryDB(UID);

	if (email && password) {
		con.query('SELECT * FROM OPEN_HOUSE_IDEA.members WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.email = email;

                // const changeResult = JSON.parse(result);
                // let res = JSON.parse(JSON.stringify(result));
                // result = Object.values(JSON.parse(JSON.stringify(result)));
                
                // console.log(result[0].UID); //Promise { [ RowDataPacket { UID: 3 } ] }
                
                // result = JSON.stringify(result);
                // console.log(result);
                // result = JSON.parse(JSON.stringify(result));
                // console.log(result);

                response.cookie('UID', result[0].UID, 1);
                response.cookie('email', email, 1);
                // console.log(changeResult.UID);
                return response.redirect('/index.html');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.email + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

///////////////////////////////////////////////////////////
// show data
app.get("/showDBChair", async (req,res) => {
    let sql = `SELECT FID,  furniture_pic, furniture_name, size, wood, price, detail FROM OPEN_HOUSE_IDEA.catagories WHERE furniture_type = "chair"`;
    let result = await queryDB(sql);
    result = Object.assign({},result);
    // console.log(result);
    res.json(result);
});
app.get("/showDBCabinet", async (req,res) => {
    let sql = `SELECT FID,  furniture_pic, furniture_name, size, wood, price, detail FROM OPEN_HOUSE_IDEA.catagories WHERE furniture_type = "cabinet"`;
    let result = await queryDB(sql);
    result = Object.assign({},result);
    // console.log(result);
    res.json(result);
});
app.get("/showDBTable", async (req,res) => {
    let sql = `SELECT FID,  furniture_pic, furniture_name, size, wood, price, detail FROM OPEN_HOUSE_IDEA.catagories WHERE furniture_type = "table"`;
    let result = await queryDB(sql);
    result = Object.assign({},result);
    // console.log(result);
    res.json(result);
});

// post เเบบเก่า สามารถเซฟสินค้าซ้ำกันได้
// app.post("/showDBcart", async (req,res) => {
//     let getCartID = req.body.post;
//     // let UID = req.cookies.UID;
//     console.log(getCartID);
//     let sql = `INSERT INTO OPEN_HOUSE_IDEA.cart (user_id, furniture_id, quantity) VALUES (${req.cookies.UID}, ${getCartID}, 1)`;
//     let result = await queryDB(sql);
//     sql = ` SELECT
//             ctg.furniture_pic,
//             ctg.furniture_name,
//             ctg.size,
//             ctg.wood,
//             ctg.price,
//             ctg.detail,
//             cart.quantity
//             FROM  OPEN_HOUSE_IDEA.catagories as ctg
//             INNER JOIN OPEN_HOUSE_IDEA.cart as cart
//             ON ctg.FID = cart.furniture_id
//             WHERE FID = ${getCartID}`;
//     result = await queryDB(sql);
//     result = Object.assign({},result);
//     console.log(result);
//     res.json(result);
// });
///////////////////////////////////////////////////////////
// insert สินค้าลง cart, update quantity เมื่อมีการกดสินค้าอีกรอบ
app.post("/addDBcart", async (req,res) => {
    let getCartID = req.body.post;
    // console.log(getCartID);
    let sql = `SELECT * FROM OPEN_HOUSE_IDEA.cart WHERE furniture_id = ${getCartID} AND user_id = ${req.cookies.UID}`;
    let result = await queryDB(sql);
    if(result.length > 0){
        // sql = `SELECT quantity FROM OPEN_HOUSE_IDEA.cart WHERE furniture_id = ${getCartID} AND user_id = ${req.cookies.UID}`;
        // result = await queryDB(sql);
        // console.log(result);
        sql = `UPDATE OPEN_HOUSE_IDEA.cart SET quantity= quantity + 1 WHERE furniture_id = ${getCartID} AND user_id = ${req.cookies.UID}`
        result = await queryDB(sql);
        sql = `SELECT quantity FROM OPEN_HOUSE_IDEA.cart WHERE furniture_id = ${getCartID} AND user_id = ${req.cookies.UID}`;
        result = await queryDB(sql);
        // console.log(result[0].quantity);
        alert(`You are add ${result[0].quantity} furniture to cart`);
        // alert('You are already add this furniture to cart');
    }
    else{
        sql = `INSERT INTO OPEN_HOUSE_IDEA.cart (user_id, furniture_id, quantity) VALUES (${req.cookies.UID}, ${getCartID}, 1)`;
        result = await queryDB(sql);
        alert('Add this furniture to cart');
    }
    // sql = ` SELECT
    //         ctg.furniture_pic,
    //         ctg.furniture_name,
    //         ctg.size,
    //         ctg.wood,
    //         ctg.price,
    //         ctg.detail,
    //         cart.quantity
    //         FROM  OPEN_HOUSE_IDEA.cart as cart
    //         INNER JOIN OPEN_HOUSE_IDEA.catagories as ctg
    //         ON cart.furniture_id = ctg.FID
    //         INNER JOIN OPEN_HOUSE_IDEA.members as mem
    //         ON cart.user_id = mem.UID
    //         WHERE UID = ${req.cookies.UID};`;
    // result = await queryDB(sql);
    // result = Object.assign({},result);
    // console.log(result);
    // res.json(result);

    // let result = await queryDB(sql);
});
///////////////////////////////////////////////////////////
// โชสินค้าในหน้า cart ตาม UID ที่ล็อคอินเข้ามา
app.get("/showDBCart", async (req,res) => {
    let sql = ` SELECT
                ctg.FID,
                ctg.furniture_pic,
                ctg.furniture_name,
                ctg.size,
                ctg.wood,
                ctg.price,
                ctg.detail,
                cart.quantity
                FROM  OPEN_HOUSE_IDEA.cart as cart
                INNER JOIN OPEN_HOUSE_IDEA.catagories as ctg
                ON cart.furniture_id = ctg.FID
                INNER JOIN OPEN_HOUSE_IDEA.members as mem
                ON cart.user_id = mem.UID
                WHERE UID = ${req.cookies.UID};`;
    let result = await queryDB(sql);
    result = Object.assign({},result);
    // console.log(result);
    res.json(result);
});
///////////////////////////////////////////////////////////
//สำหรับอัพเดตจำนวนสินค้าหลังจากกดปุ่มยืนยันการชำระเงิน
// app.post("/updateDBCart",async (req,res) => {
//     let furnitureID = req.body.post;
//     let sql = ` UPDATE OPEN_HOUSE_IDEA.cart
//                 SET quantity= ${req.body.inputQuantityID}
//                 WHERE furniture_id = ${furnitureID} AND user_id = ${req.cookies.UID}`;
//     let result = await queryDB(sql);
//     console.log(result);
//     res.redirect('/login.html');
// })
///////////////////////////////////////////////////////////
//จัดการของใน cart หลังจากกดปุ่มยืนยันการชำระเงิน
app.post("/paid",async (req,res) => {
    let sql = ` SELECT
                mem.UID,
                SUM(price*quantity) as total_price
                FROM  OPEN_HOUSE_IDEA.cart as cart
                INNER JOIN OPEN_HOUSE_IDEA.catagories as ctg
                ON cart.furniture_id = ctg.FID
                INNER JOIN OPEN_HOUSE_IDEA.members as mem
                ON cart.user_id = mem.UID
                WHERE UID = ${req.cookies.UID}`;
    let result = await queryDB(sql);
    let UID = result[0].UID;
    let total_price = result[0].total_price;
    // console.log(result[0].UID);
    // console.log(result[0].total_price);
    sql = `INSERT OPEN_HOUSE_IDEA.orders(user_id, total) VALUES (${UID}, ${total_price})`;
    result = await queryDB(sql);
    let order_id = result.insertId;
    sql = ` SELECT
            ctg.FID,
            ctg.furniture_name,
            ctg.price,
            cart.quantity
            FROM  OPEN_HOUSE_IDEA.cart as cart
            INNER JOIN OPEN_HOUSE_IDEA.catagories as ctg
            ON cart.furniture_id = ctg.FID
            INNER JOIN OPEN_HOUSE_IDEA.members as mem
            ON cart.user_id = mem.UID
            WHERE UID = ${UID}`;
    result = await queryDB(sql);
    console.log(result.length);
    for(let i=0; i< result.length; i++){
        let FID = result[i].FID;
        let furniture_name = result[i].furniture_name;
        let price = result[i].price;
        let quantity = result[i].quantity;
        sql = ` INSERT OPEN_HOUSE_IDEA.orders_detail
                (furniture_id, furniture_name, furniture_price, quantity, order_id) VALUES
                (${FID}, "${furniture_name}", ${price}, ${quantity}, ${order_id})`;
        results = await queryDB(sql);
        // console.log(results);
    }
    sql = ` DELETE FROM OPEN_HOUSE_IDEA.cart WHERE user_id = ${req.cookies.UID}`;
    result = await queryDB(sql);
    console.log(result);
    alert("You have successfully placed an order");
    res.redirect('/index.html');
})

/////////////////////////// admin ///////////////////////////
// adminAddFurniture.html
app.post('/addFurniture', (req,res) => {
    let upload = multer({ storage: storage, fileFilter: imageFilter }).single('addPic');
    upload(req, res, (err) => {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            console.log(upload);
            console.log(req.file);
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }
        let filename = req.file.filename;
        
        let furType = req.body.addType;
        let furName = req.body.addName;
        let furSize = req.body.addSize;
        let furWood = req.body.addWood;
        let furPrice = req.body.addPrice;
        let furDetail = req.body.addDetail;
        insertDataFurniture(filename, furType, furName, furSize, furWood, furPrice, furDetail).then(()=>{
            // console.log(filename);
            res.cookie('img', filename);
            console.log('Add furniture Complete');
            return res.redirect('adminAddFurniture.html');
        })
    })
})

const insertDataFurniture = async (filename, furType, furName, furSize, furWood, furPrice, furDetail) => {
    let sql = `INSERT OPEN_HOUSE_IDEA.catagories
    (furniture_type, furniture_pic, furniture_name, size, wood, price, detail) VALUES
    ("${furType}", "${filename}", "${furName}", "${furSize}", "${furWood}", ${furPrice}, "${furDetail}")`
    let result = await queryDB(sql);
    // console.log(result);
}

// adminCatagories.html
app.get("/showDBCatagories", async (req,res) => {
    let sql = `SELECT * FROM OPEN_HOUSE_IDEA.catagories`;
    let result = await queryDB(sql);
    result = Object.assign({},result);
    // console.log(result);
    res.json(result);
});

app.post("/deleteCatagories", async (req,res) => {
    let sql = `DELETE FROM OPEN_HOUSE_IDEA.catagories WHERE FID = '${req.body.deleteFID}'`;
    let result = await queryDB(sql);
    result = Object.assign({},result);
    // console.log(result);
    res.json(`You are delete furniture ID ${req.body.deleteFID}`);
});

// adminOrderList.html


 app.listen(port, hostname, () => {
    console.log(`Server running at   http://${hostname}:${port}/`);
});