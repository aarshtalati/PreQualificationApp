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

	function registrarController($scope, $location, service) {
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

		$scope.loadTestData = function () {
			$scope.prequal.businessName = "Acme Inc"
			$scope.prequal.emailAddress = "john.doe@company.com"
			$scope.prequal.estimatedAnnualRevenue = 99000
			$scope.prequal.estimatedFICO = 601
			$scope.prequal.firstName = "John"
			$scope.prequal.grossPercentageFromCards = 85
			$scope.prequal.lastName = "Doe"
			$scope.prequal.phoneNumber = "800-555-1234"
			$scope.prequal.typeOfBusiness = "Accounting"
			$scope.prequal.yearStarted = 2003
		};

		$scope.isUnchanged = function (user) {
			return angular.equals(user, $scope.master);
		};


		// Fall-back : if server shrugs the shoulders, fake it
		// The server seemed down for me http://i.imgur.com/rnqIoeG.png
		// May be allowing CROSS on the endpoint do the trick?
		// Here is what I am gettin' : http://i.imgur.com/p9gFQ7H.jpg

		$scope.fakeReply1 = {
			"Qualified": true,
			"QualifyAmount": 100000,
			"RedirectUrl": "https://www.kabbage.com/app/account/signup?"
					  + "firstName=John"
					  + "&lastName=Doe"
					  + "&phone=8005551234"
					  + "&email=john.doe%40company.com"
					  + "&businessName=TestCorp"
					  + "&businessType=Accounting"
					  + "&yearStarted=2003"
					  + "&revenue=99000"
					  + "&ccPercent=85"
					  + "&refId=" + $scope.prequal.api_key
		}

		$scope.fakeReply2 = {
			"Qualified": false,
			"QualifyAmount": 0,
			"RedirectUrl": "https://www.kabbage.com/app/account/signup?"
					  + "firstName=John"
					  + "&lastName=Doe"
					  + "&phone=8005551234"
					  + "&email=john.doe%40company.com"
					  + "&businessName=TestCorp"
					  + "&businessType=Accounting"
					  + "&yearStarted=2003"
					  + "&revenue=99000"
					  + "&ccPercent=85"
					  + "&refId=" + $scope.prequal.api_key
		}

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
				}).error(function (data, status, headers, config) {

					var reply = getRandomInt(1, 2)
					if (reply === 1) {
						$scope.checkPreQualifyResponse = $scope.fakeReply1;
					}
					else {
						$scope.checkPreQualifyResponse = $scope.fakeReply2;
					}
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

			var resp = angular.copy($scope.checkPreQualifyResponse);
			$scope.checkPreQualifyResponse = {}

			$scope.msg = 'Redirecting in 5 seconds ...';


			if (resp.Qualified === true) {
				window.setTimeout(function () {
					//$location.path(resp.RedirectUrl);
					location.href = resp.RedirectUrl;
				}, 5000);
			}
			else if (resp.Qualified === false) {
				$scope.msg = ':-(';
				alert('Unfortunately you don\'t qualify for a Kabbage loan at this time');
			}
		});

		$scope.reset();

		function getRandomInt(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		function isEmpty(obj) {

			try {
				return Object.keys(obj).length === 0;
			} catch (e) {
				for (var prop in obj) {
					if (obj.hasOwnProperty(prop))
						return false;
				}

				return true;
			}
		}
	}
})();
