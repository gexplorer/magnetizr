angular.module('magnetizr.controllers', [])

    .controller('TorrentsCtrl', function ($scope, Torrents, GoogleAnalytics) {
        $scope.torrents = [];
        $scope.form = {};
        $scope.message = "";
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
            var success = function (torrents) {
                console.log("* Contr success");
                $scope.message = "";
                $scope.torrents = torrents;
            };
            var error = function(payload){
                console.log("* Contr error");
                $scope.message = payload.data.message;
                $scope.torrents = [];
            };
            Torrents.search($scope.query.string).then(success, error);
        };
    })

    .controller('TorrentDetailCtrl', function ($scope, $state, Torrents, $ionicHistory, GoogleAnalytics) {
        $scope.torrent = Torrents.get($state.params.torrentId);

        $scope.goBack = function () {
            $ionicHistory.goBack();
        };

        $scope.download = function (torrent) {
            GoogleAnalytics.track('send', 'event', {
                'eventCategory': $scope.torrent.category,
                'eventAction': 'download'
            });
            Torrents.download(torrent);
        }
    });
