angular.module('magnetizr', ['ionic', 'magnetizr.controllers', 'magnetizr.directives', 'pascalprecht.translate', 'angular-cache'])

    .run(function ($ionicPlatform, $rootScope, GoogleAnalytics, $translate, $http, CacheFactory) {
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

            $rootScope.$on('$stateChangeStart',
                function (event, toState, toParams, fromState, fromParams) {
                    console.log("* Changing route: "+ toState.name);
                    GoogleAnalytics.track('send', 'pageview', {'page': toState.name});
                });

            // I18n plugin configuration
            if(typeof navigator.globalization !== "undefined") {
                navigator.globalization.getPreferredLanguage(function(language) {
                    $translate.use((language.value).split("-")[0]).then(function(data) {
                        console.log("SUCCESS -> " + data);
                    }, function(error) {
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
    })

    .config(function ($stateProvider, $urlRouterProvider, $translateProvider) {

        $stateProvider

            .state('torrents', {
                url: '/torrents',
                templateUrl: 'templates/torrents.html',
                controller: 'TorrentsCtrl'
            })

            .state('torrent-detail', {
                url: '/torrents/:torrentId',
                templateUrl: 'templates/torrent-detail.html',
                controller: 'TorrentDetailCtrl'
            });

        $urlRouterProvider.otherwise('/torrents');

        $translateProvider.useSanitizeValueStrategy('escaped');
        $translateProvider.useStaticFilesLoader({
            prefix: 'i18n/locale-',
            suffix: '.json'
        });

        $translateProvider.preferredLanguage("en");
        $translateProvider.fallbackLanguage("en");

    });
