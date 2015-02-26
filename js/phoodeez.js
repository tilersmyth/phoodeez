//thumbs
// var resizing = function(a) {
//     var thumbWidth = a.width();
//     a.height(thumbWidth);
// };
// resizing($(".option-thumb"));
// $( window ).resize(function() {
//     resizing($(".option-thumb"));
// });


//dropdown 
$(document).ready(function() {
	$('#cart-dropdown').on('show.bs.dropdown', function () {
  			$( "#option_wrapper" ).addClass( "col-sm-8" );
  			$( "#cart_dropdown_buffer" ).addClass( "col-sm-4" );
	})

	$('#cart-dropdown').on('hide.bs.dropdown', function () {
  			$( "#option_wrapper" ).removeClass( "col-sm-8" );
  			$( "#cart_dropdown_buffer" ).removeClass( "col-sm-4" );
	})

});