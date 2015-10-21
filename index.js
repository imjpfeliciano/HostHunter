var express = require('express');
var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');

var mongodbUri = 'mongodb://admin:hosthunter@ds041164.mongolab.com:41164/hosthunter';
var mongooseUri = uriUtil.formatMongoose(mongodbUri);

var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } }; 

mongoose.connect(mongooseUri, options);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

var personSchema = {
	firstName: String,
	lastName: String,
	email: String
}

var Person = mongoose.model('Person', personSchema, 'people');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
//app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');

app.get('/list', function(request, response){
	Person.find(function (error, data){
		if(error){
			response.send(error);
		}
		console.log(data);
		response.json(data);
	});
});

app.get('/', function(request, response) {
  response.sendfile('./public/index.html');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


