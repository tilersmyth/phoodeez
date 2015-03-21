<?php
define('WP_USE_THEMES', false);
require('./wp-blog-header.php');

//what we tryin to do?
$method = $_GET["method"];

//Initiate checkout
if($method == 'initiate'){ 
  $postdata = file_get_contents("php://input");
  $request = json_decode($postdata);

   //build order data
  $order_data = array(
      'post_name'     => 'order-' . date('M-d-Y-hi-a'), //'order-jun-19-2014-0648-pm'
      'post_type'     => 'shop_order',
      'post_title'    => 'Order &ndash; ' . date('F d, Y @ h:i A'), //'June 19, 2014 @ 07:19 PM'
      'post_status'   => 'wc-pending',
      'ping_status'   => 'closed',
      'post_excerpt'  => $request->cartData[0]->vendorName,
      'post_author'   => 1,
      'post_password' => uniqid( 'order_' ),   // Protects the post just in case
      'post_date'     => date('Y-m-d H:i:s e'), //'order-jun-19-2014-0648-pm'
      'comment_status' => 'open'
  );

  // create order
  $order_id = wp_insert_post( $order_data, true );

  
  if ( is_wp_error( $order_id ) ) {

    $order->errors = $order_id;

  } else {

    add_post_meta($order_id, '_customer_user', $request->userID, true);

  }
 
  echo json_encode($order_id);

  exit;
}

//Change order status
if($method == 'complete'){ 
  $cartID = $_GET["cartID"];
  $checkoutAction = $_GET["action"];

  if($checkoutAction == 'confirm'){
    $update_checkout = array(
        'ID'           => $cartID,
        'post_status' => 'wc-completed'
    );

    wp_update_post( $update_checkout );
  } 

  if($checkoutAction == 'delete'){
    wp_delete_post($cartID);
  } 


   echo json_encode($checkoutAction);
  exit;
}