var express = require("express");
var app = express();
var path = require('path'); 
var maxmind = require('maxmind');
var node-geolite2 = require('node-geolite2');
node-geolite2.init();
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");
app.set("views" , __dirname + "/views");
app.get("/addfriend", function(req , res){
    res.render("addfriend" , {title : "Add friends"});
});
app.get("/getuid", function(req , res){
    var location = node-geolite2.getGeoDataSync("118.112.56.251");
    console.log(location);
    res.render("getuid" , {title : "Get UID"});
    
    
});
app.listen(8080 , function(){
    console.log("serve is running on port 8080");
});