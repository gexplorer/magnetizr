angular.module('magnetizr', ['ionic', 'magnetizr.controllers', 'magnetizr.services', 'magnetizr.directives', 'pascalprecht.translate'])

    .run(function ($ionicPlatform, $rootScope, GoogleAnalytics, $translate) {
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

        $translateProvider.translations('en', {
            Search: "Search",
            year: " year",
            years: " years",
            month: " month",
            months: " months",
            day: " day",
            days: " days",
            Size: "Size",
            Age: "Age",
            openIMDB: "Open in IMDB",
            getMagnet: "Get magnet",
            TV: "TV",
            Movies: "Movies",
            Anime: "Anime",
            Books: "Books",
            Music: "Music",
            Games: "Games",
            Applications: "Applications",
            XXX: "XXX"
        });
        $translateProvider.translations('es', {
            Search: "Buscar",
            year: " año",
            years: " años",
            month: " mes",
            months: " meses",
            day: " día",
            days: " días",
            Size: "Tamaño",
            Age: "Edad",
            openIMDB: "Abrir en IMDB",
            getMagnet: "Abrir magnet",
            TV: "TV",
            Movies: "Películas",
            Anime: "Anime",
            Books: "Libros",
            Music: "Música",
            Games: "Juegos",
            Applications: "Aplicaciones",
            XXX: "XXX"
        });
        $translateProvider.preferredLanguage("en");
        $translateProvider.fallbackLanguage("en");

    });
