'use strict';
angular.module("textAngularTest").controller('ButtonController', ['$http',  function($http) {
  /**
   * @return {string} A LaTeX command.
   */    
  this.parseTag = function (match, tag) {
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
  this.tokenize = function (htmlString) {
    /**
     * '(\/?\w+)' is the first argument of tagsParse (the tag). A tag may begin
     * with '/' followed by a word.
     * '(?:\s+([^<]*))?' is the second argument of tagsParse. This is for
     * example 'style="color: blue;"'.
     */
    var regularExpression = /<(\/?\w+)(?:\s+([^<]*))?>/g;
    return htmlString.replace(regularExpression, this.parseTag);
  };

  /**
  * Make an request to the server in order to get a pdf file.
  *
  * @param {string} htmlString String to generate pdf from HTML.
  */
  this.download = function(htmlString) {
    var latexString = this.tokenize(htmlString);
    //TODO: Request to server
    // alert(latexString);
    // $.ajax({
    //   url: 'localhost:1338/compile',
    //   type: 'POST',
    //   data: {latexCode: latexString},
    //   dataType: 'json',
    //   success: function(data, textStatus, jqXHR) {
    //     // alert(data.redirect);
    //     if (typeof data.redirect === 'string') {
    //       window.open(data.redirect, '_new', 'toolbar=yes, location=yes, status=yes, menubar=yes, scrollbars=yes');
    //     }                            
    //   }
    // });
    //alert('häh');
    $http.post("/compile", {latexCode: latexString})
    .success(function(data, status, headers, config) {
      //alert(status);
      if (typeof data.redirect === 'string') {
        //alert(data.redirect);
        window.open(data.redirect, '_new', 'toolbar=yes, location=yes, status=yes, menubar=yes, scrollbars=yes');
      } 
      //$scope.data = data;
    }).error(function(data, status, headers, config) {
      //(status);
        //$scope.status = status;
    })
  };
}]);
