var pdflatex = require('./pdflatex');

var fs = require('fs');

module.exports = {
  compile: function(group, doc, latexCode, _callback) {
    var fileInDirectory = __server + '_texFiles/' + group + '/' + doc + '/' + doc + '.tex';
    var outputDirectory = __server + '_texFiles/' + group + '/' + doc + '/';
    fs.writeFile(fileInDirectory, latexCode, function(err){
      if(err){
        console.log(err);
        return {};
      } else {
        console.log("The file was saved!");
        var tex = new pdflatex(fileInDirectory, outputDirectory, doc);
        
        tex.compile(function (jsonResponse) {
          if(jsonResponse.error) {
            console.log(jsonResponse.error);
            _callback({error: jsonResponse.error});
          } else {
            console.log("Look at " + jsonResponse.filePath);
            _callback({redirect: '/dl/' + group + '/' + doc + '/' + doc + '.pdf?v=' + Math.random() });
          };
        });
      }
    });
  }
}
