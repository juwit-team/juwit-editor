var pdflatex = require('./pdflatex');

var fs = require('fs');

module.exports = {
  compile: function(filename, latexCode, _callback) {
    var fileInDirectory = __server + '_texFiles/' + filename + '.tex';
    fs.writeFile(fileInDirectory, latexCode, function(err){
      if(err){
        console.log(err);
        return {};
      } else {
        console.log("The file was saved!");
        var tex = new pdflatex(fileInDirectory);
        
        tex.compile(function (jsonResponse) {
          if(jsonResponse.error) {
            console.log(jsonResponse.error);
            _callback({error: jsonResponse.error});
          } else {
            console.log("Look at " + jsonResponse.filePath);
            _callback({redirect: '/dl/' + jsonResponse.filePath.split('/').pop() });
          };
        });
      }
    });
  }
}
