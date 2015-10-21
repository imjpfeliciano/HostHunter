
	var app = angular.module("hostHunter", ['ngRoute']);

	app.config(function($routeProvider, $locationProvider){
		$routeProvider
		.when('/list', {
			templateUrl: 'pages/list.html',
			controller: 'listController',
		});
	});


	
	app.controller('listController', function($scope, $http){
		//$scope.name = 'listController';

		$http.get('/list')
		.success(function(data){
			$scope.people = data;
			console.log(data);
		})
		.error(function(error){
			console.log('Error: ' + error);
		});
	});

	
	



