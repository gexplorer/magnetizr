(function () {
    'use strict';

    angular
        .module('magnetizr')
        .config(config);

    function config($stateProvider, $urlRouterProvider, $translateProvider) {
        $stateProvider

            .state('torrents', {
                url: '/torrents',
                templateUrl: 'templates/torrents.html',
                controller: 'TorrentsCtrl'
            })

            .state('torrent-detail', {
                url: '/torrents/:torrentId',
                templateUrl: 'templates/torrent-detail.html',
                controller: 'TorrentDetailCtrl'
            });

        $urlRouterProvider.otherwise('/torrents');

        $translateProvider.useSanitizeValueStrategy('escaped');
        $translateProvider.useStaticFilesLoader({
            prefix: 'i18n/locale-',
            suffix: '.json'
        });

        $translateProvider.preferredLanguage("en");
        $translateProvider.fallbackLanguage("en");
    }
})();