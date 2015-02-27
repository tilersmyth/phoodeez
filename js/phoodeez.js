var app = angular.module("tpa", ["firebase",'ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: "states/main.html"
        })
        .state('services', {
            url: "/services",
            templateUrl: "states/services.html"
        })
        .state('about', {
            url: "/about",
            templateUrl: "states/about.html"
        })
        .state('contact', {
            url: "/contact",
            templateUrl: "states/contact.html"
        })
        .state('feedback', {
            url: "/feedback",
            templateUrl: "states/feedback.html"
        })
        .state('jobs', {
            url: "/jobs",
            templateUrl: "states/jobs.html"
        });
});


app.controller("Main", function($scope, $firebase) {
    ///////////////////////////////////////////////////////////////////////
    //////////////////////STICK TO ONE CONTROLLER!!!!//////////////////////
    ///////////////////////////////////////////////////////////////////////
    //var ref = new Firebase("https://phoodeez.firebaseio.com/");
    //var sync = $firebase(ref.child('products'));
    //$scope.items = sync.$asArray();
});


//dropdown tylerstyle
//$(document).ready(function() {
	//$('#cart-dropdown').on('show.bs.dropdown', function () {
  			//$( "#option_wrapper" ).addClass( "col-sm-8" );
  			//$( "#cart_dropdown_buffer" ).addClass( "col-sm-4" );
	//}) <-Terminate me!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! (semicolon)

	//$('#cart-dropdown').on('hide.bs.dropdown', function () {
  			//$( "#option_wrapper" ).removeClass( "col-sm-8" );
  			//$( "#cart_dropdown_buffer" ).removeClass( "col-sm-4" );
	//}) <-Terminate me!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! (semicolon)

//});

//dropdown samstyle
$(document).ready(function() {
    var theShift = function() {$("#option_wrapper").toggleClass("col-sm-8").next("#cart_dropdown_buffer").toggleClass("col-sm-4")};
    $('#cart-dropdown').on('show.bs.dropdown', function () {theShift()}).on('hide.bs.dropdown', function () {theShift()});
});