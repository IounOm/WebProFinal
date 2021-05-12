const express = require('express');
const app = express();
const hostname = 'localhost';
const port = 3001;
const bodyParser = require('body-parser');
const mysql = require('mysql');
var session = require('express-session');

app.use(express.static(__dirname));
// app.use(express.static('public')); // ไม่ได้ใช้

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


// ใส่ค่าตามที่เราตั้งไว้ใน mysql
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Ioun12646@",
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

// let tablename = "members";

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
    //let sql = "CREATE TABLE IF NOT EXISTS userInfo (id INT AUTO_INCREMENT PRIMARY KEY, reg_date TIMESTAMP, username VARCHAR(255), email VARCHAR(100),password VARCHAR(100),img VARCHAR(100))";
    //let result = await queryDB(sql);
    let sql = `INSERT INTO members (username, email, password) VALUES ("${req.body.regisUsername}", "${req.body.regisEmail}", "${req.body.regisPassword}")`;
    let result = await queryDB(sql);
    console.log(result);
    res.end("Register Complete");
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

app.post('/auth', function(request, response) {
	var email = request.body.loginEmail;
	var password = request.body.loginPassword;
	if (email && password) {
		con.query('SELECT * FROM members WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.email = email;
				response.redirect('/index.html');
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

// show data
app.get("/showDB", async (req,res) => {
    // let sql = `SELECT * FROM ${tablename}`;
    let sql = `SELECT furniture_name, size, wood, price, detail FROM catagories`;
    let result = await queryDB(sql);
    result = Object.assign({},result);
    console.log(result);
    res.json(result);
})
 
 app.listen(port, hostname, () => {
    console.log(`Server running at   http://${hostname}:${port}/`);
});