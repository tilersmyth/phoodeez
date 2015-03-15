
app.factory('dataFactory', ['$http', function($http) {

    var urlBase = myLocalized.root;

    var dataFactory = {};

    dataFactory.userAuth = function (un, pw, nonce) {
        return $http.get(urlBase+'/be_connect.php?method=login&username='+un+'&password='+pw+'&tid='+nonce);
    };

    dataFactory.userSignup = function (fn, ln, em, pw, nonce) {
        return $http.get(urlBase+'/be_connect.php?method=signup&firstName='+fn+'&lastName='+ln+'&eMail='+em+'&passWord='+pw+'&tid='+nonce);
    };

    dataFactory.getCustomer = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    dataFactory.insertCustomer = function (cust) {
        return $http.post(urlBase, cust);
    };

    dataFactory.updateCustomer = function (cust) {
        return $http.put(urlBase + '/' + cust.ID, cust)
    };

    dataFactory.deleteCustomer = function (id) {
        return $http.delete(urlBase + '/' + id);
    };

    dataFactory.getOrders = function (id) {
        return $http.get(urlBase + '/' + id + '/orders');
    };

    return dataFactory;
}]);


app.factory('Auth', function($localStorage){
var user;

return{
    setUser : function(aUser){
        if(aUser !== "false"){
            user = $localStorage.$default({
              x: aUser
            });
        }

       return(user.x)? user.x : false;
    }
  }
})