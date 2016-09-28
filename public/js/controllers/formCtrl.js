/**
 * Created by m.charyton on 28.09.2016.
 */
app.controller("formCtrl", function ($scope, $http) {
    $scope.emailPattern = new RegExp("(?=.*[@])(?=.*[.])");
    $scope.passPattern = new RegExp("(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])");

    $scope.user = {};

    $scope.correctLogIn = false;
    $scope.incorrectLogIn = false;
    $scope.serverProblem = false;

    $scope.submitData = function ($event) {
        var dataObj = {
            email: $scope.user.email,
            pass: $scope.user.pass,
        };

        var request = {
            method: 'POST',
            url: '//api.test/auth',
            data: dataObj
        };

        $http(request).success(function (data) {
            $scope.serverProblem = false;
            if (data.valid === true) {
                $scope.correctLogIn = true;
            } else {
                $scope.incorrectLogIn = true;
            }
            $scope.clearForm();
        });

        $http(request).error(function (data, status) {
            $scope.incorrectLogIn = false;
            $scope.serverProblem = true;
            $scope.clearForm();
        });

        $event.preventDefault();
    };

    $scope.clearForm = function () {
        $scope.user.email = "";
        $scope.user.pass = "";
        $scope.angularForm.$setPristine();
        $scope.angularForm.$setUntouched();
    }
});

