(function () {
	'use strict';

	angular
		.module('app')
		.service('customerRepService', customerRepService);

	customerRepService.$inject = ['$http'];

	function customerRepService($http) {

		this.GetAll = GetAll;

		function GetAll() {
			var query = 'http://www.filltext.com/?pretty=true&rows=';
			query += getRandomInt(0, 1000).toString()
			query += '&Id={index}&fname={firstName}&lname={lastName}&city={city}&state={usState|abbr}&phone={phone|format}&email={email}';

			return $http({
				method: 'GET',
				url: query
			});


			// Returns a random integer between min (included) and max (included)
			function getRandomInt(min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			}

		}
	}
})();