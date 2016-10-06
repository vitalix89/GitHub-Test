var app = angular.module("UserAuthTutorial",['ui.router','socket-io','ngResource','ngCookies']);

/*
app.service('authInterceptor', function($q, $location,$injector) {
    var service = this;


    service.responseError = function(response) {
        if (response.status == 401){
            $injector.get('$state').transitionTo('/');
           // $location.url("/");
        }
        return $q.reject(response);
    };
})
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    }])
*/






app.config(['$urlRouterProvider', function ($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
}])
// then define the interception
    .run(['$rootScope', '$urlRouter','$stateParams', '$location', '$state', function ($rootScope, $urlRouter,$stateParams,$location, $state) {
        $rootScope.$on('$locationChangeSuccess', function(e, newUrl, oldUrl) {
            // Prevent $urlRouter's default handler from firing
            e.preventDefault();

            console.log($stateParams.id);

            /**
             * provide conditions on when to
             * sync change in $location.path() with state reload.
             * I use $location and $state as examples, but
             * You can do any logic
             * before syncing OR stop syncing all together.
             */

            if ($state.current.name !== 'main.exampleState' || newUrl === 'http://some.url' || oldUrl !=='https://another.url') {
                // your stuff
                $urlRouter.sync();
            } else {
                // don't sync
            }
        });
        // Configures $urlRouter's listener *after* your custom listener
        $urlRouter.listen();
    }]);





app.config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
            .state('login', {
                url: '/login',

                controller: "loginCtrl",
                templateUrl: 'views/login.tpl.ng.html'
            })


            .state('/', {
                url: '/',

                controller: "loginCtrl",

                templateUrl: 'views/login.tpl.ng.html'
            })

            // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
            .state('signup', {
                // we'll get to this in a bit
                url: '/signup',
                controller: "signupCtrl",

                templateUrl: 'views/signup.tpl.ng.html'
            })


            .state('browse', {
                // we'll get to this in a bit
                url: '/browse',
              //  controller: "tasksCtrl",

                templateUrl: 'views/browse.tpl.ng.html'
            })




     /*       .state('main.doorsSingle', {
                url: 'doors/:doorsSingle/:doorsDetail',
                params: {
                    // as of today, it was unclear how to define a required parameter (more below)
                    doorsSingle: {value: null},
                    doorsDetail: {value: null}
                },
                controller: DoorsSingleCtrl,
                resolve: DoorsSingleCtrl.resolve,
                templateUrl: '/modules/doors/doors-single.html'
            })*/



        .state('tasks', {

            url: '/task/:id',
            controller: "tasksformCtrl",
           // params:{id:122},
            //resolve: tasksCtrl.resolve,
            templateUrl: "views/tasksform.tpl.ng.html"





         })


            .state('task', {

                url: '/task',
                controller: "tasksCtrl",

                // resolve: tasksCtrl.resolve,
                templateUrl: "views/tasks.tpl.ng.html"

            })


         /*   .state('tasks', {
                url: '/tasks/:id?',
                templateUrl: 'views/tasks.tpl.ng.html',
                controller: 'tasksCtrl',

                params: {
                    id: null
                   // bar: null
                }
            })*/


            .state("labels", {
                url: '/labels',


                controller: "labelsCtrl",
                templateUrl: "views/labels.tpl.ng.html"
         })


            .state("labelsform/:id", {
                url: '/labelsform/:id',


                controller: "labelsformCtrl",
                templateUrl: "views/labelsform.tpl.ng.html"

            })



            .state("tasksform/:id", {
                url: '/tasksform/:id',
                controller: "tasksformCtrl",
                templateUrl: "views/tasksform.tpl.ng.html"

          })

            .state("admin", {
                url: '/admin',
                controller: "adminCtrl",
                templateUrl: "views/admin.tpl.ng.html"

})



            .state("forgotemail", {
                url: '/forgotemail',

                controller: "forgotemailCtrl",
                templateUrl: "views/forgotemail.tpl.ng.html"

})





        .state("changepassword/:id", {
            url: '/changepassword/:id',

            controller: "changepasswordCtrl",
            templateUrl: "views/changepassword.tpl.ng.html"

})
            .state("firstsignup", {
                url: '/firstsignup',

                controller: "loginCtrl as firstsignup",
                templateUrl: "views/firstsignup.html"

            })

    });





app.directive('datepicker', function() {
    return function(scope, element, attrs) {
        element.datepicker({
            inline: true,
            dateFormat: 'yy-mm-dd'
        /*    onSelect: function(dateText) {
                var modelPath = $(this).attr('ng-model');
                putObject(modelPath, scope, dateText);
                scope.$apply();
            }*/
        });
    }
});



app.filter('unique', function() {
    return function(collection, keyname) {
        var output = [],
            keys = [];

        angular.forEach(collection, function(item) {
            var key = item[keyname];
            if(keys.indexOf(key) === -1) {
                keys.push(key);
                output.push(item);
            }
        });

        return output;
    };
});




/*
app.directive('clickAnywhereButHere', function($document){
    return {
        restrict: 'A',
        link: function(scope, elem, attr, ctrl) {
            var elemClickHandler = function(e) {
                e.stopPropagation();
            };

            var docClickHandler = function() {
                scope.$apply(attr.clickAnywhereButHere);
            };

            elem.on('click', elemClickHandler);
            $document.on('click', docClickHandler);

            // teardown the event handlers when the scope is destroyed.
            scope.$on('$destroy', function() {
                elem.off('click', elemClickHandler);
                $document.off('click', docClickHandler);
            });
        }
    }
})
*/



app.directive('clickAnywhereButHere', function($document){
    return {
        restrict: 'A',
        link: function(scope, elem, attr, ctrl) {
            elem.bind('click', function(e) {
                e.stopPropagation();
            });
            $document.bind('click', function() {
                scope.$apply(attr.clickAnywhereButHere);
            })
        }
    }
})




app.directive('demoDirective', function($compile) {
    return {
      //  template: '<div><label>{{input.label}}: </label></div>',
        replace: true,
        link: function(scope, element) {
            var el = angular.element('<span/>');
           // switch(scope.input.inputType) {
               // case 'checkbox':
                    el.append('<div class="chater1{{chat_room}}"> <div class="close1" ng-click="closechat()">X</div> <div id ="chat1">{{msg}}</div> <form id="send_message1"> <input type="text" ng-model="message" id="message1"> <button ng-click="getmessage(message,$index)">send message</button> </form> </div>');
                 //   break;
              //  case 'text':
                //    el.append('<input type="text" ng-model="input.value"/><button ng-if="input.value" ng-click="input.value=\'\'; doSomething()">X</button>');
                 //   break;
         //   }
            $compile(el)(scope);
            element.append(el);
        }
    }
});



