var Compiler = require(__server + 'models/compiler');
var Parser = require('angular-latex-parser');

module.exports = function(app) {
  // Return a list of available node types
  app.post('/:group/:document/compile', function(request, response){
    var filename = request.params.document.split('.')[0];
    var group  = request.params.group.split('.')[0];

    Parser.parseComplete(request.body.latexCode)
    console.log('pre');
    console.log(globalLatex);
    console.log('post');

    var latexCode = '\\documentclass{juwit} \\begin{document}' + globalLatex + ' \\end{document}';


    Compiler.compile(group, filename, latexCode, function (jsonResponse) {
      response.json(jsonResponse);
    });
  });
};
