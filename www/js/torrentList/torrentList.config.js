(function () {
    'use strict';

    angular
        .module('torrentList')
        .config(config);

    function config($stateProvider) {
        $stateProvider
            .state('torrents', {
                url: '/torrents',
                templateUrl: 'js/torrentList/torrents.html',
                controller: 'TorrentListController'
            });
    }
})();