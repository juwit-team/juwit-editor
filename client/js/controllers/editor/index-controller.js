'use strict';
angular.module('LatexEditor').controller('EditorIndexController', ['$scope', 'textAngularManager',  '$document', '$http', 'pdfDelegate', 'latexParser', '$modal', function($scope, textAngularManager, $document, $http, pdfDelegate, latexParser, $modal) {
  $scope.disabled = false;
  $scope.canEdit = true;
  
  $scope.sender = {
    "name"   : 'Michaela Musterfrau', 
    "address": 'Musterstraße 1', 
    "city"   : '10713 Berlin'
    "date"   : '21.01.1984'
    "email"  : 'm.mu@mustermail.de'
    "telnr"  : '000 000 000000'
  };

  $scope.recipient = {
    "name"   : 'Dieter Din', 
    "address": 'DIN Str. 1', 
    "city"   : '14193 Berlin'
  };

  /**
  * Make a request to the server in order to get a pdf file.
  *
  * @param {string} htmlString String to generate pdf from HTML.
  */
  $scope.download = function() {

    var postData = {
      "htmlCode": $scope.data.htmlContent, 
      "type": $scope.selectedTemplate.type,
      "sender": $scope.sender
    }

    //var latexString = latexParser.html2latex(htmlString);
    $http.post("/company/document/compile", postData)
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

  $scope.updateLetterInfo = function() {
    $http.post("/company/document/updateLetterInfo", {"sender": $scope.sender, "recipient": $scope.recipient})
    .success(function(data, status, headers, config){
      if (data.variballs) {
        alert(data);
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
      {typ: 'article', name: 'Artikel', editable: false},
      {typ: 'letter', name: 'Brief', editable: true, modaltarget: '#letter'},
      {typ: 'bulk-letter', name: 'Serienbrief', editable: true, modaltarget: '#formletter'}
    ];

  $scope.selectedTemplate = $scope.templates[0]; //Artikel is default selected

  $scope.modal = function() {  
    if ($scope.selectedTemplate.editable) {
      $($scope.selectedTemplate.modaltarget).modal('toggle');
    };
  };

}]);
