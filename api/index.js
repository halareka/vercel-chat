const express = require("express");
const app = express();
const mysql = require("mysql")

const conn = mysql.createConnection({
  host:"sql6.freemysqlhosting.net",
  user:"sql6705815",
  database:"sql6705815",
  password:"A6nasm2rgr",
})
const pool = mysql.createPool({
    connectionLimit: 100,
    host:"sql6.freemysqlhosting.net",
    user:"sql6705815",
    database:"sql6705815",
    password:"A6nasm2rgr",
})

var bodyParser = require('body-parser')

let a = [];

var jsonParser = bodyParser.json()

app.use(express.static('public'));

app.get("/", (req, res) => res.render("index"));
app.get("/chat", (req, res) => res.render('chat')); 
app.get("/.well-known/vercel/flags",(req,res) => res.send('yaapi)))'))

app.post('/send_msg' , jsonParser , (req,res)=>{
    const message = req.body.message;
    let mess = `, ${message}`;
    pool.getConnection((error, connection) => {
        
        if (error) throw error;

        connection.query(`SELECT * FROM chatdb`, (error, results,)=>{
            if (error) throw error;
            res.status(200).send({
                res: 'successful',
                restwo: mess,
                resthree: results
            });
            connection.destroy();
        });

    });
});
// app.post('/send_msg', jsonParser, (req, res) => {
//     conn.connect()
//     const message = req.body.message;
//     let mess = `, ${message}`;
//     pool.getConnection(function(err, con) {
//         conn.query(`SELECT * FROM chatdb `, (err, result) => {
//         a.push(result)
//         let b = [];
//         b.push(1)
            
//         res.status(200).send({
//             res: 'successful',
//             restwo: mess,
//             resthree: a,
//             resfour : b
//         });
//     });
// });
// });

app.post('/get_chat', (req, res) => {
    conn.query('SELECT * FROM `chatdb`', (err,result)=>{
      if(err) {
          console.log(err)
      } else {
          res.status(200)
          res.send({ res : `[${result}]`});   
      }
    })
    res.status(200)
    res.send({ res : a });                                     

});


app.listen(4000, () => console.log("Server ready on port 3000."));

module.exports = app;