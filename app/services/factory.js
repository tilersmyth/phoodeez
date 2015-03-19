
app.factory('dataFactory', ['$http', function($http) {

    var urlBase = myLocalized.root;

    var dataFactory = {};

    dataFactory.userAuth = function (un, pw, nonce) {
        return $http.get(urlBase+'/be_connect.php?method=login&username='+un+'&password='+pw+'&tid='+nonce);
    };

    dataFactory.userSignup = function (fn, ln, em, pw, nonce) {
        return $http.get(urlBase+'/be_connect.php?method=signup&firstName='+fn+'&lastName='+ln+'&eMail='+em+'&passWord='+pw+'&tid='+nonce);
    };

    dataFactory.getCategories= function () {
        return $http.get(urlBase+'/product_connect.php?method=category');
    };

    dataFactory.getProducts = function (catID) {
        return $http.get(urlBase+'/product_connect.php?method=product&catID='+catID);
    };

    dataFactory.getSingle = function (catID, singleID) {
        return $http.get(urlBase+'/product_connect.php?method=single&catID='+catID+'&singleID='+singleID);
    };

    dataFactory.getOption = function (optionID, packageData) {
        return $http.get(urlBase+'/product_connect.php?method=option&optionID='+optionID+'&packageData='+packageData);
    };

    return dataFactory;
}]);


//set auth session
app.factory('Auth', function($localStorage){
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
              cart: sCart
            });
       return cart;
    }
  }
})
