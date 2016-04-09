(function () {
    'use strict';

    angular
        .module('core')
        .factory('torrents', torrentsStrike);

    function torrentsStrike($http, utils) {

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
                        var size = utils.getSizeWithUnits(torrent.size);
                        var age = utils.getAgeWithUnits(torrent.upload_date);
                        var seed = utils.getPeopleWithUnits(torrent.seeds);
                        var leech = utils.getPeopleWithUnits(torrent.leeches);
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
                            color: utils.getColor(torrent.torrent_category),
                            icon: utils.getIcon(torrent.torrent_category),
                            imdb: torrent.imdbid
                        });
                    }

                    return torrents;
                };

                return $http.get(searchUrl + query, {cache: false}).then(success);
            }
        };
    }
})();