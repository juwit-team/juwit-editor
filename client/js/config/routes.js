/*
  Configure routes used with ngRoute. We chose not to use $locationProvider.html5Mode(true);
  because using HTML5 pushstate requires that server routes are setup to mirror the routes
  in this file. Since this isn't a node course we're going to skip it. For all intensive
  purposes, html5 mode and url hash mode perform the same when within an angular app.
*/
angular.module('LatexEditor').config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      // redirect to the editor index
      redirectTo: '/editor'
    })
    
    .when('/editor', {
      templateUrl: 'templates/pages/editor/index.html',
      controller: 'EditorIndexController',
      controllerAS: 'indexCtrl'
    })
    
    // // FUTURE: if we want resumeable editors
    // .when('/users/:hash', {
    //   templateUrl: 'templates/pages/users/index.html',
    //   controller: 'EditorLoadController'
    // })

    .otherwise({redirectTo: '/'});
}]);