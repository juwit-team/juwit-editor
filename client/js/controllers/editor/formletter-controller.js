angular
  .module('LatexEditor')
  .controller('FormletterController', ['$scope', 'FileUploader', function($scope, FileUploader) {
    var uploader = $scope.uploader = new FileUploader({
      // execute updateCSV with :group = company and :document = document
      // Path on the server in which this file will be uploaded
      url: '/company/csv/updateCSV'
      
      //Name of the field which will contain the file, default is file
      //alias: 'csv-file'
    });
  }]);
