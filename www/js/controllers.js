angular.module('starter.controllers', [])

.controller('TorrentsCtrl', function($scope, Torrents) {
	$scope.torrents = Torrents.all();
	$scope.download = function(torrent){
		Torrents.download(torrent);
	}
})

.controller('TorrentDetailCtrl', function($scope, $stateParams, Torrents) {
	$scope.torrent = Torrents.get($stateParams.torrentId);
	$scope.download = function(torrent){
		Torrents.download(torrent);
	}
});