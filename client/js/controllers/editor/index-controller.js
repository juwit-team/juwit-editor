'use strict';
angular.module('LatexEditor').controller('EditorIndexController', ['$scope', 'textAngularManager',  '$document', '$http', 'pdfDelegate', 'latexParser', '$modal', function($scope, textAngularManager, $document, $http, pdfDelegate, latexParser, $modal) {
    $scope.data = {orightml: ''};
    $scope.data.htmlcontent = $scope.data.orightml;
    $scope.disabled = false;
    $scope.canEdit = true;
    

    /**
    * Make a request to the server in order to get a pdf file.
    *
    * @param {string} htmlString String to generate pdf from HTML.
    */
    $scope.download = function(htmlString) {

      var latexString = latexParser.html2latex(htmlString);

      $http.post("/compile/template.tex", {"latexCode": latexString})
      .success(function(data, status, headers, config) {
        if (data.error) {
          alert(data.error);scope
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

  //function for selecting a template
  $scope.templates = [
      {name: 'Artikel', editable: false},
      {name: 'Brief', editable: true, modaltarget: '#letter'},
      {name: 'Serienbrief', editable: true, modaltarget: '#formletter'}
    ];

  $scope.selectedTemplate = $scope.templates[0]; //Artikel is default selected

  $scope.modal = function() {  
    if ($scope.selectedTemplate.editable) {
      $($scope.selectedTemplate.modaltarget).modal('toggle');
    };
  };

}]);