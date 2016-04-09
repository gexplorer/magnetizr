(function () {
    'use strict';

    angular
        .module('magnetizr')
        .run(run);

    function run($ionicPlatform, $rootScope, $translate, $http, CacheFactory) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }

            // I18n plugin configuration
            if (typeof navigator.globalization !== "undefined") {
                navigator.globalization.getPreferredLanguage(function (language) {
                    $translate.use((language.value).split("-")[0]).then(function (data) {
                        console.log("SUCCESS -> " + data);
                    }, function (error) {
                        console.log("ERROR -> " + error);
                    });
                }, null);
            }

            $http.defaults.cache = CacheFactory('defaultCache', {
                maxAge: 15 * 60 * 1000, // Items added to this cache expire after 15 minutes
                capacity: 20, // Maximum number of items a cache can hold
                deleteOnExpire: 'aggressive' // Items will be deleted from this cache when they expire
            });
        });
    }
})();
