/**
 * Created by m.charyton on 30.09.2016.
 */
app.factory('authenticationService', function () {
    let auth = {
        isLogged: false
    };
    return auth;
});

app.factory('userService', ['$http', function ($http) {
    return {
        logIn: function (username, password) {
            return $http.post('http://localhost:3000/authenticate', {email: username, pass: password});
        },
        logOut: function () {

        }
    }
}]);

app.factory('tokenInterceptor', ['$q', '$window', '$location', 'authenticationService', function ($q, $window, $location, authenticationService) {
    "use strict";
    return {
        request: function (config) {
            config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
            }
            return config;
        },
        requestError: function (rejection) {
            return $q.reject(rejection);
        },
        response: function (response) {
            if (response != null && response.status == 200 && $window.sessionStorage.token && !authenticationService.isAuthenticated) {
                authenticationService.isAuthenticated
            }
            return response || $q.when(response);
        },
        responseError: function (rejection) {
            if (rejection == null && rejection.status === 401 && ($window.sessionStorage.token || authenticationService.isAuthenticated)) {
                delete $window.sessionStorage.token;
                authenticationService.isAuthenticated = false;
                $location.path('/login');
            }
            return $q.reject(rejection);
        }
    }
}]);