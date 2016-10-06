var demoApp = angular.module('demoApp', ['ngRoute','ngResource']);


demoApp.config( function ($routeProvider,$locationProvider) {


    $routeProvider
        .when('/',
            {
                controller: 'SimpleController',
                templateUrl: 'media/templates/login.tpl.ng.html'
            })
        .when('/view1',
            {
                controller: 'SimpleController',
                templateUrl: 'media/templates/view1.html'
            })
        .otherwise({redirectTo: '/'});
});
demoApp.controller('SimpleController',function ($scope,$http){

    //$scope.emplo={};


    $scope.friends=[];
    $scope.showMultiplesActions=false;
    $scope.friendsList=[];


    $http
        .get('http://localhost:1234/CI/employees')
        .then(function(res){//on success

           // $scope.emplo = res;
            $scope.friends=res.data;
            console.log(res);
            //res.data //actual data AS JSON!!!
        },function(err){//on error
            console.log(err);
        });




    /*$http.post('http://localhost:1234/php/rest.php?tableName=employees').success(function(data){
        $scope.friends = data;
    });*/
    $scope.addNewFriend = function(data){
        var data = {
            fname:$scope.newFriend.fname,
            lname:$scope.newFriend.lname,
            gender:$scope.newFriend.gender,
            age:$scope.newFriend.age
        }

       // console.log($scope.newFriend.fname);
        $http
            .post("http://localhost:1234/CI/employees",{'firstname': $scope.newFriend.fname, 'lastname': $scope.newFriend.lname,'gender':$scope.newFriend.gender, 'age':$scope.newFriend.age})
            .then(function(data){//on successs

               // console.log(data);
                $scope.friendsList = data.data;

            });
        $scope.friends.push(data);
       /* $scope.newFriend = {
            fname:"",
            lname:"",
            gender:"",
            age:""
        };*/
    };




    $scope.login = function(data){
        var data = {
            fname:$scope.newFriend.fname,
            lname:$scope.newFriend.lname,
            gender:$scope.newFriend.gender,
            age:$scope.newFriend.age
        }

        // console.log($scope.newFriend.fname);
        $http
            .post("http://localhost:1234/CI/employees",{'firstname': $scope.newFriend.fname, 'lastname': $scope.newFriend.lname,'gender':$scope.newFriend.gender, 'age':$scope.newFriend.age})
            .then(function(data){//on successs

                // console.log(data);
                $scope.friendsList = data.data;

            });
        $scope.friends.push(data);
        /* $scope.newFriend = {
         fname:"",
         lname:"",
         gender:"",
         age:""
         };*/
    };





});