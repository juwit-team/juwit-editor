'use strict';
angular.module('LatexEditor').controller('EditorIndexController', ['$scope', 'textAngularManager',  '$document', '$http', 'pdfDelegate', 'latexParser', function($scope, textAngularManager, $document, $http, pdfDelegate, latexParser) {
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

  //function for editing the selected modal

  /*$scope.formEdit = 1; //boolean for form-edit
  $scope.modalName=""; //var for choosing between modalforms
  
  $scope.setForm= function (name) {
    $scope.formEdit=0;
    $scope.modalName= "#" +name;
      };*/
  $scope.styles = [
      {name:'Artikel', editable: false },
      {name:'Brief', editable: true, modaltarget:'#letter'},
      {name:'Serienbrief', editable: true, modaltarget:'#formletter'}
    ];
  $scope.myStyle = $scope.styles[0]; //Artikel is default selected
  //$('#myModal').modal('toggle');


}]);