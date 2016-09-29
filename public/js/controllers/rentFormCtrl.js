/**
 * Created by m.charyton on 28.09.2016.
 */
app.controller("rentFormCtrl", ['$scope', 'types', 'categories', function ($scope, types, categories) {
    "use strict";
    categories.success(function (data) {
        $scope.categories = data;
    });
    types.success(function (data) {
        $scope.types = data;
    });
    $scope.today = new Date();
    let date = new Date(fromDate);
    // date.setDate(fromDate + 30);
    $scope.maxDate = date;

}]);