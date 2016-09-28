var app = angular.module("app", ["ngRoute"]);
app.config(['$routeProvider', '$locationProvider', '$controllerProvider', function ($routeProvider, $locationProvider, $controllerProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
        .when('/', {
            controller: 'formCtrl',
            templateUrl: '../views/main.html'
        })
        .when('/pracownik', {
            templateUrl: '../views/pracownik.html'
        })
        .when('/zamow', {
            templateUrl: '../views/zamow.html'
        })
        .when('/wypozycz', {
            controller: 'formCtrl',
            templateUrl: '../views/wypozycz.html'
        })
        .when('/profil', {
            controller: 'profilCtrl',
            templateUrl: '../views/profil.html'
        })
        .when('/404', {
            controller: ['$location', function ($location) {
                window.location = "/404";
            }]
        })
        .otherwise({
            redirectTo: function () {
                window.location = "/404";
            }
        });

    app.controllerProvider = $controllerProvider;

}]);