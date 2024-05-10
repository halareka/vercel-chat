const express = require("express");
const app = express();
const fs = require('fs');

var bodyParser = require('body-parser')

let a = [];

// parse application/x-www-form-urlencoded
var jsonParser = bodyParser.json()

app.use(express.static('public'));

app.get("/", (req, res) => res.render("index"));
app.get("/chat", (req, res) => res.render('chat')); 
app.get("/.well-known/vercel/flags",(req,res) => res.send('yaapi)))'))

app.post('/send_msg', jsonParser, (req, res) => {
    const message = req.body.message;
    a.push(message);
    res.status(200).send({
      res: 'successful',
      restwo: a,
      resthree: message
    });
  });

app.post('/get_chat', (req, res) => {
    // let messages = [1,10,100,1000,10000,2,20,200,2000,'helloo']
    res.status(200)
    res.send({ res : a });

});


app.listen(3001, () => console.log("Server ready on port 3000."));

module.exports = app;