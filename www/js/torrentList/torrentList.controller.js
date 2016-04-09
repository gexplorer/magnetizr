(function () {
    'use strict';

    angular
        .module('torrentList')
        .controller('TorrentListController', TorrentListController);

    function TorrentListController($scope, torrents, $ionicLoading, focus, $translate, $ionicPopover, categories) {
        $scope.torrents = [];
        $scope.form = {};
        $scope.message = "";
        $scope.query = {
            string: ""
        };

        $scope.categories = categories.get();

        $scope.category = '';
        $scope.categoryIcon = 'funnel';
        $scope.categoryColor = '';

        $scope.empty = true;

        $ionicPopover
            .fromTemplateUrl('js/torrentList/filter.html', {scope: $scope})
            .then(function (popover) {
                $scope.filter = popover;
            });

        $scope.openFilter = openFilter;
        $scope.closeFilter = closeFilter;
        $scope.changeFilter = changeFilter;
        $scope.get = get;
        $scope.clearSearch = clearSearch;
        $scope.clearResults = clearResults;
        $scope.search = search;

        function openFilter($event) {
            $scope.filter.show($event);
        }

        function closeFilter() {
            $scope.filter.hide();
        }

        function changeFilter(category) {
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
        }

        function get(torrent) {
            cordova.InAppBrowser.open(torrent.magnet, '_system');
        }

        function clearSearch() {
            $scope.query.string = "";
            focus("search");
        }

        function clearResults() {
            $scope.torrents = [];
            $scope.message = "";
            $scope.empty = true;
        }

        function search() {
            $scope.empty = false;
            document.activeElement.blur();
            $ionicLoading.show();

            if (navigator.connection && navigator.connection.type == Connection.NONE) {
                $scope.message = $translate.instant("noConnection");
            } else {
                torrents
                    .search($scope.query.string, $scope.category)
                    .then(listTorrents, showErrorMessage);
            }
        }

        function listTorrents(torrents) {
            $scope.message = "";
            $scope.torrents = torrents;
            $ionicLoading.hide();
        }

        function showErrorMessage(response) {
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
        }
    }
})();