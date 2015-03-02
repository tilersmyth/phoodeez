
app.factory('UserDataStorage', function(){
    return {
        data: "",
        loading: true,
        update: function(a) {
            this.data = a;
        },
        isLoading: function(a) {
            this.loading = a;
        }
    };
});


app.factory('postEmailForm', function($http) {
    return {
        postEmail: function(data) {
            console.log("fire email");
        }
    }
});