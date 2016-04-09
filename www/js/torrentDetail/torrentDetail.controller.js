(function () {
    'use strict';

    angular
        .module('torrentDetail')
        .controller('TorrentDetailController', TorrentDetailController);

    function TorrentDetailController($scope, $state, Torrents, $ionicHistory, $ionicLoading, $translate, Categories) {
        $scope.torrent = Torrents.get($state.params.torrentId);

        $scope.categories = Categories.get();

        $scope.goBack = function () {
            $ionicHistory.goBack();
        };

        $scope.get = function (torrent) {
            cordova.InAppBrowser.open(torrent.magnet, '_system');
        };

        $scope.copy = function (torrent) {
            cordova.plugins.clipboard.copy(torrent.magnet);
            $ionicLoading.show({
                template: $translate.instant("magnetCopied"),
                noBackdrop: true,
                duration: 2000
            });
        };

        $scope.imdb = function (torrent) {
            cordova.InAppBrowser.open("http://www.imdb.com/title/" + torrent.imdb, '_system');
        }
    }
})();