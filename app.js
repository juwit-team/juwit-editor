var express = require('express');

var app = express();

app.get('/', function(request, response){
  response.sendFile(__dirname + '/html/index.html');
});

app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.listen(8080);
