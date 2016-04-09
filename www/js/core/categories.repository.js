(function () {
    'use strict';

    angular
        .module('core')
        .factory('categories', categories);

    function categories() {
        var categories = [];
        categories['TV'] = {
            category: 'TV',
            icon: 'android-desktop',
            color: 'positive'
        };
        categories['Movies'] = {
            category: 'Movies',
            icon: 'android-film',
            color: 'calm'
        };
        categories['Anime'] = {
            category: 'Anime',
            icon: 'android-create',
            color: 'energized'
        };
        categories['Books'] = {
            category: 'Books',
            icon: 'ios-book',
            color: 'balanced'
        };
        categories['Music'] = {
            category: 'Music',
            icon: 'music-note',
            color: 'royal'
        };
        categories['Games'] = {
            category: 'Games',
            icon: 'ios-game-controller-b',
            color: 'assertive'
        };
        categories['Applications'] = {
            category: 'Applications',
            icon: 'android-settings',
            color: 'stable'
        };
        categories['XXX'] = {
            category: 'XXX',
            icon: 'android-close',
            color: 'light'
        };

        return {
            get: function () {
                return categories
            }
        };
    }
})();