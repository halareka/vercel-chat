const express = require("express");
const app = express();
const mysql = require("mysql")

const conn = mysql.createConnection({
  host:"sql6.freemysqlhosting.net",
  user:"sql6705815",
  database:"sql6705815",
  password:"A6nasm2rgr",
  charset: "utf8"
})
const pool = mysql.createPool({
    connectionLimit: 100,
    host:"sql6.freemysqlhosting.net",
    user:"sql6705815",
    database:"sql6705815",
    password:"A6nasm2rgr",
    charset: "utf8"
})

var bodyParser = require('body-parser')

let a = [];

var jsonParser = bodyParser.json()

app.use(express.static('public'));

app.get("/", (req, res) => res.render("index"));
app.get("/chat", (req, res) => res.render('chat')); 
app.get("/.well-known/vercel/flags",(req,res) => res.send('yaapi)))'))

app.post('/send_msg', jsonParser, (req, res) => {
    let message = req.body.message;
    pool.getConnection((error, connection) => {
        if (error) throw error;
        connection.query('INSERT INTO `chat`(`chat`) VALUES (?)', [message], err => {
            if (err) throw err;
            res.status(200).send({
                res: 'successful',
                restwo: message
            });
            connection.destroy();
        });
    });
});
app.post('/get_chat', (req, res) => {
    pool.getConnection((error, connection) => {
        if (error) throw error;
        connection.query('SELECT * FROM `chat`'  ,(err,result) => {
            if (err) throw err;
            let b = result;
            let a = [];
            b.forEach(element => {
                a.push(element.chat);
            });
            res.status(200).send({
                res: a                                                                                       
            });
            connection.destroy();
        });

    });
});


app.listen(4000, () => console.log("Server ready on port 3000."));

module.exports = app;