app.factory('coordsResource',['$resource',
    function($resource){
        return $resource('http://localhost:8080/users/getallcordinates/:id' ,{},
        {'query': {method:'GET', isArray: true}
        });
}]);
