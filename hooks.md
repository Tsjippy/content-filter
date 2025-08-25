# FILTERS
- apply_filters('sim_allowed_rest_api_urls', $urls);
- apply_filters('sim-content-filter-rest-not-logged-in-message', "You should be logged in to perform this request.<br>Login <a href='$loginUrl'>here</a>");
- apply_filters('sim-content-filter-rest-not-logged-in-data', array( 'status' => rest_authorization_required_code() ));


# Actions
- sim-content-filter-reset-page