var Compiler = require(__server + 'models/compiler');
var Parser = require('angular-latex-parser');
var latexTemplates = require('dot').process({path: __server + '_texFiles/dotTemplates'})

module.exports = function(app) {
  // Return a list of available node types
  app.post('/:group/:document/compile', function(request, response){
    var filename = request.params.document.split('.')[0];
    var group  = request.params.group.split('.')[0];

    Parser.parseComplete(request.body.htmlCode)
    console.log('pre');
    console.log(globalLatex);
    console.log('post');

    var latexCode = '';
    var latexType = request.body.type;
    console.log(request.body.recipient);
    if (latexType === 'letter') {
      latexCode = latexTemplates.letter({sender: request.body.sender, recipient: request.body.recipient});
    } else  {
      latexCode = '\\documentclass{defaultArticle} \\begin{document} ';
    }

    latexCode +=  globalLatex;

    if (latexType === 'letter') {

      latexCode += '\\vfill \\closing{Sincerely} \\vfill \\end{letter} ';
    }

    latexCode += ' \\end{document}'

    Compiler.compile(group, filename, latexCode, function (jsonResponse) {
      response.json(jsonResponse);
    });
  });
};
