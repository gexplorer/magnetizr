angular.module('starter.controllers', [])

    .controller('TorrentsCtrl', function ($scope, Torrents) {
        $scope.torrents = [];
        $scope.form = {};
        $scope.form.query = "";

        $scope.download = function (torrent) {
            Torrents.download(torrent);
        };

        $scope.search = function () {
            $scope.torrents = Torrents.search($scope.form.query);
        };
    })

    .controller('TorrentDetailCtrl', function ($scope, $stateParams, Torrents) {
        $scope.torrent = Torrents.get($stateParams.torrentId);
        $scope.download = function (torrent) {
            Torrents.download(torrent);
        }
    });