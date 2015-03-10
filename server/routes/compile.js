var Compiler = require(__server + 'models/compiler');

module.exports = function(app) {
  // Return a list of available node types
  app.post('/compile/:filename', function(request, response){
    var filename = request.params.filename.split('.')[0];
    console.log('hund');
    var jsonResponse = Compiler.compile(filename, request.body.latexCode);
    console.log(jsonResponse);
    response.json(jsonResponse);
  });
};
