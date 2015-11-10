angular.module('magnetizr.controllers', ['magnetizr.services'])

    .controller('TorrentsCtrl', function ($scope, Torrents, GoogleAnalytics, $ionicLoading, focus, $translate) {
        $scope.torrents = [];
        $scope.form = {};
        $scope.message = "";
        $scope.query = {
            string: ""
        };

        $scope.empty = true;

        $scope.get = function (torrent) {
            GoogleAnalytics.track('send', 'event', {
                'eventCategory': torrent.category,
                'eventAction': 'get'
            });
            cordova.InAppBrowser.open(torrent.magnet, '_system');
        };

        $scope.clearSearch = function () {
            $scope.query.string = "";
            focus("search");
        };

        $scope.clearResults = function () {
            $scope.torrents = [];
            $scope.message = "";
            $scope.empty = true;
        };

        $scope.search = function () {
            $scope.empty = false;
            document.activeElement.blur();

            if (navigator.connection && navigator.connection.type == Connection.NONE) {
                $scope.message = $translate.instant("noConnection");
            } else {

                GoogleAnalytics.track('send', 'pageview', {'page': '/search?q=' + $scope.query.string});

                var success = function (torrents) {
                    $scope.message = "";
                    $scope.torrents = torrents;
                    $ionicLoading.hide();
                };
                var error = function (response) {
                    switch (response.status) {
                        case 0:
                            $scope.message = $translate.instant("unknownError");
                            break;
                        case 404:
                            if (response.data.message.includes("Your query must be at least 4")) {
                                $scope.message = $translate.instant("lessThan4CharactersError");
                            } else {
                                $scope.message = $translate.instant("notFoundError");
                            }
                            break;
                        default :
                            $scope.message = response.data.message;
                    }

                    $ionicLoading.hide();
                    $scope.torrents = [];

                };
                Torrents.search($scope.query.string).then(success, error);
            }

        };
    })

    .controller('TorrentDetailCtrl', function ($scope, $state, Torrents, $ionicHistory, GoogleAnalytics, $ionicLoading, $translate) {
        $scope.torrent = Torrents.get($state.params.torrentId);

        $scope.goBack = function () {
            $ionicHistory.goBack();
        };

        $scope.get = function (torrent) {
            GoogleAnalytics.track('send', 'event', {
                'eventCategory': $scope.torrent.category,
                'eventAction': 'get'
            });
            cordova.InAppBrowser.open(torrent.magnet, '_system');
        };

        $scope.copy = function (torrent) {
            GoogleAnalytics.track('send', 'event', {
                'eventCategory': $scope.torrent.category,
                'eventAction': 'copy'
            });
            cordova.plugins.clipboard.copy(torrent.magnet);
            $ionicLoading.show({
                template: $translate.instant("magnetCopied"),
                noBackdrop: true,
                duration: 2000
            });
        };

        $scope.imdb = function (torrent) {
            GoogleAnalytics.track('send', 'event', {
                'eventCategory': $scope.torrent.category,
                'eventAction': 'imdb'
            });
            cordova.InAppBrowser.open("http://www.imdb.com/title/" + torrent.imdb, '_system');
        }
    });
