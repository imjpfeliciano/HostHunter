(function(){
	var app = angular.module("hostHunter", []);

	app.controller('mainController', function($scope, $http){
		$http.get('/list')
		.success(function(data){
			$scope.people = data;
			console.log(data);
		})
		.error(function(data){
			console.log("Error: " + data);
		});
	});
	
	
})();


