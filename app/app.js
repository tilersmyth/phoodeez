var app = angular.module("phoodeez", ["firebase",'ui.router',"ui.bootstrap", "ngAnimate"]);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: "app/states/main.html",
            controller : 'mainController'
        })
        .state('cat', {
            url: "/cat/:funnelID",
            templateUrl: "app/states/submenu.html",
            controller : 'catController'
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
        });
});


