(function () {
    'use strict';

    angular
        .module('core')
        .factory('torrents', torrents);

    function torrents($http, Utils) {
        var torrents = [];
        var orderBy = "seeders";
        var orderDir = "desc";
        var url = "https://kat.cr/usearch/{query}/?rss=1&field=" + orderBy + "&sorder=" + orderDir;

        return {
            search: search,
            get: get
        };

        function search(query, category) {

            var success = function (response) {
                torrents = [];
                var torrentItems = response.data.rss.channel.item;
                if (!Array.isArray(torrentItems)) {
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
                        imdb: ""
                    });
                }
                return torrents;
            };

            if (category) {
                query += ' category:' + category.toLowerCase();
            }

            var searchUrl = url.replace("{query}", encodeURIComponent(query));
            return $http.get(searchUrl, {cache: false}).then(success);
        }

        function get(torrentId) {
            for (var i = 0; i < torrents.length; i++) {
                if (torrents[i].id == torrentId) {
                    return torrents[i];
                }
            }
            return null;
        }
    }
})();