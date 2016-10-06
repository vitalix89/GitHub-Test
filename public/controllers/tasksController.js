/**
 * Created by Vadim on 08/07/2016.
 */
app.controller('tasksCtrl', ['tasksService','messagesResource','$cookieStore','socket','$rootScope','coordsResource','$scope','$stateParams','$http','$location','joinlabelsService','labelsService','userService','UsersResource','TasksResource','$state',
    function (tasksService,messagesResource,$cookieStore,socket,$rootScope,coordsResource,$scope,$stateParams, $http,$location,joinlabelsService,labelsService,userService,UsersResource,TasksResource,$state) {

        var array = [];

        var u_idd = $cookieStore.get('u_id')

        var dataa = {

            u_id: u_idd

        };


       // $scope.loadData();

       // $state.reload();

        var counter=0
        $http.post('http://localhost:8080/users/join_img_from_name', dataa).then(function (res) {

            console.log(res)

            $scope.pizdets = res.data



            for(var i=0;i<$scope.pizdets.length;i++){

                if($scope.pizdets[i].has_message==1){

                    $scope.count = counter++



                }

                $scope.counter = counter

              //  alert(counter)

               // counter++
            }





            console.log($scope.pizdets)


        });



        socket.on("whis",function(data){

            tasksService.logoffwisper(data);

        }).bindTo($scope)


        var cookies=[]



        if($cookieStore.get('u_id')){

          //  alert('yes')

        }else{

          //  alert('no')
        }


        $scope.$on('eventFired', function(event, data) {

            alert('ahaa')

        })



   /*     socket.on("myself", function (data) {

            console.log(data)
            //  alert('suka')



            $('#chat'+data.u_from).append(data.message + '<br/>')


            document.getElementById("chat" + data.u_from).scrollTop = document.getElementById("chat" + data.u_from).scrollHeight;


        }).bindTo($scope);*/




        socket.on("whisper",function(data){

              //  console.log($scope.pizdets)



                console.log(data)

                console.log('suka u_from' +data.u_from);


                $cookieStore.put("u_from",data.u_from);

                $cookieStore.put("u_from"+data.u_from,data.u_from);/*crazy shit*/


                cookies.push($cookieStore.get('u_from'+data.u_from))

                console.log(cookies);

         
                $scope.from =data.u_from;

                console.log(data)

                var id = $cookieStore.get('u_id');

                var update ={

                    u_id:id,
                    u_from:data.u_from,
                    has_message:1
                };



                $http.post('http://localhost:8080/users/insert_to_users_mates',data);


                messagesResource.save(data);

               // $http.post('http://localhost:8080/users/insert_messages',data);


                $http.put('http://localhost:8080/users/update_users_mates',update);


                $http.put('http://localhost:8080/users/on_message',data);





            console.log(data);

            //$scope.chat=data.u_id;


                $scope.gotmsg=data.u_id;

            getdata(data)

            // $scope.msg = data;

            console.log(data.u_from_name);

           // $('#chat').html(data.message +'<br/>')

           // $scope.chata =data.u_from;



            

          //  document.getElementById("chat"+data.u_from_name).innerHTML='suka';



           // $('#chat').append(data +'<br/>')



            var u_idd = $cookieStore.get('u_id')


                var dataa = {

                    u_id: u_idd

                };

                var counter=0
                $http.post('http://localhost:8080/users/join_img_from_name', dataa).then(function (res) {



                console.log(res.data)

                    $scope.pizdets = res.data

                    for(var i=0;i<$scope.pizdets.length;i++){

                        if($scope.pizdets[i].has_message==1){

                            $scope.count = counter++



                        }

                        $scope.counter = counter

                       // alert(counter)

                        // counter++
                    }


                })






                document.getElementById("chat"+data.u_from).innerHTML+= '<span class="booble-chat-reciever"><h5 style="margin-top:-1px">'+data.message +'</h5></span>'+ '<br/>'+'<br/>'+'<br/>';

            document.getElementById("chat"+data.u_from).scrollTop = document.getElementById("chat"+data.u_from).scrollHeight;

            get_ufrom(data.u_from);

        }).bindTo($scope);



      //  $scope.messages = false

       // $scope.messages = false
        $scope.show_send_list = function () {

            $scope.messages = true

            $scope.from =false

        }


        $scope.hide_send_list = function () {

          //  alert('suka')

         //  $scope.hide = true

            $scope.messages = false

        }

     




     function get_ufrom(u_from){

        var index = $scope.pizdets.map(function(e) {

            //   console.log($cookieStore.get('u_from'));

            return e.u_from;


        }).indexOf($cookieStore.get('u_from'+u_from));


        $scope.pizdets[index].has_message = 1;

}



        function getdata(dataa){

            var details =dataa;

           // console.log(data)

            var u_id = $cookieStore.get('u_id');

            $http.post('http://localhost:8080/users/all_users_msg',details).then(function (res) {

                console.log(res)

                var result =res.data


                var html="";
                for(var i=0;i<result.length;i++){

                    html += result[i].message +'<br/>'

                }
                console.log(html);

                // $scope.msg = data;
              //  $('#chat').html(html)



            })




        }






        socket.emit("user", $cookieStore.get('u_id') );




      //  });

          //$scope.all_users = UsersResource.query(function (res) {

        var the_user_id ={

                  u_id:$cookieStore.get('u_id')
        }


        $http.post('http://localhost:8080/users/all_users_except_me',the_user_id).then(function (res) {


                 // $scope.all_users =res

            //  })

              console.log(res)
          /*    for(var i=0;i<res.length;i++){

                  socket.emit("all users", res[i].u_id );

              }*/


              $scope.show_users = res.data




              $scope.redirect_to_profile=function(u_id,index){

                  //var rel ='/'+u_id

                  console.log(u_id)


                 $state.reload();
                  
                  $state.go("tasks",{ id:u_id })

               //   $scope.loadData();



                  //location.href = "#/task/"+u_id;



              }




/*              var index = $scope.all_users.map(function(e) {

                  return e.u_id;

              }).indexOf($cookieStore.get('from_id'));

              console.log(index)*/

           //   $scope.chaterer=index;



              traa(res)

              $scope.chat=false;


              $scope.closechat=function(){

                  $scope.close=true;

                  $scope.chat=false;

              }


              $scope.youid=false


              $scope.edit = function (u_id,index) {


                  console.log(u_id)

                  var id_user ={

                      u_id:u_id
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





                      $scope.pizdets[index].has_message = 0;





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



                  $scope.getmessage =function(msg,index){


                      console.log(indexer)

                      var from = $cookieStore.get('u_id');

                      var u_first = $cookieStore.get('u_first');


                     // $scope.pizdets[indexer].on_message = 1;

                      console.log($scope.pizdets)

                      console.log(msg)



                      $scope.message = msg;

                      socket.emit("message", {msg:msg,u_id:u_id ,u_from:from,u_first:u_first} )


                     var data={
                         u_id:from,
                         on_message:1

                     }

                      $http.post('http://localhost:8080/users/all_users_friends_who_send',data);

                      console.log(msg)

                      $scope.message = '';


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
                      u_id:u_id,
                      u_from:user_id
                     // u_idd:u_id,
                     // u_fromm:u_id
                      
                  }



                  $http.post('http://localhost:8080/users/all_users_msg',data).then(function (res) {

                      console.log(res)

                      var result =res.data


                      $scope.msges = res.data;


                      var html="";
                      var array=[]

                      for(var i=0;i<result.length;i++){


                          array.push(result[i])


                          console.log(result[i])

                    /*      if(result[i].sander==1){

                              html += '<span class="booble-chat-sender"><h6 style="margin-top:3px;line-height: 1.5em;">'+ result[i].message +'</h6></span>'+'<br/>'




                          }else{*/

                             // html += '<span class="booble-chat-reciever"><h6 style="margin-top:3px;line-height: 1.5em;">'+ result[i].message +'</h6></span>'+'<br/>'

                        //  }


                      }

                      console.log(array);


                      var one =array
                      var merged = [].concat.apply([], one);




                      var sort_by = function(field, reverse, primer){

                          var key = primer ?
                              function(x) {return primer(x[field])} :
                              function(x) {return x[field]};

                          reverse = !reverse ? 1 : -1;

                          return function (a, b) {
                              return a = key(a), b = key(b), reverse * ((b > a) - (a > b));
                          }
                      }


                      var ordered = merged.sort(sort_by('m_id', true, parseInt));






                      for(var j=0;j<ordered.length;j++) {


                          if(ordered[j].u_from==$cookieStore.get('u_id')){

                              html += '<span class="booble-chat-sender"><h6 style="margin-top:3px;line-height: 1.5em;">'+ ordered[j].message +'</h6></span>'+'<br/>'




                          }else{

                              html += '<span class="booble-chat-reciever"><h6 style="margin-top:3px;line-height: 1.5em;">'+ ordered[j].message +'</h6></span>'+'<br/>'

                                }
//


                      }



                 /*     var sort_by = function(field, reverse, primer){

                          var key = primer ?
                              function(x) {return primer(x[field])} :
                              function(x) {return x[field]};

                          reverse = !reverse ? 1 : -1;

                          return function (a, b) {
                              return a = key(a), b = key(b), reverse * ((b > a) - (a > b));
                          }
                      }


                     var cho_za = merged.sort(sort_by('m_id', true, parseInt));*/


                      console.log(merged);

                      //console.log(cho_za);




                      console.log(html);



                      document.getElementById("chat"+u_id).innerHTML=html;

                      document.getElementById("chat"+u_id).scrollTop = document.getElementById("chat"+u_id).scrollHeight;



                  })




                  $('#chater div').not("#chat"+u_id).remove();

/*
                  $scope.pizdets[index].has_message = 0;
*/

              };


          });





















        $scope.editar = function (u_id,index) {


            console.log(u_id)

            var id_user ={

                u_id:u_id
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



        /*    if($scope.pizdets[index].has_message==undefined){


                console.log('undefined')

            }else{

                $scope.pizdets[index].has_message = 0;

            }
*/


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



            $scope.getmessage =function(msg,index){


                console.log(indexer)

                var from = $cookieStore.get('u_id');

                var u_first = $cookieStore.get('u_first');


                // $scope.pizdets[indexer].on_message = 1;

                console.log($scope.pizdets)

                console.log(msg)



                $scope.message = msg;

                socket.emit("message", {msg:msg,u_id:u_id ,u_from:from,u_first:u_first} )


                var data={
                    u_id:from,
                    on_message:1

                }

                $http.post('http://localhost:8080/users/all_users_friends_who_send',data);

                console.log(msg)

                $scope.message = '';


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

                    html += '<span class="booble-chat-reciever"><h6 style="margin-top:3px;line-height: 1.5em;">'+ result[i].message +'</h6></span>'+'<br/>'

                }
                console.log(html);



                document.getElementById("chat"+u_id).innerHTML=html;

                document.getElementById("chat"+u_id).scrollTop = document.getElementById("chat"+u_id).scrollHeight;



            })




            $('#chater div').not("#chat"+u_id).remove();

            /*
             $scope.pizdets[index].has_message = 0;
             */

        };
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        


        function traa(res){

            var ress=[];


            for(var i=0;i<res.length;i++){

             ress.push(res[i].u_id)
            }

         //var suka = 115

          //  socket.emit("all users", ress );



        }


        socket.on("all_users_id",function(data){

       /*     console.log(data)

            var html="";
            for(var i=0;i<data.length;i++){

                html += data[i] +'<br/>'

            }
            console.log(html);

            // $scope.msg = data;
            $('#chat').html(html)*/



        })









        /*$scope.all_coords = coordsResource.query(function (res) {

            console.log(res)

        });*/

        console.log($scope.all_users);


        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else {
              console.log("Geolocation is not supported by this browser.");
            }
        }
        function showPosition(position) {
          console.log("Latitude: " + position.coords.latitude + "Longitude: " + position.coords.longitude)  ;

            $scope.latitude= position.coords.latitude;
            $scope.longtitude = position.coords.longitude;

            $http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&sensor=true').then(function (response) {

                console.log(response)

            })


        }

        getLocation();





        function getDistanceFromLatLonInKm(lat1,lon1) {

            var lat2=$scope.latitude;

            var lon2=$scope.longtitude;

            console.log($scope.latitude);

            var R = 6371; // Radius of the earth in km
            var dLat = deg2rad(lat2-lat1);  // deg2rad below
            var dLon = deg2rad(lon2-lon1);
            var a =
                    Math.sin(dLat/2) * Math.sin(dLat/2) +
                    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
                    Math.sin(dLon/2) * Math.sin(dLon/2)
                ;
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            var d = R * c; // Distance in km

            console.log(d);
            return d;


        }

        function deg2rad(deg) {
            return deg * (Math.PI/180)
        }


        getDistanceFromLatLonInKm(31,34);



        $scope.shownearme =function (dist) {




        }

        $scope.dist = 2;

        $scope.$watch('dist',function(val,old){
            $scope.dist = parseInt(val);
        });



        $scope.updatecords = function (brng,dist) {

            console.log(dist)

            var u_id =$cookieStore.get('u_id');



            var cords = {
                latitude1: $scope.latitude,
                longtitude1: $scope.longtitude,
                u_id:u_id
               /* dist:$scope.dist,
                logged_in:1*/



            };

            console.log($scope.longtitude)



                $http.put('http://localhost:8080/users/update_cords', cords).then(function (res) {



            });


            $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?latlng= ' + $scope.latitude + ' ,' + $scope.longtitude + ' &sensor=false', null, function (data) {




                var u_id =$cookieStore.get('u_id');





                var place_name = {
                    place_name: data.results[0].address_components[2].long_name

                };

            /*    $http.put('http://localhost/CI36/users/' + u_id, place_name).then(function (res) {



                });*/



                console.log(data.results[0].address_components[2].long_name);
                console.log(data.results[0])
            });









                // jQuery(function($){







                var $overlay = $('.overlay'),
                    resize = true,
                    map;
                var service;
                var marker = [];
                var pos;
                var infowindow;
                var placeLoc


                var connections = [];

                console.log($('#findMe'));



             //   function initialize() {


                    var mapOptions = {
                        zoom: 15
                    };
                    map = new google.maps.Map(document.getElementById('map-canvas'),
                        mapOptions);

                    // Try HTML5 geolocation
                    if(navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(function(position) {

                            /*  var cords = {
                             lat:position.coords.latitude,
                             long:position.coords.longitude
                             }*/
                            var lat = position.coords.latitude;
                            var lon = position.coords.longitude;

                            connections.push(lat, lon)


                            // connections.push(position.coords.longitude)

                            console.log(connections);
                            locationCode()

                            showPosition(position)

                            var pos = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);

                            $('#findMe').data('pos',pos);
                            var request = {
                                location:pos,
                                radius:1000

                            };

                            infowindow = new google.maps.InfoWindow();



                            infowindow = new google.maps.InfoWindow({
                                map: map,
                                position: pos,
                                content: 'You Are Here'
                            });


                            map.setCenter(pos);
                        }, function() {
                            handleNoGeolocation(true);
                        });
                    } else {
                        // Browser doesn't support Geolocation
                        handleNoGeolocation(false);
                    }


                    function locationCode() {
                        console.log(connections);

                    }





                    function showPosition(position) {


                        console.log("Latitude: " + position.coords.latitude + "Longitude: " + position.coords.longitude);


                       function getsecondpoint (brng,dist) {

                            console.log(dist)

                            var lat = position.coords.latitude;

                            var lon =  position.coords.longitude;




                            Number.prototype.toRad = function () {
                                return this * Math.PI / 180;
                            };

                            Number.prototype.toDeg = function () {
                                return this * 180 / Math.PI;
                            };

                            //   google.maps.LatLng.prototype.destinationPoint = function(brng, dist) {
                            var disttance = dist / 6371;
                            var brng2 = brng.toRad();

                            var lat1 = lat.toRad();
                            var lon1 = lon.toRad();

                            var lat2 = Math.asin(Math.sin(lat1) * Math.cos(disttance) +
                                Math.cos(lat1) * Math.sin(disttance) * Math.cos(brng2));

                            var lon2 = lon1 + Math.atan2(Math.sin(brng2) * Math.sin(disttance) *
                                    Math.cos(lat1),
                                    Math.cos(disttance) - Math.sin(lat1) *
                                    Math.sin(lat2));

                            if (isNaN(lat2) || isNaN(lon2)) return null;

                            var latitude2 = lat2.toDeg();
                            var longtitude2 = lon2.toDeg();

                            console.log(lat2.toDeg() + ' ' + lon2.toDeg());


                           console.log(lat2.toRad() + ' ' + lon2.toRad());




                           function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
                           /*     var R = 6371; // Radius of the earth in km
                                var dLat = deg2rad(lat2-lat1);  // deg2rad below
                                var dLon = deg2rad(lon2-lon1);
                                var a =
                                        Math.sin(dLat/2) * Math.sin(dLat/2) +
                                        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
                                        Math.sin(dLon/2) * Math.sin(dLon/2)
                                    ;
                                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                                var d = R * c; // Distance in km

                                console.log(d);
                                return d;*/



                               var R = 6371.0; // km
                               var dLat = (lat2-lat1)*Math.PI/180.0;
                               var dLon = (lon2-lon1)*Math.PI/180.0;
                               lat1 = lat1*Math.PI/180.0;
                               lat2 = lat2*Math.PI/180.0;

                               var a = Math.sin(dLat/2.0) * Math.sin(dLat/2.0) +
                                   Math.sin(dLon/2.0) * Math.sin(dLon/2.0) * Math.cos(lat1) * Math.cos(lat2);
                               var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                               var d = R * c;
                               console.log(d);
                               return d;


                            }

                            function deg2rad(deg) {
                                return deg * (Math.PI/180)
                            }

                            getDistanceFromLatLonInKm(31.788877,34.756173,latitude2,longtitude2)


                            var connection = [{
                                lat: 31.804381,
                                long: 34.655314
                            },{
                                lat: 31.788877,
                                long: 34.756172
                            },{
                                lat: 32.085300,
                                long: 34.781768
                            },{
                                lat: 29.557669,
                                long: 34.951925
                            }];

                            //connection.push(coords)

                           $scope.all_coords = coordsResource.query(function (res) {

                              //  $http.get('http://localhost:8080/users/getallcordinates').then(function (res) {


                                    console.log(res)

                             /*   for (var j = 0; j < $scope.userscoords.length; j++){

                                    console.log($scope.userscoords[j])

                                    console.log(res)


                                }*/





                           // console.log($scope.userscoords[j]);
                                var closeusers=[];
                                var place_name=[];

                                var u_id =$cookieStore.get('u_id');

                                var entry = UsersResource.query({ id: u_id }, function() {
                                    console.log(entry[0].latitude1);

                                //$scope.logged_in = entry.logged_in;

                                for (var i = 0; i < res.length; i++) {

                                console.log(dist)
                                console.log(getDistanceFromLatLonInKm(31.788877, 34.756173, res[i].latitude1, res[i].longtitude1))

                                if (getDistanceFromLatLonInKm(entry[0].latitude1, entry[0].longtitude1, res[i].latitude1, res[i].longtitude1)<dist) {

                                    console.log('yes');

                                //    console.log(connection[i].lat +'  '+connection[i].long );

                                    var data ={
                                        latitude1:res[i].latitude1,
                                        longtitude1:res[i].longtitude1

                                    }


                                    $http.post('http://localhost:8080/users/getusersbydistance',data).then(function (response) {


                                        var newItems = [response.data[0].u_first,response.data[0].place_name,response.data[0].img,response.data[0].logged_in,response.data[0].u_id ];


                                        console.log(response)
                                        closeusers.push(newItems);
                                       // place_name.push(response.data[0].place_name);




                                        $scope.nearusers = response.data[0].u_first;


                                    });


                                    $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?latlng= ' + res[i].latitude1 + ' ,' + res[i].longtitude1 + ' &sensor=false', null, function (data) {

                                        console.log(data.results[0])

                                        var coords = [
                                            {lat:lat, long:lon}

                                        ]

                                        //   connections.push(coords);

                                       // console.log(connections);


                                        var p = data.results[0].geometry.location
                                        var latlng = new google.maps.LatLng(p.lat, p.lng);



                                        console.log(latlng);
                                        var markerA = new google.maps.Marker({
                                            position: latlng,
                                            map: map
                                            //customInfo: "Marker A",

                                        });

                                        /*      connections.push(location.lat());
                                         connections.push(location.lng());*/

                                        console.log(markerA);

                                        google.maps.event.addListener(markerA, 'click', function () {
                                            console.log(this.position.lat());
                                        });

                                    });


                                    // })
                                }else{

                                    console.log('suka')

                                }


                            }

                                });

                                $scope.closeusers = closeusers;
                              //  $scope.place_name = place_name;


                                console.log(closeusers);
                            });


                        }



                        getsecondpoint (90,dist);

                       // console.log(dist);
                        console.log($scope.userscoords);


                        /*    var lat = position.coords.latitude;

                         var lon =  position.coords.longitude;*/





                        console.log("Latitude: " + position.coords.latitude + "Longitude: " + position.coords.longitude);


                        var pos = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);


                        var po = new google.maps.LatLng(32.085300,34.781768);

                        var connection = [{
                            lat: 31.804381,
                            long: 34.655314
                        },{
                            lat: 31.788877,
                            long: 34.756172
                        }];

                        //connection.push(coords)

                        var request = {
                            location:pos,
                            radius:1000

                        };

                        /*  for (var i = 0; i < connection.length; i++) {

                         $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?latlng= ' + connection[i].lat + ' ,' + connection[i].long + ' &sensor=true', null, function (data) {

                         console.log(data)

                         var p = data.results[0].geometry.location
                         var latlng = new google.maps.LatLng(p.lat, p.lng);

                         console.log(latlng);
                         var markerA= new google.maps.Marker({
                         position: latlng,
                         map: map
                         //customInfo: "Marker A",

                         });

                         console.log(markerA);

                         google.maps.event.addListener(markerA, 'click', function() {
                         console.log(this.position.lat());
                         });

                         });



                         // })
                         }*/


                    }

             //   }

                function createMarker(place) {
                    placeLoc = place.geometry.location;
                    var marker = new google.maps.Marker({
                        map: map,
                        position: place.geometry.location,
                        icon: {
                            path: google.maps.SymbolPath.CIRCLE,
                            scale: 8,
                            fillColor:'00a14b',
                            fillOpacity:0.3,
                            fillStroke: '00a14b',
                            strokeWeight:4,
                            strokeOpacity: 0.7
                        },



                    });


                    google.maps.event.addListener(marker, 'click', function() {
                        infowindow.setContent(place.name);
                        infowindow.open(map, this);
                    });
                    return marker;
                }

                function handleNoGeolocation(errorFlag) {
                    if (errorFlag) {
                        var content = 'Error: The Geolocation service failed.';
                    } else {
                        var content = 'Error: Your browser doesn\'t support geolocation.';
                    }

                    var options = {
                        map: map,
                        position: new google.maps.LatLng(60, 105),
                        content: content
                    };

                    var infowindow = new google.maps.InfoWindow(options);
                    map.setCenter(options.position);
                }

           //     google.maps.event.addDomListener(window, 'load', initialize);

                $('#show').click(function(){

                    $overlay.show();

                    if ( resize ){
                        google.maps.event.trigger(map, 'resize');
                        resize = false;
                    }

                });

                $('.overlay-bg').click(function(){

                    $overlay.hide();

                });

           // });
























        }




        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();

        var hh =today.getHours();
        var mm = today.getMinutes();
        var ss = today.getSeconds();

        if(dd<10) {
            dd='0'+dd
        }

        if(mm<10) {
            mm='0'+mm
        }

        today = yyyy+'-'+mm+'-'+dd+ ':' +' '+ hh+':'+mm+':'+ss;


    /*    $scope.currentuser =UsersResource.query(function(res){

            console.log(res);

        });*/




        $scope.userTasks = TasksResource.query(function(res){
            // After successful request to server, check edit mode

            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!
            var yyyy = today.getFullYear();

            if(dd<10) {
                dd='0'+dd
            }

            if(mm<10) {
                mm='0'+mm
            }

            today = yyyy+'-'+mm+'-'+dd;
            //document.write(today);

            console.log(today);


//var a =new Date();

            $scope.editMode();
            var count = 0;
            for(var i=0;i<res.length;i++){



                if(res[i].t_due_date<today){

                    console.log(res[i].t_id);

                   // $scope.timeout = res[i].t_id;
                    $scope.today = today;
                    var audio = new Audio('Woop Woop-SoundBible.com-198943467.mp3');
                    audio.play();
                 count++;
                // break;

                }



                console.log(count);

            /*   $scope.someMethod=function (due_date) {

                   if(due_date<today){

                       var audio = new Audio('Phone_Vibrating-Sound_Explorer-738835678.mp3');
                       audio.play();
                     //  alert('hi');
                   }


                }*/


            }

            if(count){

                alert('YOU HAVE' +' '+ count +' '+ 'TASKS EXPIRED!!!' );
            }else{

                alert('NO TASKS EXPIRED!!!' );
            }





            console.log(res);
        });

        console.log($scope.userTasks);


        $scope.edit = function (t_id, index) {

       /*     (function() {

                $('#date').datepicker({

                    dateFormat: 'yy-mm-dd'
                });

            })();*/


            $scope.isEditing = index;
            $rootScope.$broadcast("edit", t_id );





        };

        $scope.editMode = function () {

            console.log($stateParams.id);


                $rootScope.$on("edit",function(event, args){

                    console.log(args);

                    $scope.Task = TasksResource.get({id:args});

                    console.log($scope.Task);
                });

                console.log($scope.Task);

                // index from tasks array
                // returns new array
                var index = $scope.userTasks.map(function(e) {
                    return e.t_id;
                }).indexOf(""+$stateParams.id+"");

                $scope.isEditing = index;

        };


        $scope.canceledit = function (t_id, t_subject ) {

            $scope.isEditing=t_id;

        };



        $scope.updateTask = function ( t_id, index,t_due_date) {
            console.log('suka task id', t_id);


            if(t_due_date<today){

                var audio = new Audio('Woop Woop-SoundBible.com-198943467.mp3');
                audio.play();
                //  alert('hi');
            }


            console.log("boris", t_id);

               var task = {
             t_subject:$scope.Task.t_subject,
             t_due_date:$scope.Task.t_due_date

             // t_creation_date:$scope.t_creation_date
               };

            $scope.isEditing=t_id;

            $http.put('http://localhost/CI36/tasks/'+t_id,task).then(function (res) {


                console.log(res.data[0]);
                $scope.userTasks[index].t_subject=res.data[0].t_subject;

                $scope.userTasks[index].t_due_date=res.data[0].t_due_date;

            })



     /*        TasksResource.update({id:t_id}, task).$promise.then(function (res) {

                 console.log(res);

                 $scope.userTasks[index].t_subject=res.t_subject;

                $scope.userTasks[index].t_due_date=res.t_due_date;

                $scope.userTasks= TasksResource.query();


             });*/


        };


        $scope.Task = {
            // t_id:undefined,
            t_subject:undefined,
            t_due_date:undefined

            // t_creation_date: undefined
        };




        console.log($scope.userTasks);

        $scope.filters = { };

        $scope.userlabels = labelsService.query();



        console.log($scope.selectlabels);
        console.log( $scope.userlabels);
        console.log($scope.selectlabels);

        $scope.joinlabels = joinlabelsService.query();


        $scope.filters = {};
       // var labels;


        $scope.clearFilters = function () {
            $scope.filters = {};
        }

        $scope.gotolabels = function () {
            $location.url("/labels");
        }







        $scope.underlineTask = function (done, task_id, index) {

         //   userTasks.indexOf(task)

            console.log(index);

            if (done == 0) {

                var task = {
                    t_done: 1
                };
                $scope.userTasks[index].t_done = 1;
                //$scope.userTasks[index].t_done = 1;
                //   event.target.parentNode.parentNode.style.backgroundColor = '#73ea7c';
                TasksResource.update({id: task_id}, task);

            } else if (done == 1) {

                var task = {
                    t_done: 0
                };
                $scope.userTasks[index].t_done = 0;
                //$scope.userTasks[index].t_done = 1;
                //   event.target.parentNode.parentNode.style.backgroundColor = 'none';

                TasksResource.update({id: task_id}, task);

            }


        };



        $scope.getTasksbylbid = function (u_id){


            console.log( u_id);

            $scope.getTasksbylb =  joinlabelsService.query({ id: u_id });

            console.log($scope.getTasksbylb);


        };


        console.log($cookieStore.get('logedin'));

        console.log($scope.userTasks);



        $scope.deleteTask = function(index,t_id){

            TasksResource.delete({ id: t_id }, function() {

                $scope.userTasks.splice(index, 1);

            });
        };



        $scope.useremail = $cookieStore.get('email');

        $scope.username = $cookieStore.get('username');

        $cookieStore.get('logedin');



        console.log($scope.user);

        $scope.editerTask = function ( t_id ) {


            $location.url("/tasksform/"+t_id);


        };





        console.log($scope.logged_in);


        $scope.selectlabels =function() {

            $scope.userlabels.$promise.then(function (res) {
                console.log(res)
                $scope.selectedlabels = res;
                //console.log($scope.selectlabels);

            });
        };

        $scope.selectlabels();

        console.log($scope.selectedlabels);



        $scope.label = {
            // t_id:undefined,
            lb_name: undefined
        }

        $scope.logout = function (){


            var u_id =$cookieStore.get('u_id');





            var data = {
                logged_in: 0

            };

            $http.put('http://localhost/CI36/users/' + u_id, data).then(function (res) {



            });

            userService.logout();
           // $state.go("first");
        };




        $scope.Addlabel = function (){

            //$scope.contact.createDate = new Date();
           // $scope.t_creation_date= new Date();

            var data = {
                //  t_id:$scope.Tasks.t_id,
                lb_name:$scope.label.lb_name

            };

            $http.post("http://localhost/CI36/labels", data).then(function(response){
                console.log(response);

                $scope.userlabels.push(response.data);
                // $scope.userTasks = TasksService.query();

            })
        };




        $scope.Tasks = {
            // t_id:undefined,
            t_subject: undefined,
            t_due_date: new Date(),
           // lb_name:undefined
            lb_id:null
            // t_creation_date: undefined

        };






        $scope.Addtask = function (){

            //$scope.contact.createDate = new Date();
            $scope.t_creation_date= new Date();

            var data = {
              //  t_id:$scope.Tasks.t_id,
                t_subject:$scope.Tasks.t_subject,
                t_due_date:$scope.Tasks.t_due_date,
                lb_id:$scope.Tasks.lb_id
               // lb_name:$scope.Tasks.lb_name
              //  t_creation_date:$scope.t_creation_date


            };

            $http.post("http://localhost/CI36/Tasks", data).then(function(response){
                console.log(response);

                $scope.userTasks.push(response.data);



            })
        };



    }
]);




































