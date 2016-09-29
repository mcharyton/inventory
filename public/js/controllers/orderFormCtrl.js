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
    // let date =
    // date.setDate(fromDate + 30);
    $scope.toDateChange = function (fromDate) {
        let date = new Date(fromDate);
        $scope.minToDate = date;
        let toDate = new Date();
        toDate.setMonth(date.getMonth() + 1);
        $scope.maxToDate = toDate;
    };


    $scope.submit = function (order) {
        $scope.toRent = JSON.stringify(order);
        let toOrder = $scope.toOrder;
        $http.post('http://localhost:3000/api/order/', toOrder)
            .then(function (response) {
                console.log(response);
            });
    };

}]);
