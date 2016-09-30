var app = angular.module("app", ["ngRoute"]);
app.config(['$routeProvider', '$locationProvider', '$controllerProvider', '$httpProvider', function ($routeProvider, $locationProvider, $controllerProvider, $httpProvider) {
    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('tokenInterceptor');
    $routeProvider
        .when('/', {
            templateUrl: '../views/pracownik.html',
            access: {requiredLogin: false}
        })
        .when('/login', {
            controller: 'loginCtrl',
            templateUrl: '../views/login.html',
            access: {requiredLogin: false}
        })
        .when('/zamow', {
            controller: 'orderFormCtrl',
            templateUrl: '../views/zamow.html',
            access: {requiredLogin: false}
        })
        .when('/wypozycz', {
            controller: 'rentFormCtrl',
            templateUrl: '../views/wypozycz.html',
            access: {requiredLogin: false}
        })
        .when('/status', {
            controller: 'statusCtrl',
            templateUrl: '../views/status.html',
            access: {requiredLogin: false}
        })
        .when('/profil', {
            controller: 'profileCtrl',
            templateUrl: '../views/profile.html',
            access: {requiredLogin: false}
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

app.run(function ($rootScope, $location, authenticationService) {
    $rootScope.$on('$routeChangeStart', function (event, nextRoute, currentRoute) {
        if (nextRoute.access.requiredLogin && !authenticationService.isLogged) {
            $location.path('/login');
        }
    });
});