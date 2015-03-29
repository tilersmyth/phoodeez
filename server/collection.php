<?php
define('WP_USE_THEMES', false);
require('./wp-blog-header.php');

//what we tryin to do?
$method = $_GET["method"];

//information
if($method == 'information'){ 
   
    $data = file_get_contents("php://input");
    $request = json_decode($data);

    //update user meta
    update_user_meta( $request->information->ID, 'first_name', $request->information->firstName );
    update_user_meta( $request->information->ID, 'last_name', $request->information->lastName );
    update_user_meta( $request->information->ID, 'billing_phone', $request->information->phone );
    update_user_meta( $request->information->ID, 'billing_company', $request->information->company );
    update_user_meta( $request->information->ID, 'shipping_address_1', $request->information->address1 );   
    update_user_meta( $request->information->ID, 'shipping_address_2', $request->information->address2 );
    update_user_meta( $request->information->ID, 'shipping_city', $request->information->city );
    update_user_meta( $request->information->ID, 'shipping_state', $request->information->selectedState );    
    update_user_meta( $request->information->ID, 'shipping_postcode', $request->information->zipCode );
    update_user_meta( $request->information->ID, 'description', $request->information->special );               

    echo json_encode($request->information);
     exit;
} //end information

?>