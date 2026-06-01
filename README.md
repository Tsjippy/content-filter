This plugin filters all content to be only available to logged-in users.<br>
Only content with the public category is visible to non-logged-in users.<br>
It also makes it possible to move files to a private folder so that it is not directly accessable.<br>
<br>
It adds one shortcode: 'content_filter' which makes it possible to limit certain parts of a page or post to certain groups.<br>
This shortcode has two properties: roles and inversed.<br>
Roles define the roles who can see the content.<br>
If inversed is set to true, roles define the roles who cannot see the content.<br>
Use like this: <code>[content_filter roles='administrator, otherroles']This has limited visibility[/content_filter]</code>

== Hooks ==
# FILTERS
- apply_filters('tsjippy_allowed_rest_api_urls', $urls);
- apply_filters('tsjippy-content-filter-rest-not-logged-in-message', "You should be logged in to perform this request.<br>Login <a href='$loginUrl'>here</a>");
- apply_filters('tsjippy-content-filter-rest-not-logged-in-data', array( 'status' => rest_authorization_required_code() ));


# Actions
- tsjippy-content-filter-reset-page