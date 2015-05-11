angular.module('cascade.controllers', [])

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
            $scope.torrents = Torrents.search($scope.query.string);
        };
    })

    .controller('TorrentDetailCtrl', function ($scope, $stateParams, Torrents) {
        $scope.torrent = Torrents.get($stateParams.torrentId);
        $scope.download = function (torrent) {
            Torrents.download(torrent);
        }
    })

    .directive('categoryIcon', function () {
        return {
            restrict: 'E',
            scope: {
                category: '='
            },
            templateUrl: 'templates/category-icon.html'
        };
    });