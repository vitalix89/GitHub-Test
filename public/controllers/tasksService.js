/**
 * Created by Vadim on 08/07/2016.
 */
app.factory('tasksService', ['$cookieStore','messagesResource','socket','$stateParams','$rootScope','$timeout','$resource','$http','$state', function ($cookieStore,messagesResource,socket,$stateParams,$rootScope,$timeout,$resource,$http,$state) {

    var currentUser;
    var Userid;
    var labelid;
    var creationdate;
    var logged_in;
    var username;
    var email;
    var admin;
    var user;
    var cookieget;
    var u_id;
    var u_first;

    return {

        logoffwisper: function(data){




                console.log(data.u_from);




               //$cookieStore.put("u_from",111)


                $http.post('http://localhost:8080/users/insert_messages',data);


        

         //   console.log(id);

            console.log(data.u_from);


            var update ={

                u_id:data.u_id,
                u_from:data.u_from,
                has_message:1
            };



                $http.put('http://localhost:8080/users/update_users_mates',update);


                // $scope.msg = data;
                //  $('#chat').append(data.msg)



        },


        signup:function(data){

            return $http.post("http://localhost:8080/auth/register", data);

        },



   /*     isLoggedIn: function(){
            if( $cookieStore.get('logedin')){
                console.log('logged in, sending event...');
                // Dirty hack!
                $timeout(function(){
                    $rootScope.$broadcast("login_success",$cookieStore.get('logedin'));
                  //  $rootScope.$broadcast("login_admin",$cookieStore.get('logedin')  );

                }, 1);

                return true;
            }
           // return logged_in
        }(),*/

        isLoggedInadmin: function(){
            if( $cookieStore.get('admin')){
                console.log('logged in, sending event...');
                // Dirty hack!
                $timeout(function(){
                //    $rootScope.$broadcast("login_success",$cookieStore.get('logedin'));
                    $rootScope.$broadcast("login_admin",$cookieStore.get('logedin')  );

                }, 1);
            }
            // return logged_in
        }(),

        logout: function(){

            $cookieStore.remove('logedin');
            $cookieStore.remove('username');
            $cookieStore.remove('u_id');



            $http.post('http://localhost/CI36/Users/logout')
                .then(function( response ){
                    console.log(response);
                    console.log(response.data.logged_in);
                    $rootScope.$broadcast("logout_success");


                    if(!response.data.logged_in){

                        logged_in = undefined;
                       $state.go("/");

                    }else{

                        $state.go("task");

                    }
                });




        },

        on_myself: function(){


            socket.on("myself", function (data) {

                console.log('suka_message'+data.message)


                //  alert('suka')

                $rootScope.$broadcast('eventFired', {
                    data: 'something'

                });

              //  messagesResource.save(data);

                $http.post('http://localhost:8080/users/insert_messages_to_myself',data)


                $('#chat'+data.shit).append('<br/>'+'<br/>'+'<br/>'+'<span class="booble-chat-sender"><h6 style="margin-top:3px;line-height: 1.5em;">'+data.message+'</h6></span>'+ '<br/>'+'<br/>'+'<br/>')


                document.getElementById("chat" + data.shit).scrollTop = document.getElementById("chat" + data.shit).scrollHeight;


            })


        }(),
        Userid: function(){
            return Userid;
        },


        getUser: function(){

            if( $cookieStore.get('logedin')){

                return true;
            }else{

                return false
            }

        },


        getthisshit: function(){
            return labelid;
        },

        creationdate: function(){
            return creationdate;
        },

        resource: function(){
            return $resource('http://localhost/CI36/Tasks',{},{
                update: {method:'PUT', params: {id: '@id'}}
            });
        }
    }


}])




