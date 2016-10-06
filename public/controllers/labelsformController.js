app.controller("labelsformCtrl",['$http','$cookieStore','$scope','userService', 'labelsService','$location','$stateParams', function ($http,$cookieStore,$scope,userService ,labelsService ,$location,$stateParams) {
    //init
// sticks the values to the inputs of tasks form for the edit operation
    if ($stateParams.id) {
        $scope.labels = labelsService.get({id: $stateParams.id}); //dont have promise // have promise, you don't know how to use it....
        // TasksService.get({id: $routeParams.id}, function( response ){
        // console.log("Boris ngresource promise:", response);
        // $scope.Tasks = response;
        // });
    }
    console.log($scope.labels)
    console.log($scope.labels.$promise);


    $scope.labels.$promise.then(function(res){


        $scope.labels = res;

        $scope.editlabel = function ( lb_id ) {
            console.log('suka label id', lb_id);
            var label = {
                lb_name:$scope.labels.lb_name
                // t_creation_date:$scope.t_creation_date


            };



            labelsService.update({id:lb_id}, label);


            $location.url("/labels");


            //   console.log( $scope.Tasks.t_id);

        };

    })


    $scope.labels = {
        // t_id:undefined,
        lb_name: undefined


        // t_creation_date: undefined
    };


    (function() {

        $('#date').datepicker({

            dateFormat: 'yy-mm-dd'
        });

    })();







    $scope.logout = function (){

        userService.logout()

        $cookieStore.remove('logedin');
        $cookieStore.remove('username');
        // $state.go("first");
    };

}]);