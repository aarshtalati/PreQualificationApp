(function () {
	'use strict';

	angular
		.module('app')
		.controller('spaController', ['$scope', '$location', spaController]);

	function spaController($scope, $location) {
		$scope.title = 'spaController';

		$scope.changeView = function (view) {
			$location.path(view);
		};
		activate();

		function activate() { }
	}
})();