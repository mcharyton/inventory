/**
 * Created by m.charyton on 28.09.2016.
 */
app.factory('types', ['$http', function ($http) {
    return $http.get('http://localhost:3000/api/other/type')
        .success(function (data) {
            return data;
        })
        .error(function (err) {
            return err;
        });
}]);

