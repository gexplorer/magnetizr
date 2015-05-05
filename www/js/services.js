angular.module('starter.services', [])

.factory('Torrents', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var torrents = [{
    id: 0,
    name: 'Game of Thrones S04E04 HDTV x264-KILLERS[ettv]',
    lastText: 'Size: 351 MB   Age: 1 year   Seed: 820   Leech: 15',
    face: 'http://icons.iconarchive.com/icons/marcus-roberto/google-play/64/Google-Play-Movies-icon.png'
  }, {
    id: 1,
    name: 'Game of Thrones S04E04 720p HDTV x264-KILLERS [eztv]',
    lastText: 'Size: 1.25 GB   Age: 1 year   Seed: 360   Leech: 18',
    face: 'http://icons.iconarchive.com/icons/marcus-roberto/google-play/64/Google-Play-Movies-icon.png'
  },{
    id: 2,
    name: 'Game of Thrones S04E04 720p HDTV x264-KILLERS',
    lastText: 'Size: 1.25 GB   Age: 1 year   Seed: 240   Leech: 3',
    face: 'http://icons.iconarchive.com/icons/marcus-roberto/google-play/64/Google-Play-Movies-icon.png'
  }, {
    id: 3,
    name: 'Game of Thrones Season 4 S04E04 720p hdtv x264 MrLss',
    lastText: 'Size: 386 MB   Age: 1 year   Seed: 121   Leech: 1',
    face: 'http://icons.iconarchive.com/icons/marcus-roberto/google-play/64/Google-Play-Movies-icon.png'
  }, {
    id: 4,
    name: 'Game of Thrones S04E04 HDTV x264-KILLERS English Subtitle',
    lastText: 'Size: 42 KB   Age: 1 year   Seed: 95   Leech: 21', 
    face: 'https://cdn4.iconfinder.com/data/icons/gnome-desktop-icons-png/PNG/64/Gnome-Text-X-Generic-64.png'
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
    }
  };
});
