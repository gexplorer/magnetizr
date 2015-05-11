angular.module('magnetizr.controllers', [])

    .controller('TorrentsCtrl', function ($scope, Torrents) {
        $scope.torrents = [];
        $scope.form = {};
        $scope.query = {
            string: ""
        };

        $scope.download = function (torrent) {
            window.analytics.trackEvent('/torrents', 'download', 'Download magnet', 1);
            Torrents.download(torrent);
        };

        $scope.search = function () {
            document.activeElement.blur();
            $scope.torrents = Torrents.search($scope.query.string);
        };
    })

    .controller('TorrentDetailCtrl', function ($scope, $stateParams, Torrents) {
        $scope.torrent = Torrents.get($stateParams.torrentId);
        $scope.download = function (torrent) {
            window.analytics.trackEvent('/torrent-detail', 'download', 'Download magnet', 1);
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
