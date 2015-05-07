angular.module('cascade.services', [])

    .factory('Torrents', function () {

        var torrents = [{
            id: 0,
            name: 'Game of Thrones S04E04 HDTV x264-KILLERS[ettv]',
            magnet: 'magnet:?xt=urn:btih:B170691FE3B6AAEBA73F8EA122E85DED4AD2E1BF&dn=game+of+thrones+s04e04+hdtv+x264+killers+ettv&tr=http%3A%2F%2Ftracker.trackerfix.com%2Fannounce&tr=udp%3A%2F%2Fopen.demonii.com%3A1337',
            size: '351 MB',
            age: '1 year',
            seed: 820,
            leech: 15,
            icon: 'http://icons.iconarchive.com/icons/marcus-roberto/google-play/64/Google-Play-Movies-icon.png'
        }, {
            id: 1,
            name: 'Game of Thrones S04E04 720p HDTV x264-KILLERS [eztv]',
            magnet: 'magnet:?xt=urn:btih:B170691FE3B6AAEBA73F8EA122E85DED4AD2E1BF&dn=game+of+thrones+s04e04+hdtv+x264+killers+ettv&tr=http%3A%2F%2Ftracker.trackerfix.com%2Fannounce&tr=udp%3A%2F%2Fopen.demonii.com%3A1337',
            size: '1.25 GB',
            age: '1 year',
            seed: 360,
            leech: 18,
            icon: 'http://icons.iconarchive.com/icons/marcus-roberto/google-play/64/Google-Play-Movies-icon.png'
        }, {
            id: 2,
            name: 'Game of Thrones S04E04 720p HDTV x264-KILLERS',
            magnet: 'magnet:?xt=urn:btih:B170691FE3B6AAEBA73F8EA122E85DED4AD2E1BF&dn=game+of+thrones+s04e04+hdtv+x264+killers+ettv&tr=http%3A%2F%2Ftracker.trackerfix.com%2Fannounce&tr=udp%3A%2F%2Fopen.demonii.com%3A1337',
            size: '1.25 GB',
            age: '1 year',
            seed: 240,
            leech: 3,
            icon: 'http://icons.iconarchive.com/icons/marcus-roberto/google-play/64/Google-Play-Movies-icon.png'
        }, {
            id: 3,
            name: 'Game of Thrones Season 4 S04E04 720p hdtv x264 MrLss',
            magnet: 'magnet:?xt=urn:btih:B170691FE3B6AAEBA73F8EA122E85DED4AD2E1BF&dn=game+of+thrones+s04e04+hdtv+x264+killers+ettv&tr=http%3A%2F%2Ftracker.trackerfix.com%2Fannounce&tr=udp%3A%2F%2Fopen.demonii.com%3A1337',
            size: '386 MB',
            age: '1 year',
            seed: 121,
            leech: 1,
            icon: 'http://icons.iconarchive.com/icons/marcus-roberto/google-play/64/Google-Play-Movies-icon.png'
        }, {
            id: 4,
            name: 'Game of Thrones S04E04 HDTV x264-KILLERS English Subtitle',
            magnet: 'magnet:?xt=urn:btih:B170691FE3B6AAEBA73F8EA122E85DED4AD2E1BF&dn=game+of+thrones+s04e04+hdtv+x264+killers+ettv&tr=http%3A%2F%2Ftracker.trackerfix.com%2Fannounce&tr=udp%3A%2F%2Fopen.demonii.com%3A1337',
            size: '42 KB',
            age: '1 year',
            seed: 95,
            leech: 21,
            icon: 'https://cdn4.iconfinder.com/data/icons/gnome-desktop-icons-png/PNG/64/Gnome-Text-X-Generic-64.png'
        }];

        return {
            all: function () {
                return torrents;
            },
            remove: function (torrent) {
                torrents.splice(torrents.indexOf(torrent), 1);
            },
            get: function (torrentId) {
                for (var i = 0; i < torrents.length; i++) {
                    if (torrents[i].id === parseInt(torrentId)) {
                        return torrents[i];
                    }
                }
                return null;
            },
            search: function (query) {
                var result = [];
                for (var i = 0; i < torrents.length; i++) {
                    if (torrents[i].name.search(new RegExp(query, 'i')) >= 0) {
                        result.push(torrents[i]);
                    }
                }
                return result;
            },
            download: function (torrent) {
                navigator.app.loadUrl(torrent.magnet, {openExternal: true});
            }
        };
    });