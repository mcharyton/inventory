app.controller('profilCtrl', ['$scope', 'users', function ($scope, users) {
    users.success(function (data) {
        $scope.users = data;
    });
}]);