<?php
namespace SIM\CONTENTFILTER;
use SIM;
use WP_Error;

//Secure the rest api
add_filter( 'rest_authentication_errors', __NAMESPACE__.'\authenticationErrors');
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
		$loginUrl 	= wp_login_url(SIM\getCurrentUrl());

		$message	= apply_filters('sim-content-filter-rest-not-logged-in-message', "You should be logged in to perform this request.<br>Login <a href='$loginUrl'>here</a>");

		$data		= apply_filters('sim-content-filter-rest-not-logged-in-data', array( 'status' => rest_authorization_required_code() ));

		return new WP_Error( 'content filter', __( $message ), $data );
	}
}

function isAllowedRestApiUrl(){
	$urls	= [
		'wp-mail-smtp/v1',
		RESTAPIPREFIX.'/fetch_nonce'
	];

	$urls	= apply_filters('sim_allowed_rest_api_urls', $urls);

	foreach($urls as $url){
		if(str_contains($_SERVER['REQUEST_URI'], $url)){
			return true;
		}
	}

	return false;
}