<?php

namespace TSJIPPY\CONTENTFILTER;

use TSJIPPY;

if (! defined('ABSPATH')) exit;

// Kill the page load if the page is protected
add_action('wp_body_open', __NAMESPACE__ . '\killPageLoad');
function killPageLoad()
{
    global $wp_query;

    if ($wp_query->is_main_query() && isProtected()) {
        echo ob_get_clean();

        wp_die('This content is restricted. <br>You will be able to see this page as soon as you login. ', 'This content is restricted. ');

        print_footer_scripts();
        exit;
    }
}

// Add meta tag so this page is not indexed by search machines
add_action('wp_head', __NAMESPACE__ . '\wpHead');
function wpHead()
{
    if (isProtected()) {
        echo '<meta name="robots" content="noindex, nofollow">';
    }
}

// Discourage robots
add_filter('robots_txt', __NAMESPACE__ . '\robotsText', 10, 2);
function robotsText($output, $public)
{
    $output    .= "User-agent: *\n";
    $output    .= "Disallow: /wp-content/\n";

    return $output;
}

/**
 * Checks if current page is protected
 *
 * @return    boolean        false if visible, true if protected
 */
function isProtected()
{
    global    $post;

    $public                = false;
    foreach (get_post_taxonomies() as $taxonomy) {
        foreach ((array)get_the_terms($post, $taxonomy) as $term) {
            if (!empty($term) && $term->slug    == 'public') {
                $public    = true;
                break;
            }
        }
    }

    //If this page or post does not have the public category and the user is not logged in, redirect them to the login page
    if (
        http_response_code() != 404            &&        //we try to visit an existing page
        !is_user_logged_in()                &&
        !$public                            &&
        !is_search()                        &&
        !is_home()
    ) {
        return true;
    }

    return false;
}

// Add a login button if the user is not logged in and the current page is only for logged in users
add_filter('tsjippy_add_login_button', __NAMESPACE__ . '\loginButton');
function loginButton($show)
{

    return !isProtected();
}

add_action('get_footer', __NAMESPACE__ . '\loopEnd');
function loopEnd()
{
    global    $post;
    $user                = wp_get_current_user();
    $taxonomies            = get_post_taxonomies();

    $public                = false;
    if (!empty($taxonomies)) {
        $taxonomy            = get_post_taxonomies()[0];

        foreach ((array)get_the_terms($post, $taxonomy) as $term) {
            if (gettype($term) == 'object' && $term->slug    == 'public') {
                $public    = true;
                break;
            }
        }
    }

    // If not a valid e-mail then only allow the account page to reset the email
    if (str_contains($user->user_email, ".empty") && !$public && !is_search() && !is_home() && !str_contains($_SERVER['REQUEST_URI'] ?? '', 'account')) {
        ob_get_clean();

        $url            = '';
        if (defined('TSJIPPY\USERMANAGEMENT\SETTINGS') && !empty(TSJIPPY\USERMANAGEMENT\SETTINGS['account_page'])) {
            $url            = get_permalink(TSJIPPY\USERMANAGEMENT\SETTINGS['account_page']);
            if (!$url) {
                $url    = '';
            }
        }

?>
        <div class='error'>
            Your e-mail address is not valid please change it <a href='<?php echo esc_url($url); ?>/?section=generic'>here</a>.
        </div>
<?php

        return;
    }

    //block access to confidential pages
    $confidentialGroups    = SETTINGS['confidential-roles'] ?? [];
    if (is_page() && has_category('Confidential') && array_intersect($confidentialGroups, $user->roles)) {
        //prevent the output
        ob_get_clean();
        echo "<div class='error'>You do not have the permission to see this.</div>";
    }
}

//Make sure is_user_logged_in function is available by only running this when init
add_action('init', __NAMESPACE__ . '\init');
function init()
{
    // do not run during rest request
    if (TSJIPPY\isRestApiRequest()) {
        return;
    }

    //Function to only show newsittems on the news page the user is allowed to see
    add_action('pre_get_posts', __NAMESPACE__ . '\preNewsPosts');
}

function preNewsPosts($query)
{
    if ($query->is_home() && $query->is_main_query()) {
        if (!is_user_logged_in()) {
            //Only show items with the public category
            $query->set('cat', get_cat_ID('Public'));
            //Only show the items without a password
            $query->set('has_password', false);
        } else {
            $user = wp_get_current_user();

            $confidentialGroups    = SETTINGS['confidential-roles'] ?? [];
            if (array_intersect($confidentialGroups, $user->roles)) {
                //Hide confidential items
                $query->set('category__not_in', [get_cat_ID('Confidential')]);
            }
        }
    }
}

//Only show public search results for non-loggedin users
add_filter('pre_get_posts', __NAMESPACE__ . '\prePosts');
function prePosts($query)
{
    if ($query->is_search &&  !is_user_logged_in()) {
        $query->set('cat', get_cat_ID('Public'));
    }
    return $query;
}
