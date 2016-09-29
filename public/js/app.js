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
            controller: 'rentFormCtrl',
            templateUrl: '../views/wypozycz.html'
        })
        .when('/status', {
            controller: 'statusCtrl',
            templateUrl: '../views/status.html'
        })
        .when('/profil', {
            controller: 'profileCtrl',
            templateUrl: '../views/profile.html'
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