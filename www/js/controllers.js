angular.module('starter.controllers', [])

.controller('TorrentsCtrl', function($scope, Torrents) {
  $scope.torrents = Torrents.all();
  $scope.remove = function(torrent) {
    Torrents.remove(torrent);
  }
})

.controller('TorrentDetailCtrl', function($scope, $stateParams, Torrents) {
  $scope.torrent = Torrents.get($stateParams.torrentId);
});
