app.factory('messagesResource',['$resource',
    function($resource){
        return $resource('http://localhost:8080/users/insert_messages/:id',{},{
            update: {method:'PUT', params: {id: '@id'}}
        });
}]);
