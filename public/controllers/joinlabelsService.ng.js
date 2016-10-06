app.factory('joinlabelsService',['$resource',
    function($resource){
        return $resource('http://localhost:1234/CI36/joinlabels/:id',{},{
            update: {method:'PUT', params: {id: '@id'}}
        });
}]);
