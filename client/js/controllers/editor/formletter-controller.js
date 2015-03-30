angular
  .module('LatexEditor')
  .controller('FormletterController', ['$scope', 'FileUploader', function($scope, FileUploader) {
    var uploader = $scope.uploader = new FileUploader({
      // execute updateCSV with :group = company and :document = document
      // TODO: add custom company/csv string for different user
      url: '/company/document/updateCSV'
    });
  }]);
