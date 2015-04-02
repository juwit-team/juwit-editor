var fs = require('fs');
var exec = require('child_process').exec;
    
module.exports = {
  zippdfs: function(src, dst) {      
    var changeDir = 'cd ' + src;
    var zipCmd   = changeDir + ' && ' + 'zip -r ' + dst + 'Formletter' + Date.now() + ' ./*.pdf ';

    exec(zipCmd, function(error, stdout, stderr) {
      if (error !== null) {
        console.log(error);
        console.log(stdout);
        console.log(stderr);
      }
    });
  }
}
