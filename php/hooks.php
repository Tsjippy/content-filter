<?php

namespace TSJIPPY\CONTENTFILTER;

use TSJIPPY;

if (! defined('ABSPATH')) exit;

/**
 * AJAX Search Lite filters
 */
add_filter('asl_query_cpt', __NAMESPACE__ . '\limitSearchToPublic', 10, 4);
/**
 * Filter the search results to only show public items for non-loggedin users
 *
 * @param    string        $querystr        The current query string
 * @param    array        $args            The current query args
 * @param    string        $id                The search ID
 * @param    boolean        $_ajax_search    Whether this is an AJAX search or not
 * @return    string        The modified query string
 */
function limitSearchToPublic($querystr, $args, $id, $_ajax_search)
{
    $ajaxSearch = new AjaxSearchLite();

    return $ajaxSearch->limitSearchToPublic($querystr, $args, $id, $_ajax_search);
}


/**
 * Attachment Library Filters
 */
add_filter('attachment_fields_to_edit', __NAMESPACE__ . '\fieldsToEdit', 10, 2);
/**
 * Filter the attachment fields to only show public items for non-loggedin users
 *
 * @param    array        $formFields    The current form fields
 * @param    WP_Post        $post        The current post object
 * @return    array        The modified form fields
 */
function fieldsToEdit($formFields, $post)
{
    $attachmentLibrary  = new AttachmentLibrary();

    return $attachmentLibrary->fieldsToEdit($formFields, $post);
}

add_action('edit_attachment', __NAMESPACE__ . '\editAttachment');
/**
 * Filter the attachment edit to only show public items for non-loggedin users
 *
 * @param    int        $attachmentId    The current attachment ID
 * @return    array        The modified form fields
 */
function editAttachment($attachmentId)
{
    $attachmentLibrary  = new AttachmentLibrary();

    return $attachmentLibrary->editAttachment($attachmentId);
}

add_filter('ajax_query_attachments_args',  __NAMESPACE__ . '\attachmentArgs');
/**
 * Filter the attachment query args to only show public items for non-loggedin users
 *
 * @param    array        $query        The current query args
 * @return    array        The modified query args
 */
function attachmentArgs($query)
{
    $attachmentLibrary  = new AttachmentLibrary();

    return $attachmentLibrary->attachmentArgs($query);
}


add_filter('wp_handle_upload', __NAMESPACE__ . '\handleUpload');
/**
 * Filter the upload to only show public items for non-loggedin users
 *
 * @param    array        $file        The current file array
 * @return    array        The modified file array
 */
function handleUpload($file)
{
    $attachmentLibrary  = new AttachmentLibrary();

    return $attachmentLibrary->handleUpload($file);
}

add_action('add_attachment', __NAMESPACE__ . '\addAttachment');
/**
 * Filter the attachment add to only show public items for non-loggedin users
 *
 * @param    int        $postId        The current post ID
 * @return    array        The modified form fields
 */
function addAttachment($postId)
{
    $attachmentLibrary  = new AttachmentLibrary();

    return $attachmentLibrary->addAttachment($postId);
}

add_filter('tsjippy-theme-news-query', function ($args, $user) {
    //Hide confidential items on the front page
    if (array_intersect(SETTINGS['confidential-roles'] ?? [], $user->roles)) {
        $args['tax_query'][] =
            array(
                'taxonomy' => 'events',
                'field'    => 'term_id',
                'terms'    => [get_cat_ID('Confidential')],
                'operator' => 'NOT IN'
            );
    }

    return $args;
}, 10, 2);

add_filter( 'register_block_type_args', __NAMESPACE__.'\addGlobalAttributes' );
/**
 * Add filter attributes to all blocks
 *
 * @param array $args Arguments for registering a block type.
 * 
 * @return array
 */
function addGlobalAttributes( $args ) {
    if ( ! isset( $args['attributes'] ) || ! is_array( $args['attributes'] ) ) {
		$args['attributes'] = array();
	}
    
    $args['attributes']['hideOnMobile'] = array(
        'type'    => 'boolean',
        'default' => false,
    );

    $args['attributes']['onlyLoggedIn'] = array(
        'type'    => 'boolean',
        'default' => false,
    );

    $args['attributes']['onlyNotLoggedIn'] = array(
        'type'    => 'boolean',
        'default' => false,
    );

    $args['attributes']['onlyOn'] = array(
        'type'    => 'array',
        'default' => [],
    );

    $args['attributes']['phpFilters'] = array(
        'type'    => 'array',
        'default' => [],
    );

    $args['attributes']['phpFilterInverseLogic'] = array(
        'type'    => 'boolean',
        'default' => false,
    );

    $args['attributes']['roles'] = array(
        'type'    => 'array',
        'default' => [],
    );

    $args['attributes']['rolesInverseLogic'] = array(
        'type'    => 'boolean',
        'default' => false,
    );

	return $args;
}