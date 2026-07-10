<?php

namespace TSJIPPY\CONTENTFILTER;

use TSJIPPY;
use WP_Error;

if (! defined('ABSPATH')) exit;

add_action('rest_api_init', __NAMESPACE__ . '\restApiInit');
function restApiInit()
{
    // Get all roles 
    register_rest_route(
        TSJIPPY\RESTAPIPREFIX . '/content_filter',
        '/get_roles',
        array(
            'methods'     => 'POST',
            'callback'     => function ($wpRestRequest) {
                require_once ABSPATH . 'wp-admin/includes/user.php';
                
                $array  = [];
                foreach( get_editable_roles() as $key => $data){
                    $array[] = [
                        'value' => $key,
                        'label' => $data['name']
                    ];
                }

                return $array;
            },
            'permission_callback' => function(){
                return current_user_can('edit_users');
            }
        )
    );

    // Get allowed filters
    register_rest_route(
        TSJIPPY\RESTAPIPREFIX . '/content_filter',
        '/get_allowed_php_filters',
        array(
            'methods'     => 'POST',
            'callback'     => __NAMESPACE__.'\getAllowedPhpBlockFilters',
            'permission_callback' => function(){
                return current_user_can('edit_posts');
            }
        )
    );
}

//Secure the rest api
add_filter('rest_authentication_errors', __NAMESPACE__ . '\authenticationErrors');
/**
 * Checks if the user is logged in for rest api calls. If not, an error is returned. Some exceptions can be made by using the tsjippy-allowed-rest-api-urls filter.
 *
 * @since 10.1.0
 *
 * @param WP_Error|bool $result The result of the authentication check. Either true if the request is authenticated, false if not, or a WP_Error object if an error has occurred.
 *
 * @return WP_Error|bool The result of the authentication check. Either true if the request is authenticated, false if not, or a WP_Error object if an error has occurred.
 */
function authenticationErrors($result)
{
    // If a previous authentication check was applied, pass that result along without modification.
    if (true === $result || is_wp_error($result)) {
        return $result;
    }

    // No authentication has been performed yet return an error if user is not logged in, exception for some rest api calls
    if (is_user_logged_in() || isAllowedRestApiUrl()) {
        // Our custom authentication check should have no effect on logged-in requests
        return $result;
    } else {
        $loginUrl     = wp_login_url(TSJIPPY\getCurrentUrl());

        $message    = apply_filters('tsjippy-content-filter-rest-not-logged-in-message', "You should be logged in to perform this request.<br>Login <a href='$loginUrl'>here</a>");

        $data        = apply_filters('tsjippy-content-filter-rest-not-logged-in-data', array('status' => rest_authorization_required_code()));

        return new WP_Error('content filter', $message, $data);
    }
}

/**
 * Check if the current rest api request is allowed without authentication
 *
 * @return bool        True if the request is allowed, false otherwise
 */
function isAllowedRestApiUrl()
{
    $urls    = [
        'wp-mail-smtp/v1',
        TSJIPPY\RESTAPIPREFIX . '/fetch_nonce'
    ];

    $urls    = apply_filters('tsjippy-allowed-rest-api-urls', $urls);

    foreach ($urls as $url) {
        // phpcs:ignore
        if (str_contains($_SERVER['REQUEST_URI'] ?? '', $url)) {
            return true;
        }
    }

    return false;
}

function getAllowedPhpBlockFilters(){
    /**
     * Filters the functions that are allowed to run to determine block visiibility
     * 
     * @param   $functionNames  Array containing the full qualified function names as indexes
     */
    return apply_filters('tsjippy-allowed-block-filter-functions', ['is_tax', 'is_archive', 'is_category', 'is_home', 'has_post_thumbnail', 'is_front_page']);
}