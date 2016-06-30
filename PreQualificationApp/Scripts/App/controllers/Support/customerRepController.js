(function () {
	'use strict';

	angular
		.module('app')
		.controller('customerRepController', customerRepController);

	customerRepController.$inject = ['$scope', 'customerRepService', 'toastr'];

	function customerRepController($scope, service, toastr) {

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
				toastr.success('Customer Representatives loaded.', 'Ready');
			}).error(function (data, status) {
				console.log('Error getting customer representatives', status);
				console.log(data);
				$scope.custReps = [];
				$scope.loadingCustReps = false;
				toastr.error('Customer Representatives can not be loaded.', 'Error');
			});
		};


		$scope.custRepTableSort = function (p) {
			$scope.predicate = p;
			$scope.reverse = !$scope.reverse;
		};

		$scope.viewCusRep = function (_id) {
			var cr = {};
			var N = $scope.custReps.length;
			for (var i = 0; i < N; i++) {
				if ($scope.custReps[i].Id === _id) {
					cr = $scope.custReps[i];
					break;
				}
			}
			$scope.crDetail = cr;
		};

		$scope.toggleFilterVisibility = function () {
			$scope.showFilterRow = !($scope.showFilterRow);
			$scope.clearFilter();
		};

		$scope.clearFilter = function () {
			$scope.search = {};
		};

		//$scope.$watch('custReps.length', function () {
		//	if ($scope.custReps != undefined && $scope.custReps != null && $scope.custReps.length != undefined)
		//		$scope.emptyTableMessage = $scope.custReps.length == 0 && (!$scope.loadingcustReps);
		//});

		$scope.$watch('search.Id', function () {
			if ($scope.search.Id === undefined || $scope.search.Id === null) {
				$scope.clearFilter();
			}
		});

		activate();
	}
})();
