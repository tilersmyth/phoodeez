var app = angular.module("phoodeez", ["firebase",'ui.router',"ui.bootstrap", "ngAnimate"]);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
        .state('home', {
            url: "/",
            views:{
                'viewContent': {
                    templateUrl: "app/states/main.html",
                    controller : 'mainController'
                },
                'viewCart': {
                    templateUrl: "app/states/cart.html",
                    controller : 'cartController'
                }
            }
        })
        .state('cat', {
            url: "/cat/:funnelID",
            views:{
                'viewContent': {
                    templateUrl: "app/states/submenu.html",
                    controller : 'catController'
                },
                'viewCart': {
                    templateUrl: "app/states/cart.html",
                    controller : 'cartController'
                }
            }
        })
        .state('package', {
            url: "/cat/:funnelID/:singleID",
            views:{
                'viewContent': {
                    templateUrl: "app/states/single.html",
                    controller : 'catController'
                },
                'viewCart': {
                    templateUrl: "app/states/cart.html",
                    controller : 'cartController'
                }
            }

        })
        .state('services', {
            url: "/services",
            templateUrl: "app/states/services.html"
        })
        .state('about', {
            url: "/about",
            templateUrl: "app/states/about.html"
        })
        .state('contact', {
            url: "/contact",
            templateUrl: "app/states/contact.html"
        })
        .state('feedback', {
            url: "/feedback",
            templateUrl: "app/states/feedback.html"
        })
        .state('jobs', {
            url: "/jobs",
            templateUrl: "app/states/jobs.html"
        })
        .state('calendar', {
            url: "/calendar",
            views:{
                'viewContent': {
                    templateUrl: "app/states/calendar.html",
                },
                'viewCart': {
                    templateUrl: "app/states/cart.html",
                    controller : 'cartController'
                }
            }
        });
});


