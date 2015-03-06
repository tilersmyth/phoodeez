
/**
 * Root Controller
 * Appended to body tag
 * 
 * 
 */

app.controller("ApplicationController", function($scope, $modal, UserDataStorage, $firebaseAuth, $firebase) {
    var ref = new Firebase("https://phoodeez2.firebaseio.com/");  
    var usersRef = ref.child("users");
    var userData = $firebase(usersRef);
    var userDataArray = $firebase(usersRef).$asArray();

    $scope.authObj = $firebaseAuth(ref);
    $scope.authData = $scope.authObj.$getAuth();

    //store user data if logged in
    $scope.authObj.$onAuth(function(authData) { 
        if (authData) {
            var TuserInfo = $firebase(usersRef.child(authData.uid));
            var userStor = TuserInfo.$asObject();
            userStor.$loaded()
                .then(function(data) {
                    UserDataStorage.update(data);
                    UserDataStorage.isLoading(false);
                });
        } else {
            UserDataStorage.update(false);
            UserDataStorage.isLoading(false);
        }
    });


    //check to see if user logged in
    if ($scope.authData !== null) {
            var userInfo = $firebase(usersRef.child($scope.authData.uid));
            $scope.userData = userInfo.$asObject();
            $scope.$emit('userOn', $scope.userData);
    } else $scope.$emit('userOn', false);

    //Log out
    $scope.logout = function() {
        $scope.authObj.$unauth();
        $scope.authData = $scope.authObj.$getAuth();
        $scope.$emit('userOn', false);
    };


   //Open Login Modal and pass necessary vars
    $scope.open = function (modal) {
        $modal.open({
            templateUrl: modal,
            controller: modal+'Controller',
            backdrop: 'static',
            windowClass: modal,
            resolve: {
                authObj: function () {
                  return $scope.authObj;
                },
                usersRef: function () {
                  return usersRef;
                },
                userData: function () {
                  return userData;
                }
            }
       });
    }; 

    //Toggle Cart Dropdown
    $scope.cartToggle = false;
    $scope.cartFctn = function () { 
        $scope.cartToggle = $scope.cartToggle === true ? false: true;
    };



});

/**
 * Login Controller
 * Applied to modal
 * 
 * 
 */

app.controller('loginController', function ($rootScope, $scope, $modalInstance, $firebase, postEmailForm, authObj, usersRef, userData) {
    $scope.authObj = authObj;
    $scope.usersRef = usersRef;
    $scope.userData = userData;

    //Get validated emails
    var setEmails = [];
    usersRef.once('value', function(userSnapshot) { 
            var userSnap = userSnapshot.val(); 
            for (var key in userSnap) {
                //noinspection JSUnfilteredForInLoop
                setEmails.push(userSnap[key].email);
        }
    });


    //User Sign up
    $scope.signUp = function(signup) { 
        var emailsGood;
        for (var i = 0; i < setEmails.length; i++) {
            if (signup.email === setEmails[i]) {
                emailsGood = false;
                $scope.signmsg = "The email address is already in use.";
                break;
            } else {
                emailsGood = true;
            }
        }
        if (emailsGood) { 

            if (signup.password1 !== signup.password2) {
                $scope.signmsg = "Passwords do not match!"
            } else {

            $scope.authObj.$createUser({
                email: signup.email,
                password: signup.password1
            }).then(function() {
                return $scope.authObj.$authWithPassword({
                    email: signup.email,
                    password: signup.password1
                });
            }).then(function() {

            $scope.signmsg = "Success!";
            $scope.authData = $scope.authObj.$getAuth();
            var userInfo = $firebase(usersRef.child($scope.authData.uid));
            $scope.userData = userInfo.$asObject();
            var usertoPush = $scope.authObj.$getAuth();
            usersRef.child(usertoPush.uid).set({
                firstName: signup.firstname,
                lastName: signup.lastname,
                email: signup.email,
                provider: usertoPush.provider,
                joined: new Date().getTime()
            });
            $rootScope.$broadcast('userOn', $scope.userData);
            $modalInstance.dismiss('cancel');
            
            }).catch(function(error) {
                console.error("Error: ", error);
            });
                


            }
        }
    };


    //User Login Authentication
    $scope.credentials = {
        username: '',
        password: ''
    };

    //User Sign in
    $scope.login = function (credentials) {
         $scope.authObj.$authWithPassword({
            email: credentials.username,
            password: credentials.password
        })
        .then(function(user) {
            //console.log('Authentication success');

            $rootScope.$broadcast('userOn', $scope.userData);
            $modalInstance.dismiss('cancel');
        }, function(error) {
           // console.log('Authentication failure');
        });       
      
    };


    //close modal btn
   	$scope.cancel = function () {
        $modalInstance.dismiss('cancel');
	};
 
});

/**
 * Main State Controller
 * Applied to main state (home page)
 * 
 * 
 */

app.controller("mainController", function($scope, $firebase) {
    var ref = new Firebase("https://phoodeez2.firebaseio.com/");  
    var packages = ref.child("packages");
    var packageData = $firebase(packages);
    
    $scope.packages = $firebase(packages).$asObject();
});


/**
 * Cat State Controller
 * Applied to cat state (submenu recommendation)
 * 
 * 
 */

app.controller("catController", function($scope, $modal, $firebase, $stateParams) {

    var ref = new Firebase("https://phoodeez2.firebaseio.com/");  
    var catRef = ref.child("packages");
    $scope.Slug = $stateParams.funnelID; 
    var catData = $firebase(catRef.child($scope.Slug));
    $scope.catInfo = catData.$asObject();
    $scope.singleInfo = $stateParams.singleID; 


    //Open Order Modal and pass necessary vars
    $scope.openOrder = function (ID) {  
        $modal.open({
            templateUrl: "package_order",
            backdrop: 'static',
            controller: 'packageModalController',
            resolve: {
                packageData: function () {
                  return $scope.catInfo.subpackages[$scope.singleInfo].Options[ID];
                }
            }
       });
    }; 

});

/**
 * Package Modal Controller
 * 
 * 
 * 
 */
app.controller("packageModalController", function($scope,$modalInstance, packageData) {
    $scope.model = { min: 0, max: 99, qty_default: 0};
    $scope.packageData = packageData;

    //close modal
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

});

/**
 * Cart State Controller
 * 
 * 
 * 
 */
app.controller("cartController", function($scope) {


});