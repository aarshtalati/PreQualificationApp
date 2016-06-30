(function () {
	'use strict';

	angular
		.module('app')
		.controller('customerRepController', customerRepController);

	customerRepController.$inject = ['$scope', 'customerRepService'];

	function customerRepController($scope, service) {

		$scope.title = 'customerRepController';

		$scope.custReps = [];
		$scope.predicate = '';
		$scope.reverse = false;
		$scope.showFilterRow = false;
		$scope.loadingCustReps = false;
		$scope.loadingConsumers = true;
		$scope.emptyTableMessage = false;
		$scope.selectedCusRepId = undefined;


		$scope.search = {};
		$scope.search.Id = undefined;
		$scope.search.Name = undefined;
		$scope.search.State = undefined;
		$scope.search.Phone = undefined;
		$scope.search.Email = undefined;


		function activate() {
			$scope.LoadCustReps();

		}

		$scope.LoadCustReps = function () {
			$scope.custReps = [];
			$scope.loadingCustReps = true;
			service.GetAll().success(function (records) {
				$scope.custReps = records;
				angular.forEach($scope.custReps, function (value, key) {
					var fullName = value.fname + ' ' + value.lname;
					$scope.custReps[key].Name = fullName;
				});
				$scope.emptyTableMessage = ($scope.custReps.length === 0);
				$scope.loadingCustReps = false;
			}).error(function (data, status) {
				console.log('Error getting customer representatives', status);
				console.log(data);
				$scope.custReps = [];
				$scope.loadingCustReps = false;
			});
		};


		$scope.custRepTableSort = function (p) {
			$scope.predicate = p;
			$scope.reverse = !$scope.reverse;
		};

		$scope.toggleFilterVisibility = function () {
			$scope.showFilterRow = !($scope.showFilterRow);
			$scope.clearFilter();
		};

		$scope.clearFilter = function () {
			$scope.search = {};
		};

		$scope.$watch('search.Id', function () {
			if ($scope.search.Id === undefined || $scope.search.Id === null) {
				$scope.clearFilter();
			}
		});

		activate();
	}
})();
