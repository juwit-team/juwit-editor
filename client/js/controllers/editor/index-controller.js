'use strict';
angular.module('LatexEditor').controller('EditorIndexController', ['$scope', 'textAngularManager',  '$document', '$http', 'pdfDelegate', 'latexParser', '$modal', function($scope, textAngularManager, $document, $http, pdfDelegate, latexParser, $modal) {
  $scope.disabled = false;
  $scope.canEdit = true;
  
  $scope.sender = {
    "name"  : '', 
    "adress": '', 
    "city"  : ''
  };

  /**
  * Make a request to the server in order to get a pdf file.
  *
  * @param {string} htmlString String to generate pdf from HTML.
  */
  $scope.download = function() {

    //var latexString = latexParser.html2latex(htmlString);
    $http.post("/company/document/compile", {"latexCode": $scope.data.htmlContent})
    .success(function(data, status, headers, config) {
      if (data.error) {
        alert(data.error);
      };
      if (typeof data.redirect === 'string') {
        pdfDelegate.$getByHandle('pdf-preview').load(data.redirect);
        //alert(data.redirect);
        //window.open(data.redirect, '_new', 'toolbar=yes, location=yes, status=yes, menubar=yes, scrollbars=yes');
      } 
    }).error(function(data, status, headers, config) {
      //TODO: Error Handling
      console.log('nope');
      //alert(data.error);
    });
  };

  $scope.submit = function() {
    $http.post("/company/document/info", {"sender": $scope.sender, "recipient": $scope.recipient})
    .success(function(data, status, headers, config){
      if (data.error) {
        console.log("wrong variballs!");
      }
    })
    .error(function(data, status, headers, config) {
      if (data.error) {
        console.log("wrong variballs!");
      }
    });
  }

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