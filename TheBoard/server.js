var http = require("http");
var express = require("express");
var session = require("express-session");
var app = express();
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var controllers = require("./controllers");
var flash = require("connect-flash");
//var ejsEngine = require("ejs-locals");

//Setup the View Engine
//app.set("view engine", "jade");
//app.engine("ejs", ejsEngine); //support master pages
//app.set("view engine", "ejs"); //ejs view engine
app.set("view engine", "vash"); //vash view engine

//opt into services
var parseUrlencoded = require('urlencoded-request-parser');
var opts = { arrayLimit: 0 };
app.use(parseUrlencoded(opts));

app.use(bodyParser.json());

app.use(cookieParser());
app.use(session({ secret: "PluralsightTheBoard" }));
app.use(flash());


// set the public static resource folder
app.use(express.static(__dirname + "/public"));

// map the route
controllers.init(app);

app.get("/api/users", function (req, res) {
    res.set("Content-Type", "application/json");
    res.send({ name: "Leo", isValid: true, group: "Admin" });
});

var server = http.createServer(app);


server.listen(3000);