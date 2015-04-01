var Compiler = require(__server + 'models/compiler');
var Parser = require('angular-latex-parser');
var latexTemplates = require('dot').process({path: __server + '_texFiles/dotTemplates'})
var CSVParse = require('csv-parse');
var Filesystem = require('fs');
var exec = require('child_process').exec;
var sem = require('semaphore')(1);

module.exports = function(app) {
  // Return a list of available node types
  app.post('/:group/:document/compile', function(request, response){
    var filename = request.params.document.split('.')[0];
    var group  = request.params.group.split('.')[0];
    var latexCode = '';
    var latexType = request.body.type;
    var html = request.body.htmlCode;
    console.log(request.body.recipient);

	/**
	 * Multiple pdfs will be generated from a bulk-letter and it's
	 * csv-file, so we have to make multiple pdflatex calls.
	 * 
	 * TODO: It would be nicer to have an hierarchy with an abstract
	 * Document-class which as an build()-operation and derived Letter,
	 * Article, Bulkletter, etc. classes.
	 **/
	if(latexType === 'bulk-letter') {		
		var csvFilepath = __server + '_texFiles/company/document/uploads/test1427827041036.csv';
		var input = Filesystem.createReadStream(csvFilepath);
		
		// TODO: this function should be in a seperate file
		var csvParser = CSVParse({delimiter: ','}, function(err, csvData) {
			// Create object that will contain the respective record
			var csvRecord = {};
			var csvHeader = csvData[0];
			var csvRecordLength = csvHeader.length;
			var htmlBackup = html;
			
			// Write data to csvRecord and create letter from it
			for(recordIndex = 1; recordIndex < csvData.length; recordIndex++) {
				// Create a single record from csvData
				for(attributeIndex = 0; attributeIndex < csvRecordLength; attributeIndex++) {
					csvRecord[csvHeader[attributeIndex]] = csvData[recordIndex][attributeIndex];
				}
				console.log(csvRecord); // Debug output
				
				// replace property with csvRecord[property] in htmlContent
				html = htmlBackup; // TODO: Why is htmlToParse = html.replace(...) not working?
				for (var property in csvRecord) {
					if (csvRecord.hasOwnProperty(property)) {
						searchvalue = '[[' + property + ']]'; // TODO: define escape sequence for formletter placeholder
						html = html.replace(searchvalue, csvRecord[property]);
						console.log('Replace ' + searchvalue + ' with ' + csvRecord[property]); // Debug output
					}
				}
				console.log('modified HTML-code: ' + html);

				console.log('try to take semaphore');
				sem.take(function() {
					console.log('semaphore taken');
					// TODO: create letters instead of articles
					Parser.parseComplete(html);
					console.log('generated LaTeX-code: ' + globalLatex);
					latexCode += '\\documentclass{defaultArticle} \\begin{document} ';
					latexCode += globalLatex;
					latexCode += ' \\end{document}';

					console.log('Start compiler');
					Compiler.compile(group, filename, latexCode, function (jsonResponse) {
						// move generated pdf to separate folder and rename it
						console.log('move pdf to zip folder');
						var documentDirectory = __server + '_texFiles/' + group + '/' + filename + '/';
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
						sem.leave();
						console.log('semaphore released');
					});
				});
			}
			
			// TODO: zip all pdfs in seperate folder
		});
		
		input.pipe(csvParser);
	} else {

		Parser.parseComplete(html);
		console.log('pre');
		console.log(request.body.type);
		console.log(globalLatex);
		console.log('post');

		if (latexType === 'article') {
			latexCode = '\\documentclass{defaultArticle} \\begin{document} '
						+ globalLatex;
		} else if(latexType === 'letter') {
			latexCode = latexTemplates.letter({sender: request.body.sender, recipient: request.body.recipient})
						+ globalLatex
						+ '\\vfill \\closing{Sincerely} \\vfill \\end{letter} ';
		}

		latexCode += ' \\end{document}';

		Compiler.compile(group, filename, latexCode, function (jsonResponse) {
			response.json(jsonResponse);
		});
	}
  });
};
