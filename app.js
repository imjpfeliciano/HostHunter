var express = require('express');
var mongoose = require('mongoose');
//var cors = require('cors');
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

mongoose.connect('mongodb://admin:admin@ds041164.mongolab.com:41164/hosthunter');

var personSchema = {
	firstName: String,
	lastName: String,
	email: String
}

var Person = mongoose.model('Person', personSchema, 'people');

var app = express();
//app.use(cors());

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());



app.get('/list', function(request, response){
	Person.find(function (error, data){
		if(error){
			response.send(error);
		}
		console.log(data);
		response.json(data);
	});
});

app.get('*', function(request, response){
	response.sendfile('./public/index.html');
});

app.listen(8080, function(){
	console.log('App listening on port 8080');
});