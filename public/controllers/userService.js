/**
 * Created by Vadim on 08/07/2016.
 */
app.factory('userService', ['$cookieStore','socket','$stateParams','$rootScope','$timeout','$resource','$http','$state', function ($cookieStore,socket,$stateParams,$rootScope,$timeout,$resource,$http,$state) {

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
        login: function( data ){
            console.log('logged_in BEFORE login: ', logged_in);


            $http.post('http://localhost:8080/auth/login', data)
                .then(function( response ){
                    console.log(response);
                    console.log(response.data.logged_in);
                    currentUser = response.data;

                    username = response.data.username;

                    console.log('logged_in AFTER login: ', logged_in);

                    if(response.data.success==true){


                      u_id =response.data.result[0].u_id;

                        u_first =response.data.result[0].u_first;


                        $cookieStore.put("u_id",u_id);

                        $cookieStore.put("u_first",u_first);

                       // socket.emit("new user", u_id );

                     //   socket.emit("all users", u_id );


                        $state.go("task");



                    }else{

                        console.log('suka')
                    }

/*
                    if(response.data.logged_in==true && response.data.userrole==='user' && response.data.verified==1){
                        $rootScope.$broadcast("login_success", response.data.username  );

                        logged_in = response.data.logged_in;
                        u_id =response.data.u_id;
                        username = response.data.username;
                        email = response.data.email;
                        $cookieStore.put("logedin",logged_in);
                        user = response.data.userrole;
                        $cookieStore.put("user",user);
                        $cookieStore.put("u_id",u_id);
                        // $cookieStore.put("username",username);
                        $cookieStore.put("email",email);
                        $cookieStore.put("username",username);

                       // cookieget = $cookieStore.get('username');
                        cookieget = $cookieStore.get('email');

                        currentUser = response.data;



                        $state.go("task");



                    }else if(response.data.logged_in==true && response.data.userrole==='ADMIN'){
                     //   $rootScope.$broadcast("login_success", response.data.username  );
                        $rootScope.$broadcast("login_success", response.data.username  );

                        $rootScope.$broadcast("login_admin", response.data.username  );
                        logged_in = response.data.logged_in;
                        username = response.data.username;
                        email = response.data.email;
                        $cookieStore.put("logedin",logged_in);
                        admin = response.data.userrole;
                        $cookieStore.put("admin",admin);


                        $state.go("admin");
                        console.log('this is admin')


                    }else{

                        $state.go("login");

                    }*/
                });
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

        currentUser: function(){
            return currentUser;
        },
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




