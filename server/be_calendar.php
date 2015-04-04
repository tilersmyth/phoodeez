<?php
define('WP_USE_THEMES', false);
require('./wp-blog-header.php');

//Verify nonce
// $nonce = $_GET["tid"];
// if ( ! wp_verify_nonce( $nonce, 'be_nonce' ) ){
//         exit(false);
// }

//what we tryin to do?
$method = $_GET["method"];

//pull
if($method == 'pull'){ 
    
  $userID = $_GET["user"];

  $args = array(
  'post_type' => 'shop_order',
  'post_status' => 'wc-completed',
  'post_author' => $userID,
  'meta_key' => '_customer_user',
  'posts_per_page' => '-1'
  );
  $my_query = new WP_Query($args);

  $customer_orders = $my_query->posts;

  $order_array = array();  
  foreach ($customer_orders as $order){
    $woo_order = new WC_Order($order->ID);
    $woo_order->order_date = strtotime($woo_order->order_date);

    $order_array[] = $woo_order;
  }

  echo json_encode(array('data' => $order_array));

    exit;
} //end pull

?>