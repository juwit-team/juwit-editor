var Compiler = require(__server + 'models/compiler');
var FormletterCompiler = require(__server + 'models/formletter-compiler');
var Parser = require('latex-parser');
var latexTemplates = require('dot').process({path: __server + '_texFiles/dotTemplates'})

module.exports = function(app) {
  // Return a list of available node types
  app.post('/:group/:document/compile', function(request, response){
    var filename = request.params.document.split('.')[0];
    var group  = request.params.group.split('.')[0];

    var latexType = request.body.type;
    var html = request.body.htmlCode;
    var latexCode = '';

    
    
    /**
     * TODO: It would be nicer to have an hierarchy with an abstract
     * Document-class which as an build()-operation and derived Letter,
     * Article, Bulkletter, etc. classes.
     **/
    if(latexType === 'bulk-letter') {   
      FormletterCompiler.compile(request);
    } else {
      var globalLatex = Parser('parseComplete', [html], {latexType: latexType});
      if (latexType === 'letter') {
        latexCode = '';
        latexCode = latexTemplates.letter({sender: request.body.sender, recipient: request.body.recipient});
      } else  {
        latexCode = '';
        latexType = 'article';
        latexCode = '\\documentclass{defaultArticle} \\begin{document} ';
      }

      latexCode +=  globalLatex;

      if (latexType === 'letter') {

        latexCode += '\\vfill \\closing{Sincerely} \\vfill \\end{letter} ';
      }

      latexCode += ' \\end{document}';

      Compiler.compile(group, filename, latexCode, function (jsonResponse) {
        response.json(jsonResponse);
      });
    }
  });
};
