(function(){
	//set the directive
	app.directive('hello',_hello);
	app.directive('myTpl',_myTpl);
	app.directive('datepicker',_datepicker);
	app.directive('ctrDirect',_ctrDirect);
	app.directive('aWrap',_aWrap);
	function _aWrap(){
		return{
			transclude: true,
			restrict: 'A',
			template:'<a href="#" ng-transclude></a>'
		}
	}
	function _ctrDirect(){
		return{
			restrict: 'A',
			//scope: {
			//	name: '@dname'
			//},
			scope: true, //encapsulated
			controller: function($scope,$element){
				$scope.name='Alon';
				$scope.onClear=_clear;
				//private function
				function _clear(){
					$scope.name='';
				}
			},
			template: '<div class="alert alert-info"><h3>{{name}}</h3>'+
					'<button ng-click="onClear()">clear</button>'+
					'</div>'
		}
	}
	function _datepicker(){
		return{
			restrict: 'C',//A-attribute E -element C-class M-comment
			//attach events to the element
			link: function($scope,$element,$attribute){
				//code goes here
				//console.log($attribute);
				$element.datepicker();
				
			}
		}
	}
	function _myTpl(){
		//return API object
		return{
			restrict: 'E', //element
			// templateUrl: 'Templates/hello.tpl.ng.html'
			template: '<h4>Hello World</h4>'+
					  '<p>this is the template content</p>'
		}
	}
	function _hello(){
		//return API object
		return{
			restrict: 'A',//A-attribute E -element C-class M-comment
			//attach events to the element
			link: function($scope,$element,$attribute){
				//code goes here
				//console.log($attribute);
				$element.html('Hello World');
				
			}
		}
	}
	
})();