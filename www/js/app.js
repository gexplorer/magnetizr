angular.module('magnetizr', ['ionic', 'magnetizr.controllers', 'magnetizr.services', 'magnetizr.directives'])

    .run(function ($ionicPlatform, $rootScope, GoogleAnalytics) {
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

        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {

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

    });
