(function () {
    'use strict';

    angular
        .module('magnetizr')
        .config(config);

    function config($urlRouterProvider, $translateProvider, $httpProvider) {
        $urlRouterProvider.otherwise('/torrents');

        $translateProvider.useSanitizeValueStrategy('escaped');
        $translateProvider.useStaticFilesLoader({
            prefix: 'i18n/locale-',
            suffix: '.json'
        });

        $translateProvider.preferredLanguage("en");
        $translateProvider.fallbackLanguage("en");

        $httpProvider.interceptors.push('xmlHttpInterceptor');
    }
})();