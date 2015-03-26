<?php
define('WP_USE_THEMES', false);
require('./wp-blog-header.php');

//what we tryin to do?
$method = $_GET["method"];

//profile
if($method == 'profile'){ 
   $userID = $_GET["userID"]; 
   $user_info = get_userdata($userID);

   $userInfo['ID'] = $userID;
   $userInfo['name']['user_fn'] = get_user_meta($userID, 'first_name');
   $userInfo['name']['user_ln'] = get_user_meta($userID, 'last_name');

   $userInfo['username']['email'] = $user_info->data->user_login;

     echo json_encode($userInfo); 
     exit;
} //end profile


if($method == 'name'){

  $userID = $_GET["userID"];
  $postdata = file_get_contents("php://input");
  $request = json_decode($postdata);


  update_user_meta( $userID, 'first_name', $request->user_fn[0] );
  update_user_meta( $userID, 'last_name', $request->user_ln[0] );

  echo json_encode(array('action' => $method, 'data' => $request));

  exit;
}

if($method == 'order'){

  $userID = $_GET["userID"];

  $args = array(
  'post_type' => 'shop_order',
  'post_status' => 'wc-completed',
  'post_author' => $userID,
  'meta_key' => '_customer_user',
  'posts_per_page' => '-1'
  );
  $my_query = new WP_Query($args);

  $customer_orders = $my_query->posts;

  echo json_encode(array('action' => $method, 'data' => $customer_orders));

  exit;
}

?>