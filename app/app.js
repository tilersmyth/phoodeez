	var app = angular.module("phoodeez", ["firebase",'ui.router',"ui.bootstrap", "ngAnimate", "ngSanitize","ngStorage"]);
(function(){

    app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true)
    $urlRouterProvider.otherwise("/");

    $stateProvider
    .state('home', {
            url: "/",
            views:{
                'viewContent': {
                    templateUrl: myLocalized.partials + "main.html",
                    controller : 'mainController'
                },
                'viewCart': {
                    templateUrl: myLocalized.partials + "cart.html",
                    controller : 'cartController'
                }
            }
        })
    .state('cat', {
            url: "/cat/:funnelID",
            views:{
                'viewContent': {
                    templateUrl: myLocalized.partials + "submenu.html",
                    controller : 'catController'
                },
                'viewCart': {
                    templateUrl: myLocalized.partials + "cart.html",
                    controller : 'cartController'
                }
            }
        })
    .state('package', {
            url: "/cat/:funnelID/:singleID",
            views:{
                'viewContent': {
                    templateUrl: myLocalized.partials + "single.html",
                    controller : 'singleController'
                },
                'viewCart': {
                    templateUrl: myLocalized.partials + "cart.html",
                    controller : 'cartController'
                }
            }

        })
    .state('checkout', {
            url: "/checkout/:cartID",
            views:{
                'viewContent': {
                    templateUrl: myLocalized.partials + "checkout.html",
                    controller : 'checkoutController'
                },
                'viewCart': {
                    templateUrl: myLocalized.partials + "cart.html",
                    controller : 'cartController'
                }
            }

        })
    .state('details', {
            url: "/checkout/:cartID/details",
            views:{
                'viewContent': {
                    templateUrl: myLocalized.partials + "collection.html",
                    controller : 'detailsController'
                },
                'viewCart': {
                    templateUrl: myLocalized.partials + "cart.html",
                    controller : 'cartController'
                }
            }

        })
    .state('profile', {
            url: "/account/profile",
            views:{
                'viewContent': {
                    templateUrl: myLocalized.partials + "profile.html",
                    controller : 'profileController'
                },
                'viewCart': {
                    templateUrl: myLocalized.partials + "cart.html",
                    controller : 'cartController'
                }
            }

        })
    .state('history', {
            url: "/account/history",
            views:{
                'viewContent': {
                    templateUrl: myLocalized.partials + "history.html",
                    controller : 'historyController'
                },
                'viewCart': {
                    templateUrl: myLocalized.partials + "cart.html",
                    controller : 'cartController'
                }
            }

        })
    .state('payments', {
            url: "/account/payments",
            views:{
                'viewContent': {
                    templateUrl: myLocalized.partials + "payments.html",
                    controller : 'paymentsController'
                },
                'viewCart': {
                    templateUrl: myLocalized.partials + "cart.html",
                    controller : 'cartController'
                }
            }

        })
    .state('services', {
            url: "/services",
            templateUrl: myLocalized.partials + "services.html"
        })
        .state('about', {
            url: "/about",
            templateUrl: myLocalized.partials + "about.html"
        })
        .state('contact', {
            url: "/contact",
            templateUrl: myLocalized.partials + "contact.html"
        })
        .state('feedback', {
            url: "/feedback",
            templateUrl: myLocalized.partials + "feedback.html"
        })
        .state('jobs', {
            url: "/jobs",
            templateUrl: myLocalized.partials + "jobs.html"
        })
        .state('calendar', {
            url: "/calendar",
            views:{
                'viewContent': {
                    templateUrl: myLocalized.partials + "calendar.html",
                },
                'viewCart': {
                    templateUrl: myLocalized.partials + "cart.html",
                    controller : 'calendarController'
                }
            }
        });
});


})();