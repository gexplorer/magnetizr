angular.module('starter.services', ['ionic'])

.factory('Torrents', function($ionicPopup) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var torrents = [{
    id: 0,
    name: 'Game of Thrones S04E04 HDTV x264-KILLERS[ettv]',
    size: '351 MB',
    age: '1 year',
    seed: 820,
    leech: 15,
    icon: 'http://icons.iconarchive.com/icons/marcus-roberto/google-play/64/Google-Play-Movies-icon.png'
  }, {
    id: 1,
    name: 'Game of Thrones S04E04 720p HDTV x264-KILLERS [eztv]',
    size: '1.25 GB',
    age: '1 year',
    seed: 360,
    leech: 18,
    icon: 'http://icons.iconarchive.com/icons/marcus-roberto/google-play/64/Google-Play-Movies-icon.png'
  },{
    id: 2,
    name: 'Game of Thrones S04E04 720p HDTV x264-KILLERS',
    size: '1.25 GB',
    age: '1 year',
    seed: 240,
    leech: 3,
    icon: 'http://icons.iconarchive.com/icons/marcus-roberto/google-play/64/Google-Play-Movies-icon.png'
  }, {
    id: 3,
    name: 'Game of Thrones Season 4 S04E04 720p hdtv x264 MrLss',
    size: '386 MB',
    age: '1 year',
    seed: 121,
    leech: 1,
    icon: 'http://icons.iconarchive.com/icons/marcus-roberto/google-play/64/Google-Play-Movies-icon.png'
  }, {
    id: 4,
    name: 'Game of Thrones S04E04 HDTV x264-KILLERS English Subtitle',
    size: '42 KB',
    age: '1 year',
    seed: 95,
    leech: 21, 
    icon: 'https://cdn4.iconfinder.com/data/icons/gnome-desktop-icons-png/PNG/64/Gnome-Text-X-Generic-64.png'
  }];

  return {
    all: function() {
      return torrents;
    },
    remove: function(torrent) {
      torrents.splice(torrents.indexOf(torrent), 1);
    },
    get: function(torrentId) {
      for (var i = 0; i < torrents.length; i++) {
        if (torrents[i].id === parseInt(torrentId)) {
          return torrents[i];
        }
      }
      return null;
    },
    download: function(torrent) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Download',
        template: 'Do you really want to download this magnet?'
      });
      confirmPopup.then(function(res) {
        if(res) {
          console.log('You do want');
        } else {
          console.log('You do not want');
        }
      });
    }
  };
});