<?php

namespace TSJIPPY\CONTENTFILTER;

/**
 * Plugin Name:          Tsjippy Content Filter
 * Description:          This plugin filters all content, excluding content with the public category, to be only available to logged-in users.
 * Version:              10.4.9
 * Author:               Ewald Harmsen
 * AuthorURI:            harmseninnigeria.nl
 * Requires at least:    6.3
 * Requires PHP:         8.3
 * Tested up to:         7.0
 * Plugin URI:           https://github.com/Tsjippy/contentfilter/
 * Tested:               7.0
 * TextDomain:           tsjippy
 * Requires Plugins:    
 * License: GPLv2 or later
 * License URI: https://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 *
 * @author Ewald Harmsen
 */
if (! defined('ABSPATH')) {
    exit;
}

// Load shared code
if(file_exists(__DIR__  . '/shared-functionality/loader.php')){
    require_once(__DIR__  . '/shared-functionality/loader.php');
}

// Define constants
define(__NAMESPACE__ . '\PLUGIN', plugin_basename(__FILE__));
define(__NAMESPACE__ . '\PLUGINPATH', __DIR__ . '/');
define(__NAMESPACE__ . '\PLUGINVERSION', get_plugin_data(__FILE__, false, false)['Version']);
define(__NAMESPACE__ . '\PLUGINSLUG', str_replace('tsjippy-', '', basename(__FILE__, '.php')));
define(__NAMESPACE__ . '\SETTINGS', get_option('tsjippy_content-filter_settings', []));

// run right before activation
register_activation_hook(__FILE__, function () {
    //Create a public category if it does not exist
    wp_create_category('Public');
    wp_create_category('Confidential');

    if(file_exists(__DIR__  . '/shared-functionality/loader.php')){
        require_once(__DIR__  . '/shared-functionality/loader.php');
    }

    if(function_exists('TSJIPPY\activate')){
        \TSJIPPY\activate();
    }
});