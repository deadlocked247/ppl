var express  = require('express');
var app      = express(); 
var port  	 = process.env.PORT || 4000;
var bodyParser = require('body-parser'); 
var rq = require('request');

app.use(express.static(__dirname + '/public')); 

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

app.get('/routines', function (req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

app.get('/login', function (req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

app.use(bodyParser.json());



app.post('/api/login', function(req, res) {

	rq({
		url: 'http://45.55.1.41:8080/login',
		method: 'POST',
		form:req.body,
		header: {
			'Content-type': 'application/json'
			}
		},
		function(error, response, body) {
			res.set(response.headers);
			var cookie = response.headers['set-cookie'][0].split(";");
			cookie = cookie[0].replace('connect.sid=', '');
			res.cookie('connect.sid',  cookie, { maxAge: 900000, httpOnly: false});
			console.log(body);
			if(error) {
				res.send(new Error(error));
			}
			else {
				res.send(body);
			}
		});
})

app.get('/auth/facebook/callback', function(req, res) {
	res.body = req.body;
	res.sendFile(__dirname + '/public/index.html');
})




app.get('/api/user/:id', function(req, res) {
	console.log(req.headers);
	rq({
		url: 'http://45.55.1.41:8080/api/users/id/' + req.params.id,
		method: 'GET',
		header: req.headers
	},
		function(error, response, body) {
			console.log(body);
			if(error) {
				res.send(new Error(error));
			}
			else {
				res.send(body);
			}
		});
})


app.get('/api/routines', function(req, res) {
	console.log(req.headers);
	rq({
		url: 'http://45.55.1.41:8080/api/routines',
		method: 'GET',
		header: req.headers
	},
		function(error, response, body) {
			console.log(body);
			if(error) {
				res.send(new Error(error));
			}
			else {
				res.send(body);
			}
		});
})

app.listen(port);
console.log("PPL listening on port " + port);