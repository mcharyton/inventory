/**
 * Created by Dominik on 2016-09-28.
 */
var app = angular.module("productForm", []);
app.directive('productForm', function () {
    return {
        restrict: 'E',
        templateUrl: 'productForm.html'
    }
});