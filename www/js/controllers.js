angular.module('magnetizr.controllers', [])

    .controller('TorrentsCtrl', function ($scope, Torrents, GoogleAnalytics, $ionicLoading) {
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

            $ionicLoading.show({
                noBackdrop: true,
                delay: 500,
                template: '<ion-spinner></ion-spinner>'
            });

            GoogleAnalytics.track('send', 'pageview', {'page': '/search?q=' + $scope.query.string});

            var success = function (torrents) {
                console.log("* Contr success");
                $scope.message = "";
                $scope.torrents = torrents;
                $ionicLoading.hide();
            };
            var error = function (payload) {
                console.log("* Contr error");
                $scope.message = payload.data.message;
                $scope.torrents = [];
                $ionicLoading.hide();
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
            navigator.app.loadUrl(torrent.magnet, {openExternal: true});
        };

        $scope.imdb = function (torrent) {
            GoogleAnalytics.track('send', 'event', {
                'eventCategory': $scope.torrent.category,
                'eventAction': 'imdb'
            });
            navigator.app.loadUrl("http://www.imdb.com/title/" + torrent.imdb, {openExternal: true});
        }
    });
