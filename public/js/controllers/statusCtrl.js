/**
 * Created by Dominik on 2016-09-28.
 */
app.controller('statusCtrl', ['$scope', 'orders', 'rents', function ($scope, orders, rents) {
    orders.success(function (data) {
        $scope.orders = data;
    });
    rents.success(function (data) {
        $scope.rents = data;
    });
}]);