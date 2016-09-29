/**
 * Created by Dominik on 2016-09-29.
 */
/**
 * Created by Dominik on 2016-09-29.
 */

app.factory('rents', ['$http', function ($http) {
    return $http.get('http://localhost:3000/api/rent')
        .success(function (data) {
            return data;
        })
        .error(function (err) {
            return err;
        });
}]);