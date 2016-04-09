(function () {
    'use strict';

    angular
        .module('core')
        .factory('torrents', torrentsMock);

    function torrentsMock(utils) {
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
                color: utils.getColor("Movies"),
                icon: utils.getIcon("Movies")
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
                color: utils.getColor("TV"),
                icon: utils.getIcon("TV")
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
                color: utils.getColor("Books"),
                icon: utils.getIcon("Books")
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
                color: utils.getColor("Music"),
                icon: utils.getIcon("Music")
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
                color: utils.getColor("Games"),
                icon: utils.getIcon("Games")
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
                color: utils.getColor("Applications"),
                icon: utils.getIcon("Applications")
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
    }
})();