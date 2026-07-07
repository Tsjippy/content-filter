<?php

namespace TSJIPPY\CONTENTFILTER;

use TSJIPPY;

if (! defined('ABSPATH')) exit;

/**
 * Load the block settings js to define block filters
 */
add_action('enqueue_block_editor_assets', __NAMESPACE__ . '\addBlockJs');
function addBlockJs()
{
    wp_enqueue_script(
        'tsjippy-content-filter',
        TSJIPPY\pathToUrl(PLUGINPATH.'blocks/content-filter/build/index.js'),
        ['wp-blocks', 'wp-dom', 'wp-dom-ready', 'wp-edit-post'],
        PLUGINVERSION,
        true
    );
}

/**
 * Add the filter
 */
add_filter('render_block', __NAMESPACE__ . '\filterBlock', 10, 2);

/**
 * Filters the block content based on the block attributes
 *
 * @param    string   $blockContent The content of the block
 * @param    array    $block        The block attributes
 */
function filterBlock($blockContent, $block)
{
    $filtered   = false;

    /** 
     * hideOnMobile
     */
    if ($block['attrs']['hideOnMobile'] ?? false) {
        return "<span class='hide-on-mobile'>$blockContent</span>";
    }

    /** 
     * Hide when onlyLoggedIn, onlyNotLoggedIn, onlyOn is valid
     */
    if (
        // not on a specific page
        (!empty($block['attrs']['onlyOn']) && !in_array(get_the_ID(), $block['attrs']['onlyOn'] ))    ||
        // or not logged in
        (($block['attrs']['onlyLoggedIn'] ?? false) && !is_user_logged_in())    ||
        // or logged in
        (($block['attrs']['onlyNotLoggedIn'] ?? false) && is_user_logged_in())
    ) {
        $filtered   = true;
    }

     /** 
     * Hide when we do not have the correct role
     */
    elseif(!empty($block['attrs']['roles'])){
        $overlappingRoles = array_intersect(wp_get_current_user()->roles, $block['attrs']['roles']);
        if(
            !$overlappingRoles ||                           // We do not have one of the selected role
            ($block['attrs']['rolesInverseLogic'] ?? false) // Or we do have but it is inversed
        ){
            $filtered   = true;
        }
    }

     // Run php filters
    elseif (!empty($block['attrs']['phpFilters'])) {
        $show    = false;

        $allowedFilters = getAllowedPhpBlockFilters();

        // Loop over all the filters
        foreach ($block['attrs']['phpFilters'] as $filter) {
            if (isset($allowedFilters[$filter]) && function_exists($filter)) {
                // wrap in a ob_start to prevent accidental output
                ob_start();
                $result = $filter(get_the_ID());
                ob_end_clean();

                // Result should only return a boolean
                if($result === true){
                    $show    = true;
                    break;
                }
            }
        }

        // Swap if inversed
        if (!empty($block['attrs']['phpFilterInverseLogic'])) {
            $show = !$show;
        }

        if (!$show) {
            $filtered   = true;
        }
    }

    if($filtered){
        if(($_REQUEST['context'] ?? '') == "edit"){
            return "<div class='warning'>This block is invisible outside the block editor due to filter conditions.</div>";
        }

        return '';
    }

    return $blockContent;
}

