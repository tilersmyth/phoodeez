
app.factory('dataFactory', ['$http', function($http) {

    var urlBase = myLocalized.root;

    var dataFactory = {};

    dataFactory.userAuth = function (un, pw, nonce) {
        return $http.get(urlBase+'/server/be_connect.php?method=login&username='+un+'&password='+pw+'&tid='+nonce);
    };

    dataFactory.userSignup = function (fn, ln, em, pw, nonce) {
        return $http.get(urlBase+'/server/be_connect.php?method=signup&firstName='+fn+'&lastName='+ln+'&eMail='+em+'&passWord='+pw+'&tid='+nonce);
    };

    dataFactory.getCategories= function () {
        return $http.get(urlBase+'/server/product_connect.php?method=category');
    };

    dataFactory.getProducts = function (catID) {
        return $http.get(urlBase+'/server/product_connect.php?method=product&catID='+catID);
    };

    dataFactory.getSingle = function (catID, singleID) {
        return $http.get(urlBase+'/server/product_connect.php?method=single&catID='+catID+'&singleID='+singleID);
    };

    dataFactory.getOption = function (optionID, packageData) {
        return $http.get(urlBase+'/server/product_connect.php?method=option&optionID='+optionID+'&packageData='+packageData);
    };

    dataFactory.initiateCheckout = function (cartData) {
        return $http.post(urlBase+'/server/checkout_connect.php?method=initiate', cartData);
    };

    dataFactory.completeCheckout = function (cartData, action) {
        return $http.post(urlBase+'/server/checkout_connect.php?method=complete&cartID='+cartData+'&action='+action);
    };

    return dataFactory;
}]);


//set auth session
app.factory('Auth', function($localStorage, $sessionStorage){
var user; var cart;

return{
    setUser : function(aUser){
        if(aUser !== "false"){
            user = $localStorage.$default({
              x: aUser
            });
        }
       return(user.x)? user.x : false;
    },
    setCart : function(sCart){
            cart = $localStorage.$default({
              y: sCart
            });
       return cart.y;
    }
  }
})
