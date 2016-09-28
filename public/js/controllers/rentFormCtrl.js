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

}]);