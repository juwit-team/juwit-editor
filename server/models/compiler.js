var pdflatex = require('./pdflatex');
var exec = require('child_process').exec;

var fs = require('fs');

module.exports = {
  compile: function(group, doc, latexCode, _callback) {
    var fileInDirectory = __server + '_texFiles/' + group + '/' + doc + '/' + doc + '.tex';
    var outputDirectory = __server + '_texFiles/' + group + '/' + doc + '/';
    var defaultPath = __server + '_texFiles/default/';
    var shellCmd = 'mkdir -p ' + outputDirectory + '; '
                    + 'cp ' + defaultPath + 'defaultArticle.cls '
                    + defaultPath + 'defaultLetter.cls '
                    + defaultPath + 'logo.png ' + outputDirectory;

    exec(shellCmd, function(error, stdout, stderr) {
      if (error !== null) {
        console.log(error);
        console.log(stdout);
        console.log(stderr);
      }
    });

    fs.writeFile(fileInDirectory, latexCode, function(err){
      if(err){
        console.log(err);
        return {};
      } else {
        console.log(".tex file saved!");
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
