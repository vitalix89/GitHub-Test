app.controller("changepasswordCtrl", ['$http','$cookieStore','$scope','UsersResource','$location','$stateParams',  function ($http,$cookieStore,$scope,UsersResource ,$location,$stateParams) {
    /*    //init
     // if ($routeParams.id) {
     //     $scope.getid = UsersService.get({id: $routeParams.id});
     // }

     // $scope.getid = UsersService.get({id:2});

     /!*   $scope.getid.$promise.then(function(res){

     console.log(res.u_id);

     var u_id =res.u_id;


     })*!/*/


    /*   console.log(window.location.href);

     var href =window.location.href;

     var array_href =href.split('/');

     console.log(array_href[6]);

     var hash = array_href[6];*/

   console.log($stateParams.id);

    var hash = $stateParams.id;


    $scope.Email = {

        u_password: undefined
    }


    $scope.changepass =function(){


        $scope.erorrmessage='';
        $scope.successmessage='';


        var data={

            u_password:$scope.Email.u_password
        }

        $http.post("http://localhost/CI36/users/changepass?hash="+hash, data).then(function(response){
            console.log(response);


            if(response.data.error){

                $scope.erorrmessage=response.data.error;

            }else if(response.data.success){

                $scope.successmessage = response.data.success;
            }else{

                $scope.erorrmessage ='huyna';
            }


        })
    }

}]);
