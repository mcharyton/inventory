/**
 * Created by Dominik on 2016-09-29.
 */

app.factory('orders', ['$http', function ($http) {
    return $http.get('http://localhost:3000/api/order')
        .success(function (data) {
            return data;
        })
        .error(function (err) {
            return err;
        });
}]);