const express = require("express");
const app = express();
const fs = require('fs');

var bodyParser = require('body-parser')



// parse application/x-www-form-urlencoded
var jsonParser = bodyParser.json()

app.use(express.static('public'));

app.get("/", (req, res) => res.render("index"));
app.get("/chat", (req, res) => res.render('chat')); 


app.post('/send_msg', jsonParser, (req, res) => {
    const message = req.body.message;


    res.status(200).send({
      res: 'successful',
      restwo: 'hello',
      resthree: message
    });
  });

app.post('/get_chat', (req, res) => {
    // const fileContent = fs.readFileSync('db/test.txt', 'utf-8');
    // const messages = fileContent.split('\n').filter(msgs => msgs.trim());
    let messages = [1,10,100,1000,10000,2,20,200,2000,'helloo']
    res.status(200)
    res.send({ res : messages });
});


app.listen(3001, () => console.log("Server ready on port 3000."));

module.exports = app;