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
function PDFlatex(inputPath) {
  // default settings
  this.outputDirectory = __server + '_texFiles';
  this.inputPath = inputPath;
  this.filename = inputPath.split('/').pop().split('.')[0];
  //console.log(this.filename);
};

PDFlatex.prototype.outputDir = function(path) {
  this.outputDirectory = path;
  return this;
};

PDFlatex.prototype.compile = function(_callback) {
  if (this.inputPath && this.inputPath.length > 0) {
    var command = "pdflatex -output-directory " + this.outputDirectory + " '" + this.inputPath + "'";
    var parent = this;
    //util.puts(command);
    exec(command, function(err) {
      if (err) {
        throw err;
      } else {
        _callback(__server + '_texFiles/' + parent.filename +'.pdf');
      }
    });
  }
};

module.exports = PDFlatex;