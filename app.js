var express  = require('express');
var app      = express(); 
var port  	 = process.env.PORT || 4000;
var bodyParser = require('body-parser'); 
var rq = require('request');

app.use(express.static(__dirname + '/public')); 

app.get('/login', function (req, res) {
	res.sendFile(__dirname + '/public/login.html');
});


app.use(bodyParser.json());



app.post('/api/login', function(req, res) {
	rq({
		url: 'http://45.55.1.41:8080/login',
		method: 'POST',
		form:req.body,
		header: {
			'Content-type': 'application/x-www-form-urlencoded'
			}
		},
		function(error, response, body) {
			res.set(response.headers);
			var cookie = response.headers['set-cookie'][0].split(";");
			cookie = cookie[0].replace('connect.sid=', '');
			res.cookie('connect.sid',  cookie, { maxAge: 900000, httpOnly: false});
			console.log(body);
			res.send(body);
		});
})

app.listen(port);
console.log("PPL listening on port " + port);