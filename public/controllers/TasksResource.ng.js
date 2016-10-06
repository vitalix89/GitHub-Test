app.factory('TasksResource',['$resource',
    function($resource){
        return $resource('http://localhost/CI36/Tasks/:id',{},{
            update: {method:'PUT', params: {id: '@id'} }
        });
}]);
