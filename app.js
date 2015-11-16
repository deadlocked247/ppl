var express  = require('express');
var app      = express(); 
var port  	 = process.env.PORT || 4000;
var bodyParser = require('body-parser'); 
app.use(express.static(__dirname + '/public')); 	
app.use(bodyParser.json());


app.listen(port);
console.log("PPL listening on port " + port);