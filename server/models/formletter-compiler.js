var Compiler = require(__server + 'models/compiler');
var Parser = require('latex-parser');
var CSVParse = require('csv-parse');
var Filesystem = require('fs');
var Zipper = require(__server + 'routes/zipper');
var exec = require('child_process').exec;
/**
 * We need a lock mechanism to guarantee that the pdf-build has
 * finished, before we start another build.
 * TODO: Maybe it would be nice to do concurrent builds.
 **/
var Semaphore = require('semaphore')(1);

/**
 * Multiple pdfs will be generated from a bulk-letter and it's
 * csv-file, so we have to make multiple pdflatex calls.
 **/
module.exports = {
  compile: function(request) {
    
    var filename = request.params.document.split('.')[0];
    var group  = request.params.group.split('.')[0];
    var html = request.body.htmlCode;
    var csvFilepath = __server + '_texFiles/company/document/uploads/example.csv'; // TODO: this should be variable
		var input = Filesystem.createReadStream(csvFilepath);
    var latexCode = '';
		
		// TODO: this function should be in a seperate file
		var csvParser = CSVParse({delimiter: ','}, function(err, csvData) {
			// Create object that will contain the respective record
			var csvRecord = {};
			var csvHeader = csvData[0];
			var csvRecordLength = csvHeader.length;
			var htmlBackup = html;
      var documentDirectory = __server + '_texFiles/' + group + '/' + filename + '/';
			
			// Write data to csvRecord and create letter from it
			for(recordIndex = 1; recordIndex < csvData.length; recordIndex++) {
				// Create a single record from csvData
				for(attributeIndex = 0; attributeIndex < csvRecordLength; attributeIndex++) {
					csvRecord[csvHeader[attributeIndex]] = csvData[recordIndex][attributeIndex];
				}
				console.log(csvRecord); // Debug output
				
				// replace property with csvRecord[property] in htmlContent
				html = htmlBackup; // TODO: fix - Why is htmlToParse = html.replace(...) not working?
				for (var property in csvRecord) {
					if (csvRecord.hasOwnProperty(property)) {
						searchvalue = '[[' + property + ']]'; // TODO: define escape sequence for formletter placeholder
						html = html.replace(searchvalue, csvRecord[property]);
						console.log('Replace ' + searchvalue + ' with ' + csvRecord[property]); // Debug output
					}
				}
				console.log('modified HTML-code: ' + html);

				console.log('try to take semaphore');
				Semaphore.take(function() {
					console.log('semaphore taken');
					var globalLatex =	Parser('parseComplete', [html], {latexType: 'letter'});
					console.log('generated LaTeX-code: ' + globalLatex); // TODO: fix - although globalLatex has changed the pdfs are the same
					
					// TODO: create sufficient template
					latexCode += '\\documentclass{defaultLetter}';
					latexCode += '\\date{' + csvRecord['sdate'] + '}';
					latexCode += '\\signature{' + csvRecord['sname'] + '}';
					latexCode += '\\address{' + csvRecord['sname'] + ' \\ ' + csvRecord['saddress'] + ' \\ ' + csvRecord['scity'] + '}';
					latexCode += '\\begin{document}';
					latexCode += '\\begin{letter}{' + csvRecord['rname'] + ' \\ ' + csvRecord['raddress'] + ' \\ ' + csvRecord['rcity'] + '}';
					latexCode += '\\opening{' + csvRecord['opening'] + ' ' + csvRecord['rname'] + '}';
					latexCode += globalLatex;
					latexCode += '\\vfill \\closing{' + csvRecord['closing'] + '} \\vfill \\end{letter} ';
					latexCode += '\\end{document}';

					console.log('Start compiler');
					Compiler.compile(group, filename, latexCode, function (jsonResponse) {
						// move generated pdf to separate folder and rename it
						console.log('move pdf to zip folder');
						var shellCmd = 'mkdir -p ' + documentDirectory + 'zipme/' + '; '
										+ 'mv ' + documentDirectory + filename + '.pdf '
										+ documentDirectory + 'zipme/' + filename + Date.now() + '.pdf';

						exec(shellCmd, function(error, stdout, stderr) {
							if (error !== null) {
								console.log(error);
								console.log(stdout);
								console.log(stderr);
							}
						});
            
            latexCode = '';
						Semaphore.leave();
						console.log('semaphore released');
					});
				});
			}
			
      console.log('Try to take semaphore before zipping');
      Semaphore.take(function() {
        console.log('Semaphore taken now try to zip pdfs');
        Zipper.zippdfs(documentDirectory + 'zipme/', documentDirectory);
        Semaphore.leave();
        console.log('semaphore released');
      });
		});
		
		input.pipe(csvParser);
    
  }
}
