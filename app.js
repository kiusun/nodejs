var express = require("express");
var app = express();
var path = require('path'); 
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");
app.set("views" , __dirname + "/views");
app.get("/addfriend", function(req , res){
    res.render("addfriend");
});
app.get("/getuid", function(req , res){
    res.render("getuid");
});
app.listen(8080 , function(){
    console.log("serve is running on port 8080");
});