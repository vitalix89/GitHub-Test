app.factory('UsersResource',['$resource',
    function($resource){
        return $resource('http://localhost:8080/users/all_users/:id',{},{
            update: {method:'PUT', params: {id: '@id'}, Array:true}
        });
}]);
