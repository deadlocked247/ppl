
(function () {
	'use strict'; 

	angular.module('ppl', ['ngRoute', 'ngCookies'])
	.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
		$locationProvider.html5Mode(true);
		$routeProvider
		.when('/', {
		    templateUrl: '../workout.html',
		    controller: 'workoutController'
		})
		.when('/login', {
		    templateUrl: '../login.html',
		    controller: 'loginController'
		});
	}])
	.service('dataService', function($q, $http){
		return {
			login : function(body) {
				return $http({
					url:'/api/login',
					method: "POST",
					data: body
				});
			}
		};
	})
	.controller('loginController', function($scope, dataService, $cookies, $location, $rootScope) {
		$scope.submit = function() {
			var body = 
			{
				email: $scope.user,
				password: $scope.pass
			}
			dataService.login(body)
			.then(function (payload) {
				$rootScope.user = angular.copy(payload.data);
				console.log($rootScope.user);
				$location.absUrl = '/';
			});
		}
	})
	.controller('workoutController', function($scope, $rootScope) {
		$scope.menu = false;

	});
	

})();
