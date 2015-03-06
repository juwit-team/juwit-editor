'use strict';
angular.module("textAngularTest").controller('ButtonController', ['$http',  function($http) {
  /**
   * @return {string} A LaTeX command.
   */    
  this.parseTag = function (match, tag, args) {
      switch (tag) {
        case 'h1':
          return ' \\section*{';
        case '/h1':
          return '} ';
        case 'h2':
          return ' \\subsection*{';
        case '/h2':
          return '} ';
        case 'p':
          return ' \\par\\addvspace{\\medskipamount}\\noindent ';
        case '/p':
          return ' ';
        case 'ul':
          return ' \\begin{itemize} ';
        case '/ul':
          return ' \\end{itemize} ';
        case 'ol':
          return ' \\begin{enumerate} ';
        case '/ol':
          return ' \\end{enumerate} ';
        case 'li':
          return ' \\item ';
        case '/li':
          return ' ';
        case 'b':
          return '\\textbf{';
        case '/b':
          return '}';
        case 'i':
          return '\\textit{';
        case '/i':
          return '}';
        case 'u':
          return '\\underline{';
        case '/u':
          return '}';
        case 'strike':
          return '\\sout{';
        case '/strike':
          return '}';
        case 'br/':
          return ' ';
        default:
          return '<' + tag + '>';
      }
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
    $http.post("/compile", {"latexCode": latexString})
    .success(function(data, status, headers, config) {
      if (typeof data.redirect === 'string') {
        window.open(data.redirect, '_new', 'toolbar=yes, location=yes, status=yes, menubar=yes, scrollbars=yes');
      } 
    }).error(function(data, status, headers, config) {
      //TODO: Error Handling
    })
  };
}]);
