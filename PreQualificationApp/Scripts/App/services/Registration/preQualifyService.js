(function () {
	'use strict';

	angular
		.module('app')
		.service('preQualifyService', ['$http', preQualifyService]);

	function preQualifyService($http) {

		var baseUrl = '';

		this.CustomerPreQualificaionCheck = CustomerPreQualificaionCheck;

		function CustomerPreQualificaionCheck(customer) {
			var url = "https://api.kabbage.com/"
			var payload = customer;
			return $http.post(url, payload)
		};
	}
})();