app.controller("tasksformCtrl",['$http','socket','$cookieStore','$scope','userService', 'UsersResource','$location','$stateParams',  function ($http,socket,$cookieStore,$scope,userService ,UsersResource ,$location,$stateParams) {
    //init
// sticks the values to the inputs of tasks form for the edit operation
    if ($stateParams.id) {
        $scope.Users = UsersResource.query({id: $stateParams.id}); //dont have promise // have promise, you don't know how to use it....
        // TasksService.get({id: $routeParams.id}, function( response ){
        // console.log("Boris ngresource promise:", response);
        // $scope.Tasks = response;
        // });

       // $scope.loadData();

       // $state.reload();



    }
    console.log($scope.Users);
    console.log($stateParams.id);


    $scope.Users.$promise.then(function(res){


        console.log(res);

        $scope.user_profile = res;

        $scope.chat=false;


        $scope.closechat=function(){

            $scope.close=true;

            $scope.chat=false;

        }



    })



/*    socket.on("myself", function (data) {

        console.log(data)
        //  alert('suka')



        $('#chat'+data.u_from).append(data.message + '<br/>')


        document.getElementById("chat" + data.u_from).scrollTop = document.getElementById("chat" + data.u_from).scrollHeight;


    })*/








    $scope.editer = function (u_id,index) {

        console.log(u_id)




        var id_user ={

            u_id:$stateParams.id
        }


        $http.post('http://localhost:8080/users/select_username_from_id',id_user).then(function (res) {

            console.log(res)

            var response =res.data


            for(var i=0;i<response.length;i++){

                $scope.user_name=response[0].u_first

                $scope.user_img = response[0].img


            }





        })





        console.log('YOU' +u_id)

     //   $scope.pizdets[index].has_message = 0;



        $scope.chat_room = u_id;


        var indexer = index
        $cookieStore.remove('u_from'+u_id);


        var id = $cookieStore.get('u_id');

        var update ={

            u_id:id,
            u_from:u_id,
            has_message:0
        };


        $http.put('http://localhost:8080/users/update_users_mates',update);


        $scope.chat=u_id;

        $scope.close=false;

        $scope.messages =false;


        console.log('this'+ u_id)



        socket.emit("user id", u_id )



        $scope.profile_message =function(msg,index){

            console.log(msg)


            console.log(indexer)

            var from = $cookieStore.get('u_id');

            var u_first = $cookieStore.get('u_first');


            // $scope.pizdets[indexer].on_message = 1;

            console.log($scope.pizdets)


            $scope.message2 = msg;

            socket.emit("message", {msg:msg,u_id:$stateParams.id ,u_from:from,u_first:u_first} )


            var data={
                u_id:from,
                on_message:1

            }

            $http.post('http://localhost:8080/users/all_users_friends_who_send',data);

            console.log(msg)

            $scope.message2 = '';


        }






        if( document.getElementById("chat"+u_id)==null){

            var new_row = document.createElement("div");
            new_row.setAttribute("id", "chat"+u_id );

            new_row.setAttribute("style", "list-style-type: none; */padding: 0px;/* margin-top: 76%; */position: absolute;overflow-y: scroll;bottom: 0;width: 230px;height: 200px;background-color: #fffdfb;right: 1px;top: -159px;bottom: 99px;" );

            /*new_row.setAttribute("ng-class", "{'destroy': 1 }" );*/

            document.getElementById('chater').appendChild(new_row);



        }else{


            return;
        }



        // $scope.chata =u_id;
        var user_id = $cookieStore.get('u_id');

        var data ={
            u_id:user_id,
            u_from:u_id
        }



        $http.post('http://localhost:8080/users/all_users_msg',data).then(function (res) {

            console.log(res)

            var result =res.data


            $scope.msges = res.data;


            var html="";
            for(var i=0;i<result.length;i++){

                html += result[i].message+'<br/>'

            }
            console.log(html);


            document.getElementById("chat"+u_id).innerHTML=html;

            document.getElementById("chat"+u_id).scrollTop = document.getElementById("chat"+u_id).scrollHeight;



        })




        $('#chater div').not("#chat"+u_id).remove();



    };
























}]);
