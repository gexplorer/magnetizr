angular.module('magnetizr.controllers', [])

    .controller('TorrentsCtrl', function ($scope, Torrents, GoogleAnalytics, $ionicLoading, focus, $translate) {
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

        $scope.clearSearch = function () {
            $scope.query.string = "";
            focus("search");
        };

        $scope.clearResults = function () {
            $scope.torrents = [];
        };

        $scope.search = function () {
            document.activeElement.blur();

            if(navigator.connection && navigator.connection.type == Connection.NONE) {
                $scope.message = $translate.instant("noConnection");
            } else {
                $ionicLoading.show({
                    noBackdrop: true,
                    delay: 500,
                    template: '<ion-spinner></ion-spinner>'
                });

                GoogleAnalytics.track('send', 'pageview', {'page': '/search?q=' + $scope.query.string});

                var success = function (torrents) {
                    $scope.message = "";
                    $scope.torrents = torrents;
                    $ionicLoading.hide();
                };
                var error = function (response) {
                    console.log(response);
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
