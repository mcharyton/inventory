/**
 * Created by m.charyton on 29.09.2016.
 */

app.controller("orderFormCtrl", ['$scope', 'types', 'categories', '$http', function ($scope, types, categories, $http) {
    "use strict";

    categories.success(function (data) {
        $scope.categories = data;
    });

    types.success(function (data) {
        $scope.types = data;
    });

    $scope.today = new Date();

    $scope.submit = function (order) {
        $scope.toOrder = JSON.stringify(order);
        let toOrder = $scope.toOrder;
        $http.post('http://localhost:3000/api/order/', toOrder)
            .then(function (response) {
                console.log(response);
            });
    };

}]);
