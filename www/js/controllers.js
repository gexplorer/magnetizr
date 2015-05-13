angular.module('magnetizr.controllers', [])

    .controller('TorrentsCtrl', function ($scope, Torrents, GoogleAnalytics) {
        $scope.torrents = [];
        $scope.form = {};
        $scope.query = {
            string: ""
        };

        $scope.download = function (torrent) {
            GoogleAnalytics.track('send', 'event', {
                'eventCategory': torrent.category,
                'eventAction': 'download'
            });
            Torrents.download(torrent);
        };

        $scope.search = function () {
            document.activeElement.blur();
            GoogleAnalytics.track('send', 'pageview', {'page': '/search?q=' + $scope.query.string});
            $scope.torrents = Torrents.search($scope.query.string);
        };
    })

    .controller('TorrentDetailCtrl', function ($scope, $state, Torrents, GoogleAnalytics) {
        $scope.torrent = Torrents.get($state.params.torrentId);
        $scope.download = function (torrent) {
            GoogleAnalytics.track('send', 'event', {
                'eventCategory': $scope.torrent.category,
                'eventAction': 'download'
            });
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
