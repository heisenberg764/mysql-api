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