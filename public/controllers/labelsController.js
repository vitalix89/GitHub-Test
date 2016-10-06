app.controller("labelsCtrl", ['$http','$rootScope','$cookieStore','$scope','labelsService','userService','$location',  function ($http,$rootScope,$cookieStore,$scope,labelsService,usersService ,$location) {
    //init


    $scope.userlabels = labelsService.query();



    $scope.label = {
        // t_id:undefined,
        lb_name: undefined
    }




    $scope.Addlabel = function (){

        //$scope.contact.createDate = new Date();
        // $scope.t_creation_date= new Date();

        var data = {
            //  t_id:$scope.Tasks.t_id,
            lb_name:$scope.label.lb_name

        }

        $http.post("http://localhost/CI36/labels", data).then(function(response){
            console.log(response);

            $scope.userlabels.push(response.data);
            // $scope.userTasks = TasksService.query();

        })
    };







    $scope.deletelabel = function (index, lb_id) {

        labelsService.delete({id: lb_id}, function () {

            $scope.userlabels.splice(index, 1);

        });
    };


    $scope.editerlabel = function ( lb_id ) {

        console.log(lb_id );
        $location.url("/labelsform/"+lb_id);

        //validate first
        //if user have id this is an update operation
        //  console.log( $scope.Tasks.t_id);

    };



    $scope.edit = function (lb_id, index) {
        $scope.isEditing = index;
        $rootScope.$broadcast("edit", lb_id);
        $location.path('/labels/'+lb_id, false);


        console.log(lb_id)

    };



    $scope.logout = function (){

        userService.logout();

        $cookieStore.remove('logedin');
        $cookieStore.remove('username');
        // $state.go("first");
    };


}]);