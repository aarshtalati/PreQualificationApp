(function () {
    'use strict';

    angular
        .module('app')
        .controller('headerController', headerController);

    headerController.$inject = ['$scope', '$location', '$route'];

    function headerController($scope, $location, $route) {
        $scope.title = 'HeaderController';

        $scope.isActive = function (viewLocation) {
        	return viewLocation === $location.path();
        };

        $scope.getHref = function (viewLocation)
        {
        	//var test1 = $route.routes;
        	viewLocation = (rootUrl + viewLocation);
        	return viewLocation;
        }
    }
})();
