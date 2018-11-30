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
    Reader.open('/usr/local/share/GeoIP/GeoIP2-ISP.mmdb').then(reader => {
        const response = reader.isp('128.101.101.101');
      
        console.log(response.autonomousSystemNumber); // 217
        console.log(response.autonomousSystemOrganization); // 'University of Minnesota'
        console.log(response.isp); // 'University of Minnesota'
        console.log(response.organization); // 'University of Minnesota'
      
        console.log(response.ipAddress); // '128.101.101.101'
      });
    res.render("getuid" , {title : "Get UID"});
    
    
});
app.listen(8080 , function(){
    console.log("serve is running on port 8080");
});