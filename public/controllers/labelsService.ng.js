app.factory('labelsService',['$resource',
    function($resource){
        return $resource('http://localhost/CI36/labels/:id',{},{
            update: {method:'PUT', params: {id: '@id'}}
        });
}]);
