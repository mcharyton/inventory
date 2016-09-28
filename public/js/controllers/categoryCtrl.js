/**
 * Created by m.charyton on 28.09.2016.
 */
app.controller('categoryCtrl', ['$scope', 'categories', 'types', function ($scope, categories, types) {
    categories.success(function (data) {
        $scope.categories = data;
    });
    types.success(function (data) {
        $scope.types = data;
    });
}]);