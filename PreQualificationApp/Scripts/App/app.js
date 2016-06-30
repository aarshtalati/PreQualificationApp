var spaBaseUrl = '/';

var app = angular.module('app', [
	// Angular modules 

	'ng', 'ngRoute', 'ngSanitize', 'ngAnimate', 

	// Custom modules 

	// 3rd Party Modules
	'toastr'

	//, 'ui.bootstrap', 'ui'
	//, 'kendo.directives'

]);

app.config(['$routeProvider',
	function ($routeProvider) {

		//$locationProvider.html5Mode(true);


		$routeProvider

			// default url
			.when(spaBaseUrl, {
					templateUrl: rootUrl + '/Scripts/App/Views/Registration/Form.html',
					controller: 'registrarController'})

			.when(spaBaseUrl + 'Register', {
					templateUrl: rootUrl + '/Scripts/App/Views/Registration/Form.html',
					controller: 'registrarController'})

			.when(spaBaseUrl + 'Support', {
					templateUrl: rootUrl + '/Scripts/App/Views/Support/Support.html',
					controller: 'customerRepController'})

			.when(spaBaseUrl + 'About', {
					templateUrl: rootUrl + '/Scripts/App/Views/Support/About.html'
			})

			.when(spaBaseUrl + 'notFound', {
				templateUrl: rootUrl + '/Scripts/App/Views/Error/NotFound.html'})

			// Invalid route
			.otherwise({
			redirectTo: spaBaseUrl + 'notFound'
		});

		}
]);

app.value('$', $);