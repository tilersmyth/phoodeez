// Order incrementer
app.directive('orderQty', function(){
  return    {
    restrict:'E',
    scope:{
      min: '=',
      max:'=',
      qty:'='
    },
    template: 
    '<div class="form-group">'+
    '<button class="btn btn-primary" ng-click="qty = qty - 1" ng-disabled="qty <= min"><span class="glyphicon glyphicon-minus" aria-hidden="true"></span></button>' +
	'<input type="text" class="form-control" value="{{qty}}">' +
	'<button class="btn btn-primary" ng-click="qty = qty + 1" ng-disabled="qty >= max"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button>' +
	'</div>'
    }
});