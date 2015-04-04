<?php
define('WP_USE_THEMES', false);
require('./wp-blog-header.php');

//what we tryin to do?
$method = $_GET["method"];

//Get main categories
if($method == 'category'){ 
      $args = array('parent' => 24); 
      $tax_terms = get_terms('product_cat', $args);

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
            $dietary = array();
            $bundled_packages[] = $_product;
            foreach ($_product->bundle_data as $poppycock){
              $optionID = $poppycock['product_id'];  
                $tags = get_the_terms($optionID , 'product_tag' );
                  if(!empty($tags)){
                  foreach($tags as $tag){
                      $long_name = substr($tag->name, strpos($tag->name, ":") + 1); 
                      $short_name = substr($tag->name, 0, strpos($tag->name, ':'));
                      $dietary[$short_name] = $long_name;
                  }}
            }
           $_product->dietz = array_unique($dietary);
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


      //3. Get Vendor Add-ons

      $author = $_product->post->post_author;
      $args = array(
          'author' => $author,
          'post_type'             => 'product',
          'post_status'           => 'publish',
          'ignore_sticky_posts'   => 1,
          'tax_query'             => array(
              array(
                  'taxonomy'      => 'product_cat',
                  'field' => 'term_id',
                  'terms'         => '25',
                  'operator'      => 'IN'
              )
          )
      );
      $query = new WP_Query($args);

      $query->posts;
      $addOns = array();
      foreach ($query->posts as $addOn){
         $price = get_post_meta( $addOn->ID, '_regular_price');
         $option = $_pf->get_product($addOn->ID);
         $option->price = $price;
         $addOns[] = $option;
      } 

      echo json_encode(array('catName' => $cat_name,'package' => $_product,'package_thumb' => $image, 'addons'=>$addOns));

     exit;
} //end Single Products


//Get Option
if($method == 'option'){ 
      $prodAction = $_GET["action"];
      $optionID = $_GET["optionID"];
      $packageData = $_GET["packageData"];  
      $_pf = new WC_Product_Factory();  
      $_product = $_pf->get_product($packageData);

      if($prodAction !== 'addOns'){
      $optionData = $_product->bundle_data[$optionID];
      }else{
      $price = get_post_meta( $optionID, '_regular_price');
      $optionData = $_pf->get_product($optionID); 
      $optionData->price = $price;
      }

      echo json_encode(array('package' => $_product,'option' => $optionData, 'addons'=>$prodAction  ));

     exit;
} //end Option


?>