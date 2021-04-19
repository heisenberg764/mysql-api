<<<<<<< HEAD
var connection;
const express = require('express');
const app = express();
const mysql = require('mysql');
const db_config = {
	host: '172.27.228.154',
	user: 'root',
	password: 'scc.voice@123',
	database: 'voipmonitor'
};

function handleDisconect() {
	connection = mysql.createConnection(db_config);

connection.connect((err) => {
	console.log("API CONNECTED")
	if (err) {
		console.log("error when connecting to the database:" , err);
		setTimeout(handleDisconect,2000);
	}
})

connection.on('error', function(err){
	console.log('db err', err);
	if (err.code === 'PROTOCOL_CONNECTION_LOST'){
		handleDisconect();
	} else {
		throw err;
	}
});
}
handleDisconect();


// Rest api lấy data theo số phone KHG (callee) 
app.get('/cdr/:called', (req,res)=>{
	console.log("fetching data with phone:" + req.params.phone)
	let con = mysql.createConnection(db_config);
	const phoneNum = req.params.called
	const queryByPhone = 'SELECT * FROM cdr WHERE called = ? '
	con.query(queryByPhone, [phoneNum], (err,rows,fields) => {
	res.json(rows)
	})
})



// rest api lấy data theo id 
app.get('/cdr/dialogid/:id', function(req,res){
	// console.log("Fetching cdr table with id:" + req.params.id)
	const con = mysql.createConnection({
		host: '172.27.228.154',
		user: 'root',
		password: 'scc.voice@123',
		database: 'voipmonitor'
	})
	const dialogId = req.params.id
	const queryString = 'SELECT * FROM cdr WHERE id = ?'
	con.query(queryString, [dialogId], (err,rows,fields)=> {
		if (err) throw (err)
		res.json(rows);
		console.log('Successfully retrieved:' + ' ' + dialogId);
	})
})

app.get('/cdr/calldate/:calldate', (req,res) => {
	const con = mysql.createConnection({
		host: '172.27.228.154',
		user: 'root',
		password: 'scc.voice@123',
		database: 'voipmonitor'
	});
	const currDate = new Date();
	const callDate = req.params.calldate
	const queryByCallDate = 'SELECT * FROM cdr WHERE calldate BETWEEN ? AND ? '
	con.query(queryByCallDate, [callDate,currDate], (err,rows,fields) => {
		res.json(rows)
	})
})

app.get("/", function(req,res){
	console.log("");
	res.send("Get respond from localhost")
})


app.listen(8001,function(){
	console.log("SERVER RUNNIN IN PORT: 8001")
})



=======
const express = require('express');
const mysql = require('mysql');
const app = express();

// Rest api to get data with phone input 
app.get('/cdr/:called', (req,res)=>{
	console.log("fetching data with phone:" + req.params.phone)
	let con = mysql.createConnection({
		host: '172.27.228.154',
		user: 'root',
		password: 'scc.voice@123',
		database: 'voipmonitor'
	})
	const phoneNum = req.params.called
	const queryByPhone = 'SELECT * FROM cdr WHERE called = ? '
	con.query(queryByPhone, [phoneNum], (err,rows,fields) => {
	res.json(rows)
	})
})



// rest api to get data with id 
app.get('/cdr/userid/:id', function(req,res){
	console.log("Fetching web_users with id:" + req.params.id)
	const con = mysql.createConnection({
		host: '172.27.228.154',
		user: 'root',
		password: 'scc.voice@123',
		database: 'voipmonitor'
	})
	const userId = req.params.id
	const queryString = 'SELECT * FROM cdr WHERE id = ?'
	con.query(queryString, [userId], (err,rows,fields)=> {
		if (err) throw (err)
		console.log("connected to database successfully")
		res.json(rows)
		console.log(rows)
	})
})

app.get('/cdr/calldate/:calldate', (req,res) => {
	const con = mysql.createConnection({
		host: '172.27.228.154',
		user: 'root',
		password: 'scc.voice@123',
		database: 'voipmonitor'
	});
	const callDate = req.params.calldate
	const queryByCallDate = 'SELECT * FROM cdr WHERE calldate >= ?'
	con.query(queryByCallDate, [callDate], (err,rows,fields) => {
		res.json(rows)
	})
})


app.get("/", function(req,res){
	console.log("");
	res.send("Get respond from localhost")
})
// app.get("/users", function(req,res){
// 	var user1 = {firstname: "Stephen", lastname: "Curry"}
// 	const user2 = {firstname: "Keven", lastname: "Durrant"}
// 	res.json([user1,user2])
// })

app.listen(3001,function(){
	console.log("SERVER RUNNIN IN PORT: 3001")
})



// const con = mysql.createConnection({
// 	host: "172.27.228.154",
// 	user: "root",
// 	password: "scc.voice@123",
// 	database: "voipmonitor"
	
// });

// /* con.connect(function(err){
// 	if (err) throw err;
// 	con.query(`SELECT * FROM web_users`, function(err,result,fields) {
// 		console.log(result)
// 		});
// });
//  */

// con.connect( (err) => {
// 	if (err) {
// 		console.log(err);
// 	};
// 	con.query(`Select * FROM web_users`, (err,result,fields) =>{
// 	console.log(result)
// 	});
// });



// con.query('SELECT ')
>>>>>>> c3a7b6e319d91dc66d391149a722547b1dc6b4a3
