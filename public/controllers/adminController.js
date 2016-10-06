app.controller("adminCtrl", ['$cookieStore','$scope','userService','AdminResource','$location',  function ($cookieStore,$scope,userService,AdminResource,$location) {
    //init


    $scope.adminuser = AdminResource.query();

    console.log($scope.adminuser);

    // $scope.oneTask = AdminService.get({ id: 62 });

    /* $scope.oneTask = AdminService.get( { id: 62 }  );    // GET
     $scope.oneTask.$promise.then(function(data) {
     console.log(data);
     });*/

    //console.log( $scope.oneTask);
    $scope.getusersTasks = function (u_id){


        console.log( u_id);

        $scope.getusertask =  AdminResource.query({ id: u_id });

        console.log( $scope.getusertask);

        // $location.url("/adminusertasks");

        //   return  $scope.getusertask;




    };


    $scope.deleteuser =function(u_id){

        console.log(u_id);

        AdminResource.remove({ id: u_id })

    };





    if($cookieStore.get('admin')){

        $location.url("/admin");
        //$location.url("/admin");
        // $state.go("second");
    }else{
        $location.url("/login");
        //$state.go("first");

    }


    $scope.logout = function (){

       userService.logout()

        $("#admin").contents().filter(function(){
            return (this.nodeType == 1);
        }).remove();

        $cookieStore.remove('logedin');
        $cookieStore.remove('username');
        $cookieStore.remove('admin');
        // $state.go("first");
    };

}]);
