/**
 * Created by m.charyton on 28.09.2016.
 */
app.controller("loginCtrl", ['$scope', '$http', 'authenticationService', '$window', '$location', 'userService', function ($scope, $http, authenticationService, userService, $window, $location) {
    "use strict";
    $scope.emailPattern = new RegExp("(?=.*[@])(?=.*[.])");
    $scope.passPattern = new RegExp("(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])");

    $scope.user = {};

    $scope.info = JSON.stringify({work: 'ok'});
    $scope.correctLogIn = false;
    $scope.incorrectLogIn = false;
    $scope.serverProblem = false;

    $scope.submitData = function ($event) {
        $scope.info = "w submicie";
        console.log('Pracuje nad submitem');
        var dataObj = {
            email: $scope.user.email,
            pass: $scope.user.pass,
        };

        $http.post('http://localhost:3000/authenticate', dataObj)
            .success(function (data) {
                $scope.info = "Post sukces";
            $scope.serverProblem = false;
            if (data.valid === true) {
                $scope.info = data.data;
                $scope.correctLogIn = true;
                $window.sessionStorage.token = data.data;
                $location.path('/pracownik');
            } else {
                $scope.incorrectLogIn = true;
            }
            $scope.clearForm();
            })
            .error(function (data, status) {
                $scope.info = "post error";
                console.log(status);
                console.log(data);
                console.log("blad logowania");
            $scope.incorrectLogIn = false;
            $scope.serverProblem = true;
            $scope.clearForm();
        });

        $event.preventDefault();
    };


    //Admin User Controller (login, logout)
    $scope.logIn = function logIn(username, password) {
        if (username !== undefined && password !== undefined) {

            userService.logIn(username, password).success(function (data) {
                authenticationService.isLogged = true;
                $window.sessionStorage.token = data.token;
                $scope.correctLogIn = true;
                $location.path('/');
            }).error(function (status, data) {
                console.log(status);
                console.log(data);
                $scope.incorrectLogIn = false;
                $scope.serverProblem = true;
                $scope.clearForm();
            });
        }
    };

    $scope.logout = function logout() {
        if (authenticationService.isLogged) {
            authenticationService.isLogged = false;
            delete $window.sessionStorage.token;
            $location.path('/');
        }
    };



    $scope.clearForm = function () {
        $scope.user.email = "";
        $scope.user.pass = "";
        $scope.angularForm.$setPristine();
        $scope.angularForm.$setUntouched();
    }
}]);

