var app = angular.module("tpa", ["firebase",'ui.router',"ui.bootstrap"]);

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


app.controller("Main", function($scope, $firebase, $firebaseAuth, $modal) {
    ///////////////////////////////////////////////////////////////////////
    //////////////////////STICK TO ONE CONTROLLER!!!!//////////////////////
    ///////////////////////////////////////////////////////////////////////
    //var ref = new Firebase("https://phoodeez.firebaseio.com/");
    //var sync = $firebase(ref.child('products'));
    //$scope.items = sync.$asArray();

    $scope.open = function (modal) {
    	$modal.open({
	    	templateUrl: modal,
	        controller: modal,
	        backdrop: 'static',
	        windowClass: modal,
	        resolve: {
	          items: function () {
	          	return {
		                user: $scope.loggedIn,
		                job: ""
		            }
		         }
		     }
       });
    };
    
});

app.controller('login', function ($scope, $modalInstance, $rootScope) {
    $scope.save = function (a,b,c) {
        $modalInstance.dismiss('cancel');
    };
   	$scope.cancel = function () {
        $modalInstance.dismiss('cancel');
	};
});

//remove markup on homepage - will save for menu item pages
//dropdown samstyle
$(document).ready(function() {
    var theShift = function() {$("#option_wrapper").toggleClass("col-sm-8").next("#cart_dropdown_buffer").toggleClass("col-sm-4")};
    $('#cart-dropdown').on('show.bs.dropdown', function () {theShift()}).on('hide.bs.dropdown', function () {theShift()});
});