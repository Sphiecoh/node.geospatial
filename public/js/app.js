// Declares the initial angular module "meanMapApp". Module grabs other controllers and services.
var app = angular.module('mapApp', ['geolocation','ngRoute']);
app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: '/partials/users.html',
        controller: 'userController'
      }).
      when('/search', {
        templateUrl: 'partials/search.html',
        controller: 'searchController'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);