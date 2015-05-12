angular.module('magnetizr.controllers', [])

    .controller('TorrentsCtrl', function ($scope, Torrents) {
        $scope.torrents = [];
        $scope.form = {};
        $scope.query = {
            string: ""
        };

        $scope.download = function (torrent) {
            Torrents.download(torrent);
        };

        $scope.search = function () {
            document.activeElement.blur();
            $scope.torrents = Torrents.search($scope.query.string);
        };
    })

    .controller('TorrentDetailCtrl', function ($scope, $stateParams, Torrents, $ionicHistory) {
        $scope.torrent = Torrents.get($stateParams.torrentId);

        $scope.goBack = function () {
            $ionicHistory.goBack();
        };

        $scope.download = function (torrent) {
            Torrents.download(torrent);
        }
    });
