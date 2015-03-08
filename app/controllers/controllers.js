
/**
 * Root Controller
 * Appended to body tag
 * 
 * 
 */

app.controller("ApplicationController", function($scope, $modal, UserDataStorage, $firebaseAuth, $firebase, $location) {
    var ref = new Firebase("https://phoodeez2.firebaseio.com/");  
    var usersRef = ref.child("users");
    var userData = $firebase(usersRef);
    var userDataArray = $firebase(usersRef).$asArray();

    $scope.authObj = $firebaseAuth(ref);
    $scope.authData = $scope.authObj.$getAuth();

    //Listener for user login
   $scope.$on('userOn', function(event, data) {
        $scope.loggedIn = data;
    });

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

    //Cart Action Start
    $scope.cartToggle = false;
    $scope.cartFctn = function (open) { 
        if(open){
            $scope.cartToggle = true;
        }else{
            $scope.cartToggle = $scope.cartToggle === true ? false: true;
        }
    };

$scope.testerr = "hey";
    
$scope.cartObjects = [];
    $scope.$on('cartSubmitOpen', function(event, data) {
         //Step 1. cart open   
         $scope.cartFctn(data.open);
         //Step 2. fill cart
        
        var obj = {
            vendorName: data.vendorName,
            "cart": [{
              packageID: data.packageID,
              itemName: data.itemName,
              itemID: data.itemID,
              itemQty: data.itemQty,
              itemPrice: data.itemPrice,
              itemNotes: data.itemNotes
            }]};

              
         var addToArray=true;
         for(var i=0;i<$scope.cartObjects.length;i++){
             if($scope.cartObjects[i].vendorName===obj.vendorName){
                 $scope.cartObjects[i].cart.push(obj.cart[0]);
                 addToArray=false;
             } 
         }
        if(addToArray){ 
            $scope.cartObjects.push(obj);
        }

        //console.log($scope.cartObjects);
    })

    $scope.total = function() { 
        var subtotal = 0; var salestax = 0; var total = 0;
        angular.forEach($scope.cartObjects, function(item) {
            angular.forEach(item.cart, function(itemSingle) {
                subtotal += itemSingle.itemPrice * itemSingle.itemQty;
                salestax += subtotal*.0625;
                total += subtotal+salestax+30;
            })        
        })
        $scope.subTotal =  subtotal;
        $scope.salesTax =  salestax;
        $scope.totalTotal =  total;
        return {
            total: total
         };

         
    }



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
                singleData: function () {
                    return $scope.catInfo.subpackages[$scope.singleInfo].Options[ID];            
                },
                packageData: function (){
                    return $scope.catInfo.subpackages[$scope.singleInfo];
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
app.controller("packageModalController", function($scope, $rootScope, $modalInstance, singleData, packageData) {
    $scope.model = { min: 1, max: 99, qty: 1};
    $scope.singleData = singleData;
    $scope.packageData = packageData;

    //close modal
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };


    //data to pass: 1. VendorName, packageID, itemID, Qty, Price, Notes   

    //cart submit action
    $scope.cartSubmit = function (vendorName, packageID, itemName, itemID, itemQty, itemPrice, itemNotes) {
        var cartAction = { open: "openCart", vendorName: vendorName, packageID: packageID, itemName:itemName, itemID:itemID, itemQty:itemQty, itemPrice:itemPrice, itemNotes:itemNotes};
        $modalInstance.dismiss('cancel');
        $rootScope.$broadcast('cartSubmitOpen', cartAction);


    }

});

/**
 * Cart State Controller
 * 
 * 
 * 
 */
app.controller("cartController", function($scope) {
        $scope.total = function() {
        var total = 0;
        angular.forEach($scope.invoice.items, function(item) {
            total += item.qty * item.cost;
        })

        return total;
    }

});