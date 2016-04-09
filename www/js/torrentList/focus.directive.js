(function () {
    'use strict';

    angular
        .module('torrentList')
        .factory('focus', focus);

    function focus($rootScope, $timeout) {
        return function (name) {
            $timeout(function () {
                $rootScope.$broadcast('focusOn', name);
            });
        }
    }
})();