angular.module('magnetizr.services', [])

    .factory('GoogleAnalytics', function () {
        if(!window.ga) {
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

    .factory('Torrents', function ($http) {

        function getColor(category) {
            var color = "light";
            switch (category) {
                case "TV":
                    color = "positive";
                    break;
                case "Movies":
                    color = "calm";
                    break;
                case "Books":
                    color = "balanced";
                    break;
                case "Music":
                    color = "royal";
                    break;
                case "Games":
                    color = "assertive";
                    break;
                case "Applications":
                    color = "dark";
                    break;
                case "XXX":
                    color = "stable";
            }
            return color;
        }

        function getIcon(category) {
            var color = "paperclip";
            switch (category) {
                case "TV":
                    color = "monitor";
                    break;
                case "Movies":
                    color = "ios-videocam";
                    break;
                case "Books":
                    color = "ios-book";
                    break;
                case "Music":
                    color = "music-note";
                    break;
                case "Games":
                    color = "ios-game-controller-b";
                    break;
                case "Applications":
                    color = "gear-a";
                    break;
                case "XXX":
                    color = "alert-circled";
            }
            return color;
        }

        var torrents = [];

        return {
            all: function () {
                return torrents;
            },
            remove: function (torrent) {
                torrents.splice(torrents.indexOf(torrent), 1);
            },
            get: function (torrentId) {
                for (var i = 0; i < torrents.length; i++) {
                    if (torrents[i].id === torrentId) {
                        return torrents[i];
                    }
                }
                return null;
            },
            search: function (query) {
                $http.get('https://getstrike.net/api/v2/torrents/search/?phrase=' + query).
                    success(function(data, status, headers, config) {
                        torrents.length = 0;

                        var torrentItems = data.torrents;
                        console.log(torrentItems);

                        for (var i = 0; i < torrentItems.length; i++) {
                            var torrent = torrentItems[i];
                            torrents.push({
                                id: torrent.torrent_hash,
                                name: torrent.torrent_title,
                                magnet: torrent.magnet_uri,
                                size: torrent.size,
                                age: torrent.upload_date,
                                seed: torrent.seeds,
                                leech: torrent.leeches,
                                category: torrent.torrent_category,
                                color: getColor(torrent.torrent_category),
                                icon: getIcon(torrent.torrent_category)
                            });
                        }

                        console.log("Results:");
                        console.log(torrents);

                        return torrents;

                    }).
                    error(function(data, status, headers, config) {
                        alert("Something went wrong");
                    });

                return torrents;
            },
            download: function (torrent) {
                navigator.app.loadUrl(torrent.magnet, {openExternal: true});
            }
        };
    });
