/**
 * Created by Vadim on 08/07/2016.
 */
app.controller('signupCtrl', ['$scope','$http','$rootScope','$location','userService',
    function ($scope,$http,$rootScope,$location, userService) {

    console.log('hi');

        $scope.signupuser = {
            u_first: undefined,
            u_last: undefined,
            u_gender: undefined,
            u_email: undefined,
            u_password: undefined
        };

        $scope.signUserUp = function (){
            var data = {
                u_first:$scope.signupuser.u_first,
                u_last:$scope.signupuser.u_last,
                u_gender:$scope.signupuser.u_gender,
                u_email:$scope.signupuser.u_email,
                u_password:$scope.signupuser.u_password

            };



            userService.signup(data).then(function (response) {


                if(response.data.success==true){

                    // $location.url("/firstsignup");
                  //  console.log(response.data.check);
                    $scope.check= response.data.check;
                    $scope.silver= response.data.silver;

                    return response;

                }else{

                    console.log('cho-ahuyel?')
                }
            }, function (response) {
                alert("Error: No data returned");

            });

        };
    }
]);