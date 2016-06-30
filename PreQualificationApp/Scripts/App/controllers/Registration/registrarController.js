(function () {
	'use strict';

	angular
		.module('app')
		.controller('registrarController', [
			'$scope'
			, '$location'
			, 'preQualifyService'
			, registrarController
		]);

	function registrarController($scope, $location, service, toastr) {
		$scope.title = 'registrarController';

		$scope.master = {};
		$scope.prequal = {};
		$scope.prequal.firstName = undefined;
		$scope.prequal.lastName = undefined;
		$scope.prequal.emailAddress = undefined;
		$scope.prequal.businessName = undefined;
		$scope.prequal.phoneNumber = undefined;
		$scope.prequal.yearStarted = undefined;
		$scope.prequal.estimatedFICO = undefined;
		$scope.prequal.estimatedAnnualRevenue = undefined;
		$scope.prequal.grossPercentageFromCards = undefined;
		$scope.prequal.typeOfBusiness = undefined;
		$scope.prequal.api_key = 'vauwg9sbqkrdnzdmr7eyk92t';

		$scope.checkPreQualifyResponse = {};

		$scope.isUnchanged = function (user) {
			return angular.equals(user, $scope.master);
		};

		$scope.reset = function (form) {
			$scope.prequal = angular.copy($scope.master);
			if (form) {
				form.$setPristine();
			}
		};

		$scope.checkPreQualify = function () {
			console.log($scope.prequal);

			service.CustomerPreQualificaionCheck($scope.prequal)
				.success(function (data, status, headers, config) {
					$scope.checkPreQualifyResponse = data;
					toastr.success('The server returned something', 'Yay!');
				}).error(function (data, status, headers, config) {
					console.log('------------');
					console.log(data);
					console.log('------------');
					console.log(status);
					console.log('------------');
					console.log(headers);
					console.log('------------');
					console.log(config);
					console.log('------------');

				});
		}

		$scope.$watch('checkPreQualifyResponse', function () {
			if ($scope.checkPreQualifyResponse === undefined || $scope.checkPreQualifyResponse === null || isEmpty($scope.checkPreQualifyResponse)) {
				return;
			}
			console.log('Response:');
			console.log($scope.checkPreQualifyResponse);

		});

		$scope.reset();

	}
})();
