<?php
/*
 * Load in custom javascript files
 * and stylesheets
 */

show_admin_bar( false );

function custom_mtypes( $m ){
    $m['svg'] = 'image/svg+xml';
    $m['svgz'] = 'image/svg+xml';
    return $m;
}
add_filter( 'upload_mimes', 'custom_mtypes' );

function my_scripts() {


    wp_enqueue_style( 'bootstrap-style', get_template_directory_uri() . '/css/bootstrap.min.css' );

    wp_enqueue_style( 'main-styles', get_stylesheet_uri() );


    wp_register_script(
        'angularjs',
        'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.13/angular.min.js',
        array(),
        null,
        false
    );

    wp_register_script(
        'angularjs-animate',
        get_template_directory_uri() . '/js/angular-animate.min.js',
        array(),
        null,
        false
    );

    wp_register_script(
        'angularjs-sanitize',
        get_template_directory_uri() . '/js/angular-sanitize.min.js',
        array(),
        null,
        false
    );

    wp_register_script(
        'angularjs-firebase',
        'https://cdn.firebase.com/js/client/2.1.2/firebase.js',
        array(),
        null,
        false
    );

    wp_register_script(
        'angularjs-angularfire',
        'https://cdn.firebase.com/libs/angularfire/0.9.2/angularfire.min.js',
        array(),
        null,
        false
    );

    wp_register_script(
        'angularjs-bootstrap',
        get_template_directory_uri() . '/js/ui-bootstrap-tpls-0.12.0.min.js',
        array(),
        null,
        false
    );

    wp_register_script(
        'angularjs-route',
        get_template_directory_uri() . '/js/ui-router.js',
        array(),
        null,
        false
    );

    wp_register_script(
        'angularjs-controllers',
        get_template_directory_uri() . '/app/controllers/controllers.js',
        array(),
        null,
        false
    );

    wp_register_script(
        'angularjs-services',
        get_template_directory_uri() . '/app/services/factory.js',
        array(),
        null,
        false
    );

    wp_register_script(
        'angularjs-directives',
        get_template_directory_uri() . '/app/directives/directives.js',
        array(),
        null,
        false
    );

    wp_register_script(
        'angularjs-ngstorage',
        get_template_directory_uri() . '/js/ngStorage.js',
        array(),
        null,
        false
    );
    
    // Vendor Libs
    wp_enqueue_script('angularjs');
    wp_enqueue_script('angularjs-animate');
    wp_enqueue_script('angularjs-firebase');
    wp_enqueue_script('angularjs-angularfire');
    wp_enqueue_script('angularjs-sanitize');
    wp_enqueue_script('angularjs-ngstorage');


    // UI Libs
    wp_enqueue_script('angularjs-bootstrap');

    // App Libs
    wp_enqueue_script(
        'my-scripts',
        get_template_directory_uri() . '/app/app.js',
        array( 'angularjs', 'angularjs-firebase', 'angularjs-angularfire', 'angularjs-route', 'angularjs-bootstrap', 'angularjs-animate', 'angularjs-sanitize','angularjs-ngstorage')
    );
    wp_enqueue_script('angularjs-route');
    wp_enqueue_script('angularjs-controllers');
    wp_enqueue_script('angularjs-services');
    wp_enqueue_script('angularjs-directives');
    
    wp_localize_script(
        'my-scripts',
        'myLocalized',
        array(
            'partials' => trailingslashit( get_template_directory_uri() ) . 'app/partials/',
            'root' => trailingslashit( get_template_directory_uri() ),
            'nonce' => wp_create_nonce( 'be_nonce' )
            )
    );
}

add_action( 'wp_enqueue_scripts', 'my_scripts' );