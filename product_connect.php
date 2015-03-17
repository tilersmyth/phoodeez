<?php
define('WP_USE_THEMES', false);
require('./wp-blog-header.php');

//what we tryin to do?
$method = $_GET["method"];

//Get main categories
if($method == 'category'){ 
      
      $taxonomy = 'product_cat';
      $tax_terms = get_terms($taxonomy);
      foreach ($tax_terms as $tax_term){

        
        $thumbnail_id = get_woocommerce_term_meta( $tax_term->term_id, 'thumbnail_id', true );
        $image = wp_get_attachment_url( $thumbnail_id );
        $tax_term->img_path = $image;

      }

      echo json_encode($tax_terms);

     exit;
} //end main categories


?>