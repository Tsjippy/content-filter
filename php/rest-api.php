<?php
namespace TSJIPPY\CONTENTFILTER;
use TSJIPPY;
use WP_Error;

//Secure the rest api
add_filter( 'rest_authentication_errors', __NAMESPACE__.'\authenticationErrors');
/**
 * Checks if the user is logged in for rest api calls. If not, an error is returned. Some exceptions can be made by using the tsjippy_allowed_rest_api_urls filter.
 * 
 * @since 10.1.0
 * 
 * @param WP_Error|bool $result The result of the authentication check. Either true if the request is authenticated, false if not, or a WP_Error object if an error has occurred.
 * 
 * @return WP_Error|bool The result of the authentication check. Either true if the request is authenticated, false if not, or a WP_Error object if an error has occurred.
 */
function authenticationErrors( $result ) {
    // If a previous authentication check was applied, pass that result along without modification.
    if ( true === $result || is_wp_error( $result ) ) {
        return $result;
    }
    
    // No authentication has been performed yet return an error if user is not logged in, exception for some rest api calls
    if ( is_user_logged_in() || isAllowedRestApiUrl()) {
		// Our custom authentication check should have no effect on logged-in requests
		return $result;
    }else{
		$loginUrl 	= wp_login_url(TSJIPPY\getCurrentUrl());

		$message	= apply_filters('tsjippy-content-filter-rest-not-logged-in-message', "You should be logged in to perform this request.<br>Login <a href='$loginUrl'>here</a>");

		$data		= apply_filters('tsjippy-content-filter-rest-not-logged-in-data', array( 'status' => rest_authorization_required_code() ));

		return new WP_Error( 'content filter', __( $message ), $data );
	}
}

function isAllowedRestApiUrl(){
	$urls	= [
		'wp-mail-smtp/v1',
		RESTAPIPREFIX.'/fetch_nonce'
	];

	$urls	= apply_filters('tsjippy_allowed_rest_api_urls', $urls);

	foreach($urls as $url){
		if(str_contains($_SERVER['REQUEST_URI'], $url)){
			return true;
		}
	}

	return false;
}