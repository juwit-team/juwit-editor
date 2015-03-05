var express    = require('express');
var bodyParser = require("body-parser");
var fs         = require('fs');

var pdflatex = require('./pdflatex');

var app = express();

app.use(bodyParser.json({ extended: false }));

app.get('/',function(request,response){
  response.sendFile(__dirname + "/html/index.html");
});

app.post('/compile', function(request, response){
  //console.log('wtw');
  var filename = 'template.tex';
  var fileInDirectory = __dirname + '/temp/' + filename;
  //console.log(request.body.latexCode);
  fs.writeFile(fileInDirectory, request.body.latexCode, function(err){
    if(err){
      console.log(err);
    } else {
      console.log("The file was saved!");
      var tex = new pdflatex(fileInDirectory);
      var texFile = tex.compile();
      setTimeout(function() {}, 5000);
      console.log("Look at " + texFile);
      response.writeHead(200, {
        "Content-Type": "text/json"
      });
      response.end('{"redirect": "/dl/' + texFile.split('/').pop() + '"}');
    }
  });
});

app.use('/assets/js', express.static(__dirname + '/js'));
app.use('/dl', express.static(__dirname + '/temp'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/src', express.static(__dirname + '/src'));

app.listen(1338);
console.log('Server listenig on port: 1338');
