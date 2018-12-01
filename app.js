var express = require("express");
var app = express();
var path = require('path'); 
const Reader = require('@maxmind/geoip2-node').Reader;
var node_geolite2 = require('node-geolite2');
node_geolite2.init();
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");
app.set("views" , __dirname + "/views");
app.get("/addfriend", function(req , res){
    res.render("addfriend" , {title : "Add friends"});
});
app.get("/getuid", function(req , res){
    // var response;
    // Reader.open(__dirname+'/public/IP/GeoLite2-ASN.mmdb').then(reader => {
    //      response = reader.asn('157.240.12.0');
      
        
        
      
        
    //   });
    //   console.log(response.autonomousSystemOrganization);
    res.render("getuid" , {title : "Get UID"});
    
    
});
app.listen(8080 , function(){
    console.log("serve is running on port 8080");
});