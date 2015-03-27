/**
 * Forked from https://github.com/oschrenk/node-pdflatex/
 */

var util = require('util');
var path = require('path');
var fs = require('fs');
var exec = require('child_process').exec;

/*
 PDFlatex class
*/
// constructor
function PDFlatex(inputPath, outputDirectory, filename) {
  // default settings
  this.outputDirectory = outputDirectory;
  this.inputPath = inputPath;
  this.filename = filename;
  //console.log(this.filename);
};

PDFlatex.prototype.outputDir = function(path) {
  this.outputDirectory = path;
  return this;
};

PDFlatex.prototype.compile = function(_callback) {
  if (this.inputPath && this.inputPath.length > 0) {
    var command = "pdflatex -interaction nonstopmode -output-directory " + this.outputDirectory.replace(/\\/g, '/') + " " + this.inputPath.replace(/\\/g, '/') + "";
    //console.log(command);
    var parent = this;
    //util.puts(command);
    exec(command, function(error, stdout, stderr) {
      if (error !== null) {
        //!TODO better error logs
        console.log(error);
        console.log(stdout);
        console.log(stderr);
        _callback({error: 'Could not create ' + parent.filename + '.pdf'});
      } else {
        _callback({filePath: __server + '_texFiles/' + parent.filename +'.pdf'});
      }
    });
  }
};

module.exports = PDFlatex;
