angular.module('magnetizr.controllers', ['magnetizr.services'])

    .controller('TorrentsCtrl', function ($scope, Torrents, $ionicLoading, focus, $translate, $ionicPopover) {
        $scope.torrents = [];
        $scope.form = {};
        $scope.message = "";
        $scope.query = {
            string: ""
        };

        $scope.empty = true;

        $ionicPopover.fromTemplateUrl('templates/filter.html', {
            scope: $scope
        }).then(function (popover) {
            $scope.filter = popover;
        });

        $scope.openFilter = function ($event) {
            $scope.filter.show($event);
        };
        $scope.closeFilter = function () {
            $scope.filter.hide();
        };

        $scope.get = function (torrent) {
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
            $ionicLoading.show();

            if (navigator.connection && navigator.connection.type == Connection.NONE) {
                $scope.message = $translate.instant("noConnection");
            } else {
                var success = function (torrents) {
                    $scope.message = "";
                    $scope.torrents = torrents;
                    $ionicLoading.hide();
                };
                var error = function (response) {
                    switch (response.status) {
                        case 404:
                            if (response.data && response.data.message && response.data.message.includes("Your query must be at least 4")) {
                                $scope.message = $translate.instant("lessThan4CharactersError");
                            } else {
                                $scope.message = $translate.instant("notFoundError");
                            }
                            break;
                        default :
                            $scope.message = $translate.instant("unknownError");
                    }

                    $ionicLoading.hide();
                    $scope.torrents = [];

                };
                Torrents.search($scope.query.string).then(success, error);
            }

        };
    })

    .controller('TorrentDetailCtrl', function ($scope, $state, Torrents, $ionicHistory, $ionicLoading, $translate) {
        $scope.torrent = Torrents.get($state.params.torrentId);

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
    });
