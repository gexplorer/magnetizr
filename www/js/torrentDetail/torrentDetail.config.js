(function () {
    'use strict';

    angular
        .module('torrentDetail')
        .config(config);

    function config($stateProvider) {
        $stateProvider
            .state('torrent-detail', {
                url: '/torrents/:torrentId',
                templateUrl: 'js/torrentDetail/torrent-detail.html',
                controller: 'TorrentDetailController'
            });
    }
})();