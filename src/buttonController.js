'use strict';
angular.module("textAngularTest").controller('ButtonController', function() {
  /**
   * @return {string} A LaTeX command.
   */    
  var parseTag = function (match, tag) {
      switch (tag) {
        case 'h1':
          return ' \\section*{';
        case '/h1':
          return '} ';
        case 'h2':
          return ' \\subsection*{';
        case '/h2':
          return '} ';
        // can't use
        case 'p':
          return ' ';
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
  var tokenize = function (htmlString) {
    /**
     * '(\/?\w+)' is the first argument of tagsParse (the tag). A tag may begin
     * with '/' followed by a word.
     * '(?:\s+([^<]*))?' is the second argument of tagsParse. This is for
     * example 'style="color: blue;"'.
     */
    var regularExpression = /<(\/?\w+)(?:\s+([^<]*))?>/g;
    return htmlString.replace(regularExpression, parseTag);
  };

  /**
  * Make an request to the server in order to get a pdf file.
  *
  * @param {string} htmlString String to generate pdf from HTML.
  */
  this.download = function(htmlString) {
    var latexString = tokenize(htmlString);
    //TODO: Request to server
    alert(latexString);
  };
});
