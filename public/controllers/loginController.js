/**
 * Created by Vadim on 08/07/2016.
 */
app.controller('loginCtrl', ['$scope','socket','$http','$rootScope','$location','userService',
    function ($scope,socket,$http,$rootScope,$location, userService) {
//console.log('hi');



     /*   $scope.hide_send_list = function () {

            alert('suka')

            $scope.messages = false

        }*/

        console.log(socket);
      /*  var socket = io.connect();

        console.log(socket)*/

        var main = this;

        $scope.name ='suka';

        console.log(main);

        main.loggedIn = false;

      //  main.online = userService.isLoggedIn;


        $rootScope.$on("login_success", function(event, args){
            main.loggedIn = true;

            $scope.currentuser = args;
            console.log('event received', event);
        });


        $rootScope.$on("login_admin", function(event, args){
            main.admin = true;

            $scope.currentuser = args;
            console.log('event received', event);
        });



        $rootScope.$on("logout_success", function(){
            main.loggedIn = false;
            main.admin = false;
        });


        userService.resource();

        $scope.TasksMap =  userService.query;



        $scope.userlogin = {

            u_email: undefined,
            u_password: undefined

        };

        $scope.loginUser = function() {

            var data = {

                u_email:$scope.userlogin.u_email,
                u_password:$scope.userlogin.u_password

            };

            userService.login( data );


            $scope.TasksMap =  userService.query;

            console.log($scope.TasksMap);

            console.log($scope.logged_in );

        }


    }
]);