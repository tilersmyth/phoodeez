
/**
 * Root Controller
 * Appended to body tag
 * 
 * 
 */

app.controller("ApplicationController", function($scope, $modal, $http, $localStorage, Auth) {

    //set the root path
    $scope.rootPath = myLocalized.root;

    //Listener for user login
   $scope.$on('userOn', function(event, data) {
        $scope.loggedIn = data; 
    });

    //check session auth on refresh
    if (Auth.setUser()!== "false"){
         $scope.$emit('userOn', Auth.setUser());
    } else $scope.$emit('userOn', false);

    //Log out (end session)
    $scope.logout = function() {
        delete $localStorage.x;
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

    

//if cart from session
if(Auth.setCart().cart){$scope.cartObjects = Auth.setCart().cart}else{$scope.cartObjects = [];}
    $scope.$on('cartSubmitOpen', function(event, data) {
         //Step 1. cart open   
         $scope.cartFctn(data.open);
         //Step 2. fill cart (if not updating)
        if (!data.action){
        var obj = {
            packageID: data.packageID,
            vendorName: data.vendorName,
            packageDesc:data.packageDesc,
            "cart": [{
              itemName: data.itemName,
              itemID: data.itemID,
              itemQty: data.itemQty,
              itemPrice: data.itemPrice,
              itemNotes: data.itemNotes
            }]};

              
         var addToArray=true;
         //if vendorName exists
         for(var i=0;i<$scope.cartObjects.length;i++){
             if($scope.cartObjects[i].vendorName===obj.vendorName){
                 $scope.cartObjects[i].cart.push(obj.cart[0]);
                 addToArray=false;
             } 
         }
        //if empty array
        if(addToArray){ 
            $scope.cartObjects.push(obj);
            $localStorage.$reset({cart: $scope.cartObjects });
        }}

        //update cart
        if (data.action){

            angular.forEach($scope.cartObjects,function(value,index){
                if($scope.cartObjects[index].packageID===data.packageID){ 
                    angular.forEach($scope.cartObjects[index].cart,function(subValue,subIndex){
                        if($scope.cartObjects[index].cart[subIndex].$$hashKey===data.itemID){ 
                           $scope.cartObjects[index].cart[subIndex].itemQty = data.itemQty;
                           $scope.cartObjects[index].cart[subIndex].itemNotes = data.itemNotes;
                        }
                    })
                }
            })
        }

    })

    $scope.total = function() { 
        var subtotal = 0; var salestax = 0; var total = 0;
        angular.forEach($scope.cartObjects, function(item) {
            angular.forEach(item.cart, function(itemSingle) {
                //set cart local storage
                subtotal += itemSingle.itemPrice * itemSingle.itemQty;
                salestax += subtotal*.0625;
                total = subtotal+salestax+30;
            })        
        })
        $scope.subTotal =  subtotal;
        $scope.salesTax =  salestax;
        $scope.totalTotal =  total;
        return {
            total: total
         };

         
    }


//testing purposes only
$scope.debugDelete = function () { 
         delete $localStorage.cart;
    }

//Cart Item Action (edit/delete)
  $scope.cartitemAction = function (packageID, optionID, action) { 
    for(var i=0;i<Auth.setCart().cart.length;i++){
        if (Auth.setCart().cart[i].packageID == packageID){
                for(var y=0;y<Auth.setCart().cart[i].cart.length;y++){
                    if (Auth.setCart().cart[i].cart[y].$$hashKey == optionID)
                        if(action=='edit'){
                            var cartData = {id:packageID, desc:Auth.setCart().cart[i].packageDesc, cart:Auth.setCart().cart[i].cart[y]};
                            $scope.$broadcast('cartEdit', cartData);
                        }
                }
        }
    }
  }  


});

/**
 * Login Controller
 * Applied to modal
 * 
 * 
 */

app.controller('loginController', function ($rootScope, $scope, $modalInstance, $firebase, authObj, $http, dataFactory, Auth) {
    $scope.authObj = authObj;

    $scope.rootPath = myLocalized.root;

    


    //User Sign up
    $scope.signUp = function(signup) { 

        if (signup.password1 !== signup.password2) {
            $scope.signupError = "Passwords do not match."
        }else{
        userSignup(signup.firstname, signup.lastname,signup.email, signup.password1, signup.nonce);
        }

        function userSignup(fn, ln, em, pw, nonce) {

                $scope.loginLoad = true;
                dataFactory.userSignup(fn, ln, em, pw, nonce)
                    .success(function (user) {                        
                       if (user.status){
                            //set session
                            Auth.setUser(user);
                            $scope.userData = user;

                            //Hold if login validation is false
                            if (user !== "false"){
                                $rootScope.$broadcast('userOn', $scope.userData);
                                $modalInstance.dismiss('cancel');
                            }

                        }else{
                            $scope.signupError = user.message 
                        }
                        
                        $scope.loginLoad = false;
                        
                })
                    .error(function (error) {
                        
                });
            } 
    };


    //User Login Authentication
    $scope.credentials = {
        username: '',
        password: ''
    };

    //User Sign in
    $scope.login = function (credentials) {
         userAuth(credentials.username, credentials.password, myLocalized.nonce);

            function userAuth(un,pw,nonce) {
                $scope.loginLoad = true;
                dataFactory.userAuth(un,pw,nonce)
                    .success(function (user) {
                        if (user.status){
                            //set session
                            Auth.setUser(user);
                            $scope.userData = user;

                            //Hold if login validation is false
                            if (user !== "false"){
                                $rootScope.$broadcast('userOn', $scope.userData);
                                $modalInstance.dismiss('cancel');
                            }

                        }else{
                            $scope.loginError = user.message 
                        }
                        $scope.loginLoad = false;
                        


                })
                    .error(function (error) {
                        $scope.status = 'Unable to load customer data: ' + error.message;
                });
            }     
      
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

app.controller("mainController", function($scope, dataFactory) {

    getCategories();

    function getCategories() {
        $scope.pageLoad = true;
         dataFactory.getCategories()
                    .success(function (cats) {
                    $scope.categories = cats;
                    $scope.pageLoad = false;
                })
                    .error(function (error) {
                });

    }
});


/**
 * Cat State Controller
 * Applied to cat state (submenu recommendation)
 * 
 * 
 */

app.controller("catController", function($scope, $stateParams, dataFactory) {

    
    $scope.catID = $stateParams.funnelID; 

    getProducts($scope.catID);

    function getProducts(catID) {
        $scope.pageLoad = true;
         dataFactory.getProducts(catID)
                    .success(function (products) {
                    $scope.products = products;
                    $scope.pageLoad = false;
                })
                    .error(function (error) {
                });

    } 

});


/**
 * Product Single State Controller
 * Applied to cat state (submenu recommendation)
 * 
 * 
 */

app.controller("singleController", function($scope, $modal, $stateParams, dataFactory) {

    $scope.catID = $stateParams.funnelID; 

    $scope.singleID = $stateParams.singleID; 

    getSingle($scope.catID, $scope.singleID);

    function getSingle(catID, singleID) {
        $scope.pageLoad = true;
         dataFactory.getSingle(catID, singleID)
                    .success(function (singleID) {
                    $scope.singleData = singleID;
                    $scope.pageLoad = false;
                })
                    .error(function (error) {
                });

    }


    //Listener to open cart modal for editing
   $scope.$on('cartEdit', function(event, data) {
        $scope.openOrder('','',data);
    });



    //Open Order Modal and pass necessary vars
    $scope.openOrder = function (optionID, packageID, editCart) {  
        $modal.open({
            templateUrl: "package_order",
            backdrop: 'static',
            controller: 'packageModalController',
            resolve: {
                singleData: function () {
                    return optionID;            
                },
                packageData: function (){
                    return packageID;
                },
                cartAction: function (){
                    return editCart;
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
app.controller("packageModalController", function($scope, $rootScope, $modalInstance, singleData, packageData, dataFactory, cartAction) {
    $scope.model = { min: 1, max: 99, qty: 1};
    $scope.singleData = singleData;
    $scope.packageData = packageData;
    $scope.cartAction = cartAction;

    if (!cartAction)
    getOption($scope.singleData, $scope.packageData);

    function getOption(singleData, packageData) {
        $scope.pageLoad = true;
         dataFactory.getOption(singleData, packageData)
                    .success(function (singleID) {
                    $scope.singleData = singleID;
                    $scope.pageLoad = false;
                })
                    .error(function (error) {
                });

    }

    //close modal
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    //cart submit action
    $scope.cartSubmit = function (packageID, vendorName, packageDesc, itemName, itemID, itemQty, itemPrice, itemNotes) {
        var cartAction = { open: "openCart", packageID:packageID, vendorName: vendorName, packageDesc:packageDesc, itemName:itemName, itemID:itemID, itemQty:itemQty, itemPrice:itemPrice, itemNotes:itemNotes};
        $modalInstance.dismiss('cancel');
        $rootScope.$broadcast('cartSubmitOpen', cartAction);
    }

    //cart update action
    $scope.cartUpdate = function (packageID, itemID, itemQty, itemNotes) {
        var cartAction = { open: "openCart", action:"update", packageID:packageID, itemID:itemID, itemQty:itemQty, itemNotes:itemNotes};
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