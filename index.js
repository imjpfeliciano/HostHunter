var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
//app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');

app.get('/list', function(request, response){
	var data = [
 				    {"firstName":"John", "lastName":"Doe", "email":"John@example.com"}, 
    				{"firstName":"Anna", "lastName":"Smith", "email":"Anna@example.com"}, 
				    {"firstName":"Peter","lastName":"Jones", "email": "Peter@example.com"}
				];

	response.json(data);
});

app.get('/', function(request, response) {
  response.sendfile('./public/index.html');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


