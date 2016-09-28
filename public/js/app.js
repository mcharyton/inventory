var app = angular.module("app", ["ngRoute"]);
app.config(['$routeProvider', '$locationProvider', '$controllerProvider', function ($routeProvider, $locationProvider, $controllerProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
        .when('/', {
            contoller: 'formCtrl',
            templateUrl: '../views/main.html'
        })
        .when('/pracownik', {
            templateUrl: '../views/pracownik.html'
        })
        .when('/zamow', {
            templateUrl: '../views/zamow.html'
        })
        .when('/wypozycz', {
            templateUrl: '../views/wypozycz.html'
        })
        .when('/profil', {
            controller: 'profilCtrl',
            templateUrl: '../views/profil.html'
        });

    app.controllerProvider = $controllerProvider;

}]);