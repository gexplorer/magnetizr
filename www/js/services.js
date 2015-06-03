angular.module('magnetizr.services', ['magnetizr.utils'])

    .factory('GoogleAnalytics', function () {
        if (!window.ga) {
            (function (i, s, o, g, r, a, m) {
                i['GoogleAnalyticsObject'] = r;
                i[r] = i[r] || function () {
                        (i[r].q = i[r].q || []).push(arguments)
                    }, i[r].l = 1 * new Date();
                a = s.createElement(o),
                    m = s.getElementsByTagName(o)[0];
                a.async = 1;
                a.src = g;
                m.parentNode.insertBefore(a, m)
            })(window, document, 'script', 'js/analytics.js', 'ga');

            var ua = 'UA-62838252-1';
            var uuid = "test";
            if (typeof device !== 'undefined') {
                uuid = device.uuid;
            }
            window.ga('create', ua, {'storage': 'none', 'clientId': uuid});
            window.ga('set', 'checkProtocolTask', null);
            window.ga('set', 'checkStorageTask', null);
            window.ga('send', 'pageview', {'page': '/magnetizr'});
        }

        return {
            track: function (a, b, c, d, e) {
                return window.ga(a, b, c, d, e);
            }
        }
    })

    .factory('Torrents', function ($http, Utils) {

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
    });
