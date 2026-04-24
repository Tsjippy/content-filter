<?php
namespace SIM\CONTENTFILTER;

if ( ! defined( 'ABSPATH' ) ) exit;

// run on activation
add_action( 'activated_plugin', function ( $plugin ) {
    if( $plugin != PLUGIN ) {
        return;
    }

    //Create a public category if it does not exist
	wp_create_category('Public');
	wp_create_category('Confidential');
} );