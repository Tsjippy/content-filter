Great plugin to define which content to show depending on device type, user role or logged in status

== Description ==
This plugin filters all content to be only available to logged-in users, except for content with the public category.<br>
It also makes it possible to move files to a private folder so that it is not directly accessible.<br>
<br>
Enabling this plugin will add block visibilty options to all blocks<br>
Visibility of each block can be determined by user role, type of page(i.e. archive, home_page etc), mobile, or login status

== Hooks ==
# FILTERS
- apply_filters('tsjippy_allowed_rest_api_urls', $urls);
- apply_filters('tsjippy-content-filter-rest-not-logged-in-message', "You should be logged in to perform this request.<br>Login <a href='$loginUrl'>here</a>");
- apply_filters('tsjippy-content-filter-rest-not-logged-in-data', array( 'status' => rest_authorization_required_code() ));

# Actions
- tsjippy-content-filter-reset-page

== Issues ==
Please file any issues on the wp forum or directly on Github: 
* [comments](https://github.com/Tsjippy/content-filter/issues)
* [shared functionality](https://github.com/Tsjippy/shared-functionality/issues)