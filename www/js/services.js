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

        var torrents = [];

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

        function getFormattedSize(size) {
            var numberOfDivisions = 0;
            for (numberOfDivisions = 0; (size >= 1024) && (numberOfDivisions < 4); numberOfDivisions++) {
                size = size / 1024;
            }

            switch (numberOfDivisions) {
                case 0:
                    return (Math.round(size * 100) / 100) + " B";
                case 1:
                    return (Math.round(size * 100) / 100) + " KB";
                case 2:
                    return (Math.round(size * 100) / 100) + " MB";
                case 3:
                    return (Math.round(size * 100) / 100) + " GB";
            }
        }

        function getImdbUrl(imdbId) {
            return "http://www.imdb.com/title/" + imdbId;
        }

        var getAgeFromTo = {

            inDays: function(dateFrom, dateTo) {
                var timeTo = dateTo.getTime();
                var timeFrom = dateFrom.getTime();

                return parseInt((timeTo-timeFrom)/(24*3600*1000));
            },

            inWeeks: function(dateFrom, dateTo) {
                var timeTo = dateTo.getTime();
                var timeFrom = dateFrom.getTime();

                return parseInt((timeTo-timeFrom)/(24*3600*1000*7));
            },

            inMonths: function(dateFrom, dateTo) {
                var yearFrom = dateFrom.getFullYear();
                var yearTo = dateTo.getFullYear();
                var dateFrom = dateFrom.getMonth();
                var dateTo = dateTo.getMonth();

                return (dateTo+12*yearTo)-(dateFrom+12*yearFrom);
            },

            inYears: function(dateFrom, dateTo) {
                return dateTo.getFullYear() - dateFrom.getFullYear();
            }
        };

        function getAge(from) {
            var years = getAgeFromTo.inYears(new Date(from), new Date());
            if (years > 0) {
                return getFormattedAge(years, "year");
            }

            var months = getAgeFromTo.inMonths(new Date(from), new Date());
            if (months > 0) {
                return getFormattedAge(months, "month");
            }

            var weeks = getAgeFromTo.inWeeks(new Date(from), new Date());
            if (weeks > 0) {
                return getFormattedAge(weeks, "week");
            }

            var days = getAgeFromTo.inDays(new Date(from), new Date());
            return getFormattedAge(days, "day");
        }

        function getFormattedAge(number, unitName) {
            if (number > 1) {
                unitName += "s";
            }
            return number + " " + unitName;
        }


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

                        for (var i = 0; i < torrentItems.length; i++) {
                            var torrent = torrentItems[i];
                            torrents.push({
                                id: torrent.torrent_hash,
                                name: torrent.torrent_title,
                                magnet: torrent.magnet_uri,
                                size: getFormattedSize(torrent.size),
                                age: getAge(torrent.upload_date),
                                seed: torrent.seeds,
                                leech: torrent.leeches,
                                category: torrent.torrent_category,
                                color: getColor(torrent.torrent_category),
                                icon: getIcon(torrent.torrent_category),
                                imdb: getImdbUrl(torrent.imdbid)
                            });
                        }

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
