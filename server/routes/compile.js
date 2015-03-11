var Compiler = require(__server + 'models/compiler');

module.exports = function(app) {
  // Return a list of available node types
  app.post('/compile/:filename', function(request, response){
    var filename = request.params.filename.split('.')[0];
    
    Compiler.compile(filename, request.body.latexCode, function (jsonResponse) {
      response.json(jsonResponse);
    });
  });
};
