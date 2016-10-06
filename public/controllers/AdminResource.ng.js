app.factory('AdminResource',['$resource',
    function($resource){
        return $resource('http://localhost/CI36/admin/:id',{},{
            update: {method:'PUT', params: {id: '@id'}}
        });
}]);
