angular.module('magnetizr.services', [])

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

    .factory('Torrents', function ($http) {

        var torrents = [];
        var searchUrl = "https://getstrike.net/api/v2/torrents/search/?phrase=";

        function getColor(category) {
            var color = "light";
            switch (category) {
                case "TV":
                    color = "positive";
                    break;
                case "Movies":
                    color = "calm";
                    break;
                case "Anime":
                    color = "energized";
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
                    color = "stable";
                    break;
                case "XXX":
                    color = "light";
            }
            return color;
        }

        function getIcon(category) {
            var color = "android-attach";
            switch (category) {
                case "TV":
                    color = "android-desktop";
                    break;
                case "Movies":
                    color = "android-film";
                    break;
                case "Anime":
                    color = "android-create";
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
                    color = "android-settings";
                    break;
                case "XXX":
                    color = "android-close";
            }
            return color;
        }

        function getSizeWithUnits(size) {
            for (var numberOfDivisions = 0; (size >= 1024) && (numberOfDivisions < 4); numberOfDivisions++) {
                size = size / 1024;
            }

            var sizeObject = {};
            sizeObject.size = Math.round(Math.round(size * 100) / 100);

            switch (numberOfDivisions) {
                case 0:
                    sizeObject.units = " B";
                    break;
                case 1:
                    sizeObject.units = " KB";
                    break;
                case 2:
                    sizeObject.units = " MB";
                    break;
                case 3:
                    sizeObject.size = (Math.round(size * 100) / 100);
                    sizeObject.units = " GB";
            }

            return sizeObject;
        }

        function getPeopleWithUnits(people) {
            var peopleObject = {};
            if (people < 1000) {
                peopleObject.people = people;
                peopleObject.units = "";
            } else {
                peopleObject.people = Math.round(people / 1000);
                peopleObject.units = "k";
            }
            return peopleObject;
        }

        var getAgeFromTo = {

            inDays: function (dateFrom, dateTo) {
                var timeTo = dateTo.getTime();
                var timeFrom = dateFrom.getTime();

                return parseInt((timeTo - timeFrom) / (24 * 3600 * 1000));
            },

            inWeeks: function (dateFrom, dateTo) {
                var timeTo = dateTo.getTime();
                var timeFrom = dateFrom.getTime();

                return parseInt((timeTo - timeFrom) / (24 * 3600 * 1000 * 7));
            },

            inMonths: function (dateFrom, dateTo) {
                var yearFrom = dateFrom.getFullYear();
                var yearTo = dateTo.getFullYear();
                var monthFrom = dateFrom.getMonth();
                var monthTo = dateTo.getMonth();

                return (monthTo + 12 * yearTo) - (monthFrom + 12 * yearFrom);
            },

            inYears: function (dateFrom, dateTo) {
                return dateTo.getFullYear() - dateFrom.getFullYear();
            }
        };

        function getAgeWithUnits(from) {
            var ageObject = {};

            var years = getAgeFromTo.inYears(new Date(from), new Date());
            if (years > 0) {
                ageObject.age = years;
                ageObject.units = getAgeUnits(years, "year");
                return ageObject;
            }

            var months = getAgeFromTo.inMonths(new Date(from), new Date());
            if (months > 0) {
                ageObject.age = months;
                ageObject.units = getAgeUnits(months, "month");
                return ageObject;
            }

            var weeks = getAgeFromTo.inWeeks(new Date(from), new Date());
            if (weeks > 0) {
                ageObject.age = weeks;
                ageObject.units = getAgeUnits(weeks, "week");
                return ageObject;
            }

            var days = getAgeFromTo.inDays(new Date(from), new Date());
            ageObject.age = days;
            ageObject.units = getAgeUnits(days, "day");
            return ageObject;
        }

        function getAgeUnits(number, unitName) {
            if (number > 1) {
                unitName += "s";
            }
            return unitName;
        }

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
                        var size = getSizeWithUnits(torrent.size);
                        var age = getAgeWithUnits(torrent.upload_date);
                        var seed = getPeopleWithUnits(torrent.seeds);
                        var leech = getPeopleWithUnits(torrent.leeches);
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
                            color: getColor(torrent.torrent_category),
                            icon: getIcon(torrent.torrent_category),
                            imdb: torrent.imdbid
                        });
                    }

                    return torrents;
                };

                return $http.get(searchUrl + query, {cache: true}).then(success);
            }
        };
    });
