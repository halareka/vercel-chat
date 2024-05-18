require('dotenv').config();
const express = require("express");
const app = express();
const mysql = require("mysql")

const pool = mysql.createPool({
    connectionLimit: 100,
    host:       process.env.HOST,
    user:       process.env.USER,
    database:   process.env.DATABASE,
    password:   process.env.PASSWORD,
    charset:    "utf8"
})

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
app.use(express.static('public'));

app.get("/", (req, res) => res.render("index"));
app.get("/chat", (req, res) => res.render('chat')); 
app.get("/.well-known/vercel/flags",(req,res) => res.send('yaapi)))'))

app.post('/send_msg', jsonParser, (req, res) => {
    let message = req.body.message;
    pool.getConnection((error, connection) => {
        if (error) throw error;                                                                                                                                                                                                
        connection.query('INSERT INTO `chatt`(`chatt`) VALUES (?)', [message], err => {
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
        connection.query('SELECT * FROM `chatt`'  ,(err,result) => {
            if (err) throw err;
            let b = result;
            let a = [];
            b.forEach(element => {
                a.push(element.chatt);
            });                             
            res.status(200).send({
                res: a                                                                                       
            });
            connection.destroy();
        });

    });
});

app.post('/get_length', (req, res) => { 
    pool.getConnection((error, connection) => {
        if (error) throw error;
        connection.query('SELECT COUNT(*) FROM `chatt`'  ,(err,result) => {
            if (err) throw err;
            let b = result;                           
            res.status(200).send({
                res: b                                                                                      
            });
            connection.destroy();
        });
    });
});
app.post('/del_msg', (req, res) => { 
    pool.getConnection((error, connection) => {
        if (error) throw error;
        connection.query('DELETE FROM `chatt` LIMIT 1'  ,(err,result) => {
            if (err) throw err;                   
            res.status(200).send({
                res: 'successful delete'                                                                                     
            });
            connection.destroy();
        });
    });
});
app.listen(4000, () => console.log("Server ready on port 3000."));

module.exports = app;