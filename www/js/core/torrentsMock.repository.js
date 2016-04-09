(function () {
    'use strict';

    angular
        .module('core')
        .factory('torrents', torrentsMock);

    function torrentsMock(Utils) {
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
    }
})();