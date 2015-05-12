angular.module('magnetizr.services', [])

    .factory('Torrents', function () {

        function getColor(category) {
            var color = "light";
            switch (category) {
                case "tv":
                    color = "positive";
                    break;
                case "movie":
                    color = "calm";
                    break;
                case "book":
                    color = "balanced";
                    break;
                case "music":
                    color = "royal";
                    break;
                case "game":
                    color = "assertive";
                    break;
                case "app":
                    color = "dark";
                    break;
                case "xxx":
                    color = "stable";
            }
            return color;
        }

        function getIcon(category) {
            var color = "paperclip";
            switch (category) {
                case "tv":
                    color = "monitor";
                    break;
                case "movie":
                    color = "ios-videocam";
                    break;
                case "book":
                    color = "ios-book";
                    break;
                case "music":
                    color = "music-note";
                    break;
                case "game":
                    color = "ios-game-controller-b";
                    break;
                case "app":
                    color = "gear-a";
                    break;
                case "xxx":
                    color = "alert-circled";
            }
            return color;
        }

        var torrents = [{
            id: 0,
            name: 'Game of Thrones S04E04 HDTV x264-KILLERS[ettv]',
            magnet: 'magnet:?xt=urn:btih:B170691FE3B6AAEBA73F8EA122E85DED4AD2E1BF&dn=game+of+thrones+s04e04+hdtv+x264+killers+ettv&tr=http%3A%2F%2Ftracker.trackerfix.com%2Fannounce&tr=udp%3A%2F%2Fopen.demonii.com%3A1337',
            size: '351 MB',
            age: '1 year',
            seed: 820,
            leech: 15,
            category: 'tv',
            color: getColor('tv'),
            icon: getIcon('tv')
        }, {
            id: 1,
            name: 'Game of Thrones S04E04 720p HDTV x264-KILLERS [eztv]',
            magnet: 'magnet:?xt=urn:btih:B170691FE3B6AAEBA73F8EA122E85DED4AD2E1BF&dn=game+of+thrones+s04e04+hdtv+x264+killers+ettv&tr=http%3A%2F%2Ftracker.trackerfix.com%2Fannounce&tr=udp%3A%2F%2Fopen.demonii.com%3A1337',
            size: '1.25 GB',
            age: '1 year',
            seed: 360,
            leech: 18,
            category: 'tv',
            color: getColor('tv'),
            icon: getIcon('tv')
        }, {
            id: 2,
            name: 'Game of Thrones - The Movie',
            magnet: 'magnet:?xt=urn:btih:B170691FE3B6AAEBA73F8EA122E85DED4AD2E1BF&dn=game+of+thrones+s04e04+hdtv+x264+killers+ettv&tr=http%3A%2F%2Ftracker.trackerfix.com%2Fannounce&tr=udp%3A%2F%2Fopen.demonii.com%3A1337',
            size: '4.2 GB',
            age: '1 day',
            seed: 905,
            leech: 210,
            category: 'movie',
            color: getColor('movie'),
            icon: getIcon('movie')
        }, {
            id: 3,
            name: 'Game of Thrones - Soundtrak',
            magnet: 'magnet:?xt=urn:btih:B170691FE3B6AAEBA73F8EA122E85DED4AD2E1BF&dn=game+of+thrones+s04e04+hdtv+x264+killers+ettv&tr=http%3A%2F%2Ftracker.trackerfix.com%2Fannounce&tr=udp%3A%2F%2Fopen.demonii.com%3A1337',
            size: '635 MB',
            age: '1 year',
            seed: 240,
            leech: 3,
            category: 'music',
            color: getColor('music'),
            icon: getIcon('music')
        }, {
            id: 4,
            name: 'Game of Thrones - Book 1',
            magnet: 'magnet:?xt=urn:btih:B170691FE3B6AAEBA73F8EA122E85DED4AD2E1BF&dn=game+of+thrones+s04e04+hdtv+x264+killers+ettv&tr=http%3A%2F%2Ftracker.trackerfix.com%2Fannounce&tr=udp%3A%2F%2Fopen.demonii.com%3A1337',
            size: '420 KB',
            age: '1 year',
            seed: 95,
            leech: 29,
            category: 'book',
            color: getColor('book'),
            icon: getIcon('book')
        }, {
            id: 5,
            name: 'Game of Thrones - NDS Game',
            magnet: 'magnet:?xt=urn:btih:B170691FE3B6AAEBA73F8EA122E85DED4AD2E1BF&dn=game+of+thrones+s04e04+hdtv+x264+killers+ettv&tr=http%3A%2F%2Ftracker.trackerfix.com%2Fannounce&tr=udp%3A%2F%2Fopen.demonii.com%3A1337',
            size: '386 MB',
            age: '1 year',
            seed: 21,
            leech: 15,
            category: 'game',
            color: getColor('game'),
            icon: getIcon('game')
        }, {
            id: 6,
            name: 'Game of Thrones Companion APP',
            magnet: 'magnet:?xt=urn:btih:B170691FE3B6AAEBA73F8EA122E85DED4AD2E1BF&dn=game+of+thrones+s04e04+hdtv+x264+killers+ettv&tr=http%3A%2F%2Ftracker.trackerfix.com%2Fannounce&tr=udp%3A%2F%2Fopen.demonii.com%3A1337',
            size: '213 MB',
            age: '1 year',
            seed: 45,
            leech: 42,
            category: 'app',
            color: getColor('app'),
            icon: getIcon('app')
        }, {
            id: 7,
            name: 'Game of Thrones - XXX Parody',
            magnet: 'magnet:?xt=urn:btih:B170691FE3B6AAEBA73F8EA122E85DED4AD2E1BF&dn=game+of+thrones+s04e04+hdtv+x264+killers+ettv&tr=http%3A%2F%2Ftracker.trackerfix.com%2Fannounce&tr=udp%3A%2F%2Fopen.demonii.com%3A1337',
            size: '678 MB',
            age: '1 year',
            seed: 866,
            leech: 123,
            category: 'xxx',
            color: getColor('xxx'),
            icon: getIcon('xxx')
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
