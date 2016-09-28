app.controller('profileCtrl', ['$scope', 'users', function ($scope, users) {
    users.success(function (data) {
        $scope.users = data;
    });
}]);