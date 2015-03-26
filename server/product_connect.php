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
      $_pf = new WC_Product_Factory();
      $bundled_packages = array();
      foreach ($packages as $package){
         $package_meta = get_post_meta( $package->ID, '_bundle_data' );
         $_product = $_pf->get_product($package->ID);
         $thumbnail_id = get_post_thumbnail_id( $package->ID );
         $image = wp_get_attachment_url( $thumbnail_id );
         $_product->img_path = $image;
         if ($package_meta){
            $bundled_packages[] = $_product;
         }
      } 

      echo json_encode(array('catName' => $cat_name, 'packages' => $bundled_packages));

     exit;
} //end Products


//Get Single Products
if($method == 'single'){ 
      
          
      //1. Get Cat Info
      $categoryID = $_GET["catID"];
      $term = get_term_by( 'id', $categoryID, 'product_cat', 'ARRAY_A' );
      $cat_name = $term['name'];    

      //2. Get Package Info  
      $singleID = $_GET["singleID"];
      $_pf = new WC_Product_Factory();  
      $_product = $_pf->get_product($singleID);
      $thumbnail_id = get_post_thumbnail_id( $singleID );
      $image = wp_get_attachment_url( $thumbnail_id );

      // $product = get_product( $singleID );
      // $children = $product->get_children();


      echo json_encode(array('catName' => $cat_name,'package' => $_product,'package_thumb' => $image));

     exit;
} //end Single Products


//Get Option
if($method == 'option'){ 
      
      $optionID = $_GET["optionID"];
      $packageData = $_GET["packageData"];
      $_pf = new WC_Product_Factory();  
      $_product = $_pf->get_product($packageData);
      $optionData = $_product->bundle_data[$optionID];

      echo json_encode(array('package' => $_product,'option' => $optionData));

     exit;
} //end Option


?>