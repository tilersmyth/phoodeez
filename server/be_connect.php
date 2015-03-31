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

//login
if($method == 'login'){ 
      $username = $_GET["username"];
      $password = $_GET["password"];

      $creds = array();
      $creds['user_login'] = $username;
      $creds['user_password'] = $password;
      $creds['remember'] = false;
      $user = wp_signon( $creds, false );
      if ( is_wp_error($user) ){
      echo json_encode(array('status'=>false, 'message'=>$user->get_error_message())); exit;
       // echo $user->get_error_message();
      } 

      $user_info = get_userdata($user->ID);

      $first_name = $user_info->first_name;
      $last_name = $user_info->last_name;
      $user_email = $user_info->user_email;
      $company = get_user_meta($user->ID, 'billing_company');
      $address = get_user_meta($user->ID, 'shipping_address_1');

      $has_address = (!empty($address[0])) ? true : false;

      echo json_encode(array('status'=>true, 'id'=>$user->ID, 'first_name'=>$first_name, 'last_name'=>$last_name, 'user_email'=>$user_email, 'company'=>$company[0], 'address'=>$has_address));
     exit;
} //end login

//signup
if($method == 'signup'){ 
      $firstName = $_GET["firstName"];
      $lastName = $_GET["lastName"];
      $company = $_GET["company"];
      $eMail = $_GET["eMail"];
      $passWord = $_GET["passWord"];

      if( !email_exists( $eMail ) ) {

        $wp_user_id = wp_create_user($eMail, $passWord, $eMail);
        $user = new WP_User( $wp_user_id );
        $user->set_role( 'customer' );
        update_user_meta( $wp_user_id, 'first_name', $firstName ); 
        update_user_meta( $wp_user_id, 'last_name', $lastName );
        update_user_meta( $wp_user_id, 'billing_company', $company );

        echo json_encode(array('status'=>true, 'id'=>$wp_user_id, 'first_name'=>$firstName, 'last_name'=>$lastName, 'user_email'=>$eMail));

      }else{
        echo json_encode(array('status'=>false, 'message'=>__('This email is associated with an existing account.')));
      }

      
     exit;
} //end signup




?>