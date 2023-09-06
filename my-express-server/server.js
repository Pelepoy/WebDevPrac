//jshint esversion:6
const express = require("express");
const app = express();

app.get("/", function(req, res){
    console.log(req);
    res.send("<strong><em><h1>HELLO PELEP</h1></em></strong>");
});

app.get("/contact", function(req, res){
    res.send("<h1>CONTACE ME AT: ragnarlothbroke@valhalla.com</h1>");
});

app.get("/about", function(req, res){
    res.send("<h1>For the love of Odin. I, Ragnar Lothbroke will conquer the world!</h1>");
});

app.get("/hobbies", function(req, res){
    res.send("<h1><ul>MY HOBBIES ARE:<li>BASKETBALL</li><li>COMBAT SPORTS</li><li>CODING</li></ul></h1>")
});

app.listen(3000, function(){
    console.log("Server started on port 3000");
}); 