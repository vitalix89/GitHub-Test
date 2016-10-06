app.controller("forgotemailCtrl", ['$http','$cookieStore','$scope','$location',  function ($http,$cookieStore,$scope ,$location) {
    //init
   /* if ($routeParams.id) {
        $scope.getusertask = AdminService.get({id: $routeParams.id});
    }*/

    $scope.Email = {

        u_email: undefined
    }


    $scope.forgetpass =function(){

        $scope.erorrmessage='';
        $scope.successmessage='';

        var data={

            u_email:$scope.Email.u_email
        }

        $http.post("http://localhost/CI36/users/forgetpass", data).then(function(response){
            console.log(response);

            if(response.data.Enail-Error){

                $scope.erorrmessage=response.data.Enail-Error;

            }else if(response.data.check){

                $scope.successmessage = response.data.check;
            }else{

                $scope.erorrmessage ='BAD EMAIL';
            }








        })


    }



}]);
