angular.module('magnetizr.services', [])

    .factory('Torrents', function () {

        var torrents = [{
            id: 0,
            name: 'Game of Thrones S04E04 HDTV x264-KILLERS[ettv]',
            magnet: 'magnet:?xt=urn:btih:B170691FE3B6AAEBA73F8EA122E85DED4AD2E1BF&dn=game+of+thrones+s04e04+hdtv+x264+killers+ettv&tr=http%3A%2F%2Ftracker.trackerfix.com%2Fannounce&tr=udp%3A%2F%2Fopen.demonii.com%3A1337',
            size: '351 MB',
            age: '1 year',
            seed: 820,
            leech: 15,
            category: 'tv'
        }, {
            id: 1,
            name: 'Game of Thrones S04E04 720p HDTV x264-KILLERS [eztv]',
            magnet: 'magnet:?xt=urn:btih:B170691FE3B6AAEBA73F8EA122E85DED4AD2E1BF&dn=game+of+thrones+s04e04+hdtv+x264+killers+ettv&tr=http%3A%2F%2Ftracker.trackerfix.com%2Fannounce&tr=udp%3A%2F%2Fopen.demonii.com%3A1337',
            size: '1.25 GB',
            age: '1 year',
            seed: 360,
            leech: 18,
            category: 'tv'
        }, {
            id: 2,
            name: 'Game of Thrones - The Movie',
            magnet: 'magnet:?xt=urn:btih:B170691FE3B6AAEBA73F8EA122E85DED4AD2E1BF&dn=game+of+thrones+s04e04+hdtv+x264+killers+ettv&tr=http%3A%2F%2Ftracker.trackerfix.com%2Fannounce&tr=udp%3A%2F%2Fopen.demonii.com%3A1337',
            size: '4.2 GB',
            age: '1 day',
            seed: 905,
            leech: 210,
            category: 'movie'
        }, {
            id: 3,
            name: 'Game of Thrones - Soundtrak',
            magnet: 'magnet:?xt=urn:btih:B170691FE3B6AAEBA73F8EA122E85DED4AD2E1BF&dn=game+of+thrones+s04e04+hdtv+x264+killers+ettv&tr=http%3A%2F%2Ftracker.trackerfix.com%2Fannounce&tr=udp%3A%2F%2Fopen.demonii.com%3A1337',
            size: '635 MB',
            age: '1 year',
            seed: 240,
            leech: 3,
            category: 'music'
        }, {
            id: 4,
            name: 'Game of Thrones - Book 1',
            magnet: 'magnet:?xt=urn:btih:B170691FE3B6AAEBA73F8EA122E85DED4AD2E1BF&dn=game+of+thrones+s04e04+hdtv+x264+killers+ettv&tr=http%3A%2F%2Ftracker.trackerfix.com%2Fannounce&tr=udp%3A%2F%2Fopen.demonii.com%3A1337',
            size: '420 KB',
            age: '1 year',
            seed: 95,
            leech: 29,
            category: 'book'
        }, {
            id: 5,
            name: 'Game of Thrones - NDS Game',
            magnet: 'magnet:?xt=urn:btih:B170691FE3B6AAEBA73F8EA122E85DED4AD2E1BF&dn=game+of+thrones+s04e04+hdtv+x264+killers+ettv&tr=http%3A%2F%2Ftracker.trackerfix.com%2Fannounce&tr=udp%3A%2F%2Fopen.demonii.com%3A1337',
            size: '386 MB',
            age: '1 year',
            seed: 21,
            leech: 15,
            category: 'game'
        }, {
            id: 6,
            name: 'Game of Thrones Companion APP',
            magnet: 'magnet:?xt=urn:btih:B170691FE3B6AAEBA73F8EA122E85DED4AD2E1BF&dn=game+of+thrones+s04e04+hdtv+x264+killers+ettv&tr=http%3A%2F%2Ftracker.trackerfix.com%2Fannounce&tr=udp%3A%2F%2Fopen.demonii.com%3A1337',
            size: '213 MB',
            age: '1 year',
            seed: 45,
            leech: 42,
            category: 'app'
        }, {
            id: 7,
            name: 'Game of Thrones - XXX Parody',
            magnet: 'magnet:?xt=urn:btih:B170691FE3B6AAEBA73F8EA122E85DED4AD2E1BF&dn=game+of+thrones+s04e04+hdtv+x264+killers+ettv&tr=http%3A%2F%2Ftracker.trackerfix.com%2Fannounce&tr=udp%3A%2F%2Fopen.demonii.com%3A1337',
            size: '678 MB',
            age: '1 year',
            seed: 866,
            leech: 123,
            category: 'xxx'
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
