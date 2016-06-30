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



app.value('$', $);