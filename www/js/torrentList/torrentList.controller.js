(function () {
    'use strict';

    angular
        .module('torrentList')
        .controller('TorrentListController', TorrentListController);

    function TorrentListController($scope, Torrents, $ionicLoading, focus, $translate, $ionicPopover, Categories) {
        $scope.torrents = [];
        $scope.form = {};
        $scope.message = "";
        $scope.query = {
            string: ""
        };

        $scope.categories = Categories.get();

        $scope.category = '';
        $scope.categoryIcon = 'funnel';
        $scope.categoryColor = '';

        $scope.empty = true;

        $ionicPopover.fromTemplateUrl('js/torrentList/filter.html', {
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

        $scope.changeFilter = function (category) {
            $scope.category = category;
            if (category != '') {
                $scope.categoryColor = $scope.categories[category].color;
                $scope.categoryIcon = $scope.categories[category].icon;
            } else {
                $scope.categoryColor = '';
                $scope.categoryIcon = 'funnel';
            }
            if ($scope.query.string) {
                $scope.search();
            }
            $scope.closeFilter();
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
                Torrents.search($scope.query.string, $scope.category).then(success, error);
            }
        };
    }
})();