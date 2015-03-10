var pdflatex = require('./pdflatex');

var fs = require('fs');

module.exports = {
  compile: function(filename, latexCode) {
    var fileInDirectory = __server + '_texFiles/' + filename + '.tex';
    fs.writeFile(fileInDirectory, latexCode, function(err){
      console.log('hallo2');
      if(err){
        console.log(err);
        return {};
      } else {
        console.log("The file was saved!");
        var tex = new pdflatex(fileInDirectory);
        var texFile = tex.compile();
        //setTimeout(function() {}, 5000);
        console.log("Look at " + texFile);
        return { "redirect": '/dl/' + texFile.split('/').pop() };
      }
    });
    console.log('hallo');
  }
}
