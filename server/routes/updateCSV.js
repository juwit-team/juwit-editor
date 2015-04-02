var fs = require('fs');
var exec = require('child_process').exec;

module.exports = function(app) {
  app.post('/:group/:document/updateCSV', function(request, response) {
    // move file to corresponding document folder
    var latexDocumentName = request.params.document.split('.')[0];
    var group = request.params.group.split('.')[0];

    var src = request.files.file.path;
    var dst = __server + '_texFiles/' + group + '/' + latexDocumentName + '/uploads';

    var mvFileCmd = "mkdir -p " + dst + "; mv " + src + " " + dst + "/" + request.files.file.name;
    
    exec(mvFileCmd, function(error, stdout, stderr) {
      if (error !== null) {
        console.log(error);
        console.log(stdout);
        console.log(stderr);
      }
    });

    response.json({"status": "File uploaded."});
  });
};
