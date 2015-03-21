'use strict';
angular.module("LatexEditor").controller('EditorButtonController', ['$http', 'pdfDelegate', function($http, pdfDelegate) {

  /**
   * @param {String} match The full match.
   *
   * Only one of the following params are given.
   * @param {String} fullTag A html tag match.
   * @param {String} toTex A special charecter in latex.
   * @param {String} fromHtml A escape sequence in html.
   *
   * @return {String} A LaTeX command.
   */    

  this.replaceHtml2Tex = function (match, fullTag, toTex, fromHtml) {
    var beginAlign = {
      // CSS-style         : latex command
      'text-align: center;': '\\centering{',
      'text-align: left;'  : '\\raggedright{',
      'text-align: right;' : '\\raggedleft{',
    };
    var endAlign = '}';

    var htmlTag2Latex = {
      // FIXME: Do we need all white spaces?

    // a is 0 for not alignable 
    //      1 for begin alignment (as computed by parseBeginAlign)
    //      2 for end alignment
    // tag     : [a, replace with],
      'h1'     : [1, ' \\section*{'],
      '/h1'    : [2, '} '],
      'h2'     : [1, ' \\subsection*{'],
      '/h2'    : [2, '} '],
      'p'      : [1, ' \\par\\addvspace{\\medskipamount}\\noindent '],
      '/p'     : [2, ' '],
      'ul'     : [0, ' \\begin{itemize} '],
      '/ul'    : [0, ' \\end{itemize} '],
      'ol'     : [0, ' \\begin{enumerate} '],
      '/ol'    : [0, ' \\end{enumerate} '],
      'li'     : [0, ' \\item '],
      '/li'    : [0, ' '],
      'b'      : [0, '\\textbf{'],
      '/b'     : [0, '}'],
      'i'      : [0, '\\textit{'],
      '/i'     : [0, '}'],
      'u'      : [0, '\\underline{'],
      '/u'     : [0, '}'],
      'strike' : [0, '\\sout{'],
      '/strike': [0, '}'],
      'br/'    : [0, ' '],
      // FIXME
      'div'    : [0, ''],
      '/div'   : [0, ''],
    };

    // special characters in html
    var escapedHtml = {
      '&amp;' : '\\&',
      '&lt;'  : '<',
      '&gt;'  : '>',
    };

    // special characters in latex
    var latexEscape = {
      '#' : '\\#',
      '$' : '\\$',
      '%' : '\\%',
      '&' : '\\&',
      '~' : '\\~{}',
      '_' : '\\_',
      '^' : '\\^{}',
      '\\': '\\textbackslash',
      '{' : '\\{',
      '}' : '\\}',
    };
    if (fullTag) {
      var result = '';

      var splits = /([/a-zA-Z0-9]+)(?: style="([^"]*)")?/.exec (fullTag);
      if (splits == null) {
        console.log ('HTML tag "' + fullTag + '" behaves unexpected.');
        return '';
      }

      var tag = splits[1];
      var stylePart = splits[2];
      if (htmlTag2Latex[tag] == null) {
        console.log ('HTML tag "' + tag + '" is not supported.');
        return '';
      }

      if (htmlTag2Latex[tag][0] == 2) {
        result += endAlign;
      }

      result += htmlTag2Latex[tag][1];

      if (htmlTag2Latex[tag][0] == 1) {
        if (stylePart != null) {
          result += beginAlign[stylePart];
        } else {
          // default behaviour
          result += beginAlign['text-align: left;'];
        }
      }
      return result;
    } else if (toTex) {
      return latexEscape[toTex];
    } else if (fromHtml) {
      if (escapedHtml[fromHtml] != null) {
        return escapedHtml[fromHtml];
      }

      var escapeCode = fromHtml.substring(2,fromHtml.length-1);
      var d = Number(escapeCode);

      // test if the character is one of 256 supported in T1
      if ( (! Number.isNaN(d)) && ((d <= 0x20 && d < 0x7f) || d==0xa1 || d==0xa3 || d==0xa7 || d==0xa8 || d==0xab || d==0xad || d==0xaf || d==0xb4 || d==0xb8 || d==0xbb || ( 0xbf <= d && d <= 0xff && d!=0xd7 && d!=0xf7) || ( 0x102 <= d && d <= 0x107 ) || ( 0x10d <= d && d <= 0x10f ) || d==0x111 || ( 0x118 <= d && d <= 0x11b ) || d==0x11e || d==0x11f || ( 0x130 <= d && d <= 0x133 ) || d==0x139 || d==0x13a || d==0x13d || d==0x13e || ( 0x141 <= d && d <= 0x144 ) || ( 0x147 <= d && d <= 0x14b && d != 0x149 ) || ( 0x150 <= d && d <= 0x155 ) || ( 0x158 <= d && d <= 0x15b ) || ( 0x15e <= d && d <= 0x165 ) || ( 0x16e <= d && d <= 0x171 ) || ( 0x178 <= d && d <= 0x17e ) || d==0x237 || d==0x2d6 || d==0x2d7 || ( d==0x2d8 <= d && d <= 0x2dd ) || d==0x200b || d==0x2013 || d==0x2014 || ( 0x2018 <= d && d <= 0x201e && d != 0x201b ) || d==0x2039 || d==0x203a ) ) {
        return String.fromCharCode(d);
      } else {
        console.log( 'Could not convert to latex, ' + fromHtml + ' is not supported in T1');
        return '';
      }
    }
  };
  /**
  * Take an HTML string and replace its tags with LaTeX commands.
  *
  * @param {String} htmlString The HTML string to parse.
  * @return {String} The corresponding LaTeX string.
  */
  this.tokenize = function (htmlString) {
    /**
     * General regular expressions in java script are a quite different, see:
     *   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
     * string.replace is explained here: 
     *   https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/replace
     *
     */
    // params:                fullTag     |  toTex           |fromHtml 
    var regularExpression = /(?:<([^>]*)>)|([%\$#_\{\}~\^\\])|(&[^;]*;)/g
    return htmlString.replace(regularExpression, this.replaceHtml2Tex);
  };

  /**
   * Add header and footer for latex document and tokenize given HTML-code.
   * @param  {String} html HTML-string generated by textAngular
   * @return {String} Corresponding LaTeX-Code
   */
  this.html2latex = function(html){
    var texHead = '\\documentclass{juwit}\n \\begin{document}\n';
    var texBody = this.tokenize(html);
    var texTail = '\n \\end{document}\n';
    return texHead + texBody + texTail;
  };

  /**
  * Make a request to the server in order to get a pdf file.
  *
  * @param {string} htmlString String to generate pdf from HTML.
  */
  this.download = function(htmlString) {
    var re = /<ul>\s*<ul>/g;
    if(htmlString.search(re) != -1) {
      alert('multiple unordered list found');
      return;
    }
    var re = /<ol>\s*<ol>/g;
    if(htmlString.search(re) != -1) {
      alert('multiple ordered list found');
      return;
    }
    
    var latexString = this.html2latex(htmlString);
    $http.post("/compile/template.tex", {"latexCode": latexString})
    .success(function(data, status, headers, config) {
      if (data.error) {
        alert(data.error);
      };
      if (typeof data.redirect === 'string') {
        pdfDelegate.$getByHandle('pdf-preview').load(data.redirect);
        //window.open(data.redirect, '_new', 'toolbar=yes, location=yes, status=yes, menubar=yes, scrollbars=yes');
      } 
    }).error(function(data, status, headers, config) {
      //TODO: Error Handling
      console.log('nope');
      //alert(data.error);
    })
  };
}]);
