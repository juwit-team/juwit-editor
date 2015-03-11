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
        
        tex.compile(function (texFile) {
          console.log("Look at " + texFile);
          _callback({ "redirect": '/dl/' + texFile.split('/').pop() });
        });
      }
    });
  }
}
