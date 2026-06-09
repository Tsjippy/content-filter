<?php

namespace TSJIPPY\CONTENTFILTER;

use TSJIPPY;

if (! defined('ABSPATH')) exit;

// Make partial page contents filterable
add_shortcode('tsjippy_content_filter', __NAMESPACE__ . '\renderContentFilterShortcode');
function renderContentFilterShortcode($atts = array(), $content = null)
{
    $a = shortcode_atts(array(
        'inversed' => false,
        'roles' => "All",
    ), $atts);

    $inversed         = $a['inversed'];
    $allowedRoles     = explode(',', $a['roles']);
    $return = false;

    //Get the current user
    $user = wp_get_current_user();

    //User is logged in
    if (is_user_logged_in() && in_array('All', $allowedRoles) || array_intersect($allowedRoles, $user->roles)) {
        // display content
        $return = true;
    }

    //If inversed
    if ($inversed) {
        //Swap the outcome
        $return = !$return;
    }

    //If return is true
    if ($return) {
        //return the shortcode content
        return do_shortcode($content);
    }
}
