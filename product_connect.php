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


//Get Products
if($method == 'product'){ 
      
      $categoryID = $_GET["catID"];
      $args = array(
          'post_type'             => 'product',
          'post_status'           => 'publish',
          'ignore_sticky_posts'   => 1,
          'tax_query'             => array(
              array(
                  'taxonomy'      => 'product_cat',
                  'field' => 'term_id',
                  'terms'         => $categoryID,
                  'operator'      => 'IN'
              )
          )
      );

      $term = get_term_by( 'id', $categoryID, 'product_cat', 'ARRAY_A' );
      $cat_name = $term['name'];
      
      $results = new WP_Query( $args );
      
      $packages = $results->posts;

      $bundled_packages = array();
      foreach ($packages as $package){
         $package_meta = get_post_meta( $package->ID, '_bundle_data' );
         $thumbnail_id = get_post_thumbnail_id( $package->ID );
         $image = wp_get_attachment_url( $thumbnail_id );
         $package->img_path = $image;
         if ($package_meta){
            $bundled_packages[] = $package;
         }
      } 



      echo json_encode(array('catName' => $cat_name, 'packages' => $bundled_packages));

     exit;
} //end Products


?>