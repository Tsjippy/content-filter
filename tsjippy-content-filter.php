<?php
namespace SIM\CONTENTFILTER;

/**
 * Plugin Name:  		Tsjippy Content Filter
 * Description:  		This module filters all content, excluding content with the public category, to be only available to logged-in users.
 * Version:      		1.0.0
 * Author:       		Ewald Harmsen
 * AuthorURI:			harmseninnigeria.nl
 * Requires at least:	6.3
 * Requires PHP: 		8.3
 * Tested up to: 		6.9
 * Plugin URI:			https://github.com/Tsjippy/comments/
 * Tested:				6.9
 * TextDomain:			tsjippy
 * License: GPLv2 or later
 * License URI: https://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 *
 * @author Ewald Harmsen
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$pluginData = get_plugin_data(__FILE__, false, false);

// Define constants
define(__NAMESPACE__ .'\PLUGIN', plugin_basename(__FILE__));
define(__NAMESPACE__ .'\PLUGINPATH', __FILE__);
define(__NAMESPACE__ .'\PLUGINVERSION', $pluginData['Version']);
define(__NAMESPACE__ .'\SETTINGS', get_option('sim_comments_settings', []));

// run on activation
add_action( 'activated_plugin', function ( $plugin ) {
    if( $plugin != PLUGIN ) {
        return;
    }

    //Create a public category if it does not exist
	wp_create_category('Public');
	wp_create_category('Confidential');
} );