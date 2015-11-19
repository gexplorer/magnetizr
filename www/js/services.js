angular.module('magnetizr.services', ['magnetizr.utils', 'xml'])

    .factory('TorrentsMock', function ($http, Utils) {

        var torrents = [
            {
                id: 0,
                name: "Blade Runner",
                magnet: "uri",
                size: 3.8,
                sizeUnits: "GB",
                age: 3,
                ageUnits: "years",
                seed: 100,
                seedUnits: "k",
                leech: 90,
                leechUnits: "k",
                category: "Movies",
                color: Utils.getColor("Movies"),
                icon: Utils.getIcon("Movies")
            }, {
                id: 1,
                name: "Breaking Bad - Season 1",
                magnet: "uri",
                size: 6,
                sizeUnits: "GB",
                age: 2,
                ageUnits: "years",
                seed: 92,
                seedUnits: "k",
                leech: 87,
                leechUnits: "k",
                category: "TV",
                color: Utils.getColor("TV"),
                icon: Utils.getIcon("TV")
            }, {
                id: 2,
                name: "The hitchhicker's guide to the galaxy",
                magnet: "uri",
                size: 42,
                sizeUnits: "KB",
                age: 8,
                ageUnits: "years",
                seed: 76,
                seedUnits: "k",
                leech: 82,
                leechUnits: "k",
                category: "Books",
                color: Utils.getColor("Books"),
                icon: Utils.getIcon("Books")
            }, {
                id: 3,
                name: "Queen - Greatest Hits I & II",
                magnet: "uri",
                size: 1.2,
                sizeUnits: "GB",
                age: 12,
                ageUnits: "years",
                seed: 63,
                seedUnits: "k",
                leech: 75,
                leechUnits: "k",
                category: "Music",
                color: Utils.getColor("Music"),
                icon: Utils.getIcon("Music")
            }, {
                id: 4,
                name: "Monkey Island",
                magnet: "uri",
                size: 500,
                sizeUnits: "MB",
                age: 13,
                ageUnits: "years",
                seed: 54,
                seedUnits: "k",
                leech: 62,
                leechUnits: "k",
                category: "Games",
                color: Utils.getColor("Games"),
                icon: Utils.getIcon("Games")
            }, {
                id: 5,
                name: "Ubuntu 15.04",
                magnet: "uri",
                size: 1.4,
                sizeUnits: "GB",
                age: 3,
                ageUnits: "months",
                seed: 52,
                seedUnits: "k",
                leech: 64,
                leechUnits: "k",
                category: "Applications",
                color: Utils.getColor("Applications"),
                icon: Utils.getIcon("Applications")
            }

        ];

        return {
            get: function (torrentId) {
                return torrents[torrentId];
            },
            search: function (query) {

                return {
                    then: function (success, error) {
                        success(torrents);
                    }
                }
            }
        };
    })

    .factory('TorrentsStrke', function ($http, Utils) {

        var torrents = [];
        var searchUrl = "https://getstrike.net/api/v2/torrents/search/?phrase=";

        return {
            get: function (torrentId) {
                for (var i = 0; i < torrents.length; i++) {
                    if (torrents[i].id === torrentId) {
                        return torrents[i];
                    }
                }
                return null;
            },
            search: function (query) {

                var success = function (payload) {
                    torrents = [];
                    var torrentItems = payload.data.torrents;

                    for (var i = 0; i < torrentItems.length; i++) {
                        var torrent = torrentItems[i];
                        var size = Utils.getSizeWithUnits(torrent.size);
                        var age = Utils.getAgeWithUnits(torrent.upload_date);
                        var seed = Utils.getPeopleWithUnits(torrent.seeds);
                        var leech = Utils.getPeopleWithUnits(torrent.leeches);
                        torrents.push({
                            id: torrent.torrent_hash,
                            name: torrent.torrent_title,
                            magnet: torrent.magnet_uri,
                            size: size.size,
                            sizeUnits: size.units,
                            age: age.age,
                            ageUnits: age.units,
                            seed: seed.people,
                            seedUnits: seed.units,
                            leech: leech.people,
                            leechUnits: leech.units,
                            category: torrent.torrent_category,
                            color: Utils.getColor(torrent.torrent_category),
                            icon: Utils.getIcon(torrent.torrent_category),
                            imdb: torrent.imdbid
                        });
                    }

                    return torrents;
                };

                return $http.get(searchUrl + query, {cache: false}).then(success);
            }
        };
    })

    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('xmlHttpInterceptor');
    })

    .factory('Torrents', function ($http, Utils) {

        var torrents = [];
        var orderBy = "seeders";
        var orderDir = "desc";
        var url = "https://kat.cr/usearch/{query}/?rss=1&field=" + orderBy + "&sorder=" + orderDir;

        return {
            search: function (query) {

                var success = function (response) {
                    torrents = [];
                    var torrentItems = response.data.rss.channel.item;
                    if(!Array.isArray(torrentItems)){
                        torrentItems = [torrentItems];
                    }
                    for (var t in torrentItems) {
                        var torrent = torrentItems[t];
                        var size = Utils.getSizeWithUnits(torrent.contentLength.__text);
                        var age = Utils.getAgeWithUnits(torrent.pubDate);
                        var seed = Utils.getPeopleWithUnits(torrent.seeds.__text);
                        var leech = Utils.getPeopleWithUnits(torrent.peers.__text);
                        var category = Utils.categorize(torrent.category);
                        torrents.push({
                            id: torrent.infoHash.__text,
                            name: torrent.title,
                            magnet: torrent.magnetURI.__cdata,
                            size: size.size,
                            sizeUnits: size.units,
                            age: age.age,
                            ageUnits: age.units,
                            seed: seed.people,
                            seedUnits: seed.units,
                            leech: leech.people,
                            leechUnits: leech.units,
                            category: category,
                            color: Utils.getColor(category),
                            icon: Utils.getIcon(category),
                            imdb: ""
                        });
                    }
                    return torrents;
                };

                var searchUrl = url.replace("{query}", encodeURIComponent(query));
                return $http.get(searchUrl + query, {cache: false}).then(success);
            },

            get: function (torrentId) {
                for (var i = 0; i < torrents.length; i++) {
                    if (torrents[i].id == torrentId) {
                        return torrents[i];
                    }
                }
                return null;
            }
        }
    });
