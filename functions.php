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

    wp_enqueue_style( 'bootstrap-datetimepicker', get_template_directory_uri() . '/css/datetimepicker.css' );

    wp_enqueue_style( 'bootstrap-calendar', get_template_directory_uri() . '/css/angular-bootstrap-calendar.min.css' );

    wp_enqueue_style( 'main-styles', get_stylesheet_uri() );

    wp_register_script(
        'jquery',
        'https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js',
        array(),
        null,
        false
    );

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
        'moment',
        get_template_directory_uri() . '/js/moment.min.js',
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

    wp_register_script(
        'datetimepicker',
        get_template_directory_uri() . '/js/datetimepicker.js',
        array(),
        null,
        false
    );

    wp_register_script(
        'bootstrap-calendar',
        get_template_directory_uri() . '/js/angular-bootstrap-calendar-tpls.js',
        array(),
        null,
        false
    );

    // wp_register_script(
    //     'calendar-mwlCalendar',
    //     get_template_directory_uri() . '/app/directives/mwlCalendar.js',
    //     array(),
    //     null,
    //     false
    // );

    // wp_register_script(
    //     'calendar-truncateEventTitle',
    //     get_template_directory_uri() . '/app/filters/truncateEventTitle.js',
    //     array(),
    //     null,
    //     false
    // );

    // wp_register_script(
    //     'calendar-calendarHelper',
    //     get_template_directory_uri() . '/app/services/calendarHelper.js',
    //     array(),
    //     null,
    //     false
    // );

    // wp_register_script(
    //     'calendar-moment',
    //     get_template_directory_uri() . '/app/services/moment.js',
    //     array(),
    //     null,
    //     false
    // );

    // wp_register_script(
    //     'calendar-mwlCollapseFallback',
    //     get_template_directory_uri() . '/app/directives/mwlCollapseFallback.js',
    //     array(),
    //     null,
    //     false
    // );

    // wp_register_script(
    //     'calendar-mwlCalendarYear',
    //     get_template_directory_uri() . '/app/directives/mwlCalendarYear.js',
    //     array(),
    //     null,
    //     false
    // );

    // wp_register_script(
    //     'calendar-mwlCalendarMonth',
    //     get_template_directory_uri() . '/app/directives/mwlCalendarMonth.js',
    //     array(),
    //     null,
    //     false
    // );

    // wp_register_script(
    //     'calendar-mwlCalendarWeek',
    //     get_template_directory_uri() . '/app/directives/mwlCalendarWeek.js',
    //     array(),
    //     null,
    //     false
    // );
    
    // wp_register_script(
    //     'calendar-mwlCalendarDay',
    //     get_template_directory_uri() . '/app/directives/mwlCalendarDay.js',
    //     array(),
    //     null,
    //     false
    // );

    
    // Vendor Libs
    wp_enqueue_script('jquery');
    wp_enqueue_script('angularjs');
    wp_enqueue_script('moment');
    wp_enqueue_script('angularjs-animate');
    wp_enqueue_script('angularjs-sanitize');
    wp_enqueue_script('angularjs-ngstorage');

    // UI Libs
    wp_enqueue_script('angularjs-bootstrap');
    wp_enqueue_script('datetimepicker');
    wp_enqueue_script('bootstrap-calendar');

    // App Libs
    wp_enqueue_script(
        'my-scripts',
        get_template_directory_uri() . '/app/app.js',
        array( 'angularjs', 'angularjs-route', 'angularjs-bootstrap', 'angularjs-animate', 'angularjs-sanitize','angularjs-ngstorage', 'datetimepicker','bootstrap-calendar')
    );
    wp_enqueue_script('angularjs-route');
    wp_enqueue_script('angularjs-controllers');
    wp_enqueue_script('angularjs-services');

    //Calendar 
    // wp_enqueue_script('calendar-mwlCalendar');
    // wp_enqueue_script('calendar-truncateEventTitle');
    // wp_enqueue_script('calendar-calendarHelper');
    // wp_enqueue_script('calendar-moment');
    // wp_enqueue_script('calendar-mwlCollapseFallback');
    // wp_enqueue_script('calendar-mwlCalendarYear');
    // wp_enqueue_script('calendar-mwlCalendarMonth');
    // wp_enqueue_script('calendar-mwlCalendarWeek');
    // wp_enqueue_script('calendar-mwlCalendarDay');

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

// add restaurant feature to woo
add_action('init', 'wpse_74054_add_author_woocommerce', 999 );
function wpse_74054_add_author_woocommerce() {
    add_post_type_support( 'product', 'author' );
}