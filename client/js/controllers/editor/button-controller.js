'use strict';
angular.module("LatexEditor").controller('EditorButtonController', ['$http',  function($http) {
  /**
   * @return {string} A LaTeX command.
   */    
  this.parseTag = function (match, tag, args) {
      var result = '';
      switch (tag) {
        case 'h1':
          result += ' \\section*{';
          break;
        case '/h1':
          result += '} ';
          break;
        case 'h2':
          result += ' \\subsection*{';
          break;
        case '/h2':
          result += '} ';
          break;
        case 'p':
          result += ' \\par\\addvspace{\\medskipamount}\\noindent ';
          break;
        case '/p':
          result += ' ';
          break;
        case 'ul':
          result += ' \\begin{itemize} ';
          break;
        case '/ul':
          result += ' \\end{itemize} ';
          break;
        case 'ol':
          result += ' \\begin{enumerate} ';
          break;
        case '/ol':
          result += ' \\end{enumerate} ';
          break;
        case 'li':
          result += ' \\item ';
          break;
        case '/li':
          result += ' ';
          break;
        case 'b':
          result += '\\textbf{';
          break;
        case '/b':
          result += '}';
          break;
        case 'i':
          result += '\\textit{';
          break;
        case '/i':
          result += '}';
          break;
        case 'u':
          result += '\\underline{';
          break;
        case '/u':
          result += '}';
          break;
        case 'strike':
          result += '\\sout{';
          break;
        case '/strike':
          result += '}';
          break;
        case 'br/':
          result += ' ';
          break;
        default:
          result += '<' + tag + '>';
          break;
      }
      if (args) {
        // FIXME: this is a very quick and dirty way to process only
        // text-align arguments in the way as texAngulur produces them.
        var stylePart = /style="([^"]*)"/.exec(args);
        if (stylePart != null) {
          switch (stylePart[1]) {
            case 'text-align: center;':
              result += ' text-align ';
              break;
            case 'text-align: left;':
              result += ' text-align ';
              break;
            case 'text-align: right;':
              result += ' text-align ';
              break;
          }
        }
      }
      return result;
  };

  /**
  * Take an HTML string and replace its tags with LaTeX commands.
  *
  * @param {string} htmlString The HTML string to parse.
  * @return {string} The corresponding LaTeX string.
  */
  this.tokenize = function (htmlString) {
    /**
     * General regular expressions in java script are a quite different, see:
     *   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions?redirectlocale=en-US&redirectslug=JavaScript%2FGuide%2FRegular_Expressions
     * string.replace is explained here: 
     *   https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/replace
     *
     * '([/a-zA-Z0-9]+)' is the second argument of tagsParse (the tag). A tag
     * may include '/' or word letters.
     * '([^<]*)' might be the third argument of tagsParse. This is for
     * example 'style="color: blue;"'.
     */
    var regularExpression = /<([/a-zA-Z0-9]+)(?:\s+([^<]*))?>/g;
    return htmlString.replace(regularExpression, this.parseTag);
  };

  /**
   * Add header and footer for latex document and tokenize given HTML-code.
   * @param  {string} html HTML-string generated by textAngular
   * @return {latex} Corresponding LaTeX-Code
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
    var latexString = this.html2latex(htmlString);
    $http.post("/compile/template.tex", {"latexCode": latexString})
    .success(function(data, status, headers, config) {
      if (data.error) {
        alert(data.error);
      };
      if (typeof data.redirect === 'string') {
        window.open(data.redirect, '_new', 'toolbar=yes, location=yes, status=yes, menubar=yes, scrollbars=yes');
      } 
    }).error(function(data, status, headers, config) {
      //TODO: Error Handling
      console.log('nope');
      //alert(data.error);
    })
  };
}]);
