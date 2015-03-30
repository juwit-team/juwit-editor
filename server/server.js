global.__base   = process.cwd() + '/';
global.__server = __base + '/server/';
global.__client = __base + '/client/';

var express = require('express');
var app = express();

console.log(process.cwd());
// Load Express Configuration
require(__server + 'config/express')(app, express);

// Root route
app.get('/', function(req, res){
  res.sendFile('index.html', {root: __client + 'templates'});
});

// Load routes
require(__server + 'routes/compile')(app);
require(__server + 'routes/updateInfo')(app);
require(__server + 'routes/updateCSV')(app);

module.exports = app;
