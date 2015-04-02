var fs = require('fs');
var exec = require('child_process').exec;
    
    var group = 'company'; 
    var latexDocumentName = 'document'; // Pfade sind noch statisch. Ersetzten durch die allgemeinen Pfad, siehe updateCSV
   
    var changeDir = 'cd ../_texFiles/' + group + '/' + latexDocumentName + '/'; //changing to required folder
    var directory = 'zipme'; //name of the directory, that will be zipped
  
    var zipDireCmd   = changeDir + ' && ' + 'zip -r Formletter' + Date.now() + ' ./' + directory + '/*.pdf ';


exec(zipDireCmd, function(error, stdout, stderr) {
  if (error !== null) {
    console.log(error);
    console.log(stdout);
    console.log(stderr);
  }
});
