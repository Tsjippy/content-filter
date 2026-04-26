<?php
namespace TSJIPPY\CONTENTFILTER;
use TSJIPPY;

/**
 * AJAX Search Lite filters
 */
add_filter('asl_query_cpt', __NAMESPACE__.'\limitSearchToPublic', 10, 4);
function limitSearchToPublic($querystr, $args, $id, $_ajax_search){
    $ajaxSearch = new AjaxSearchLite();

    return $ajaxSearch->limitSearchToPublic($querystr, $args, $id, $_ajax_search);
}


/**
 * Attachment Library Filters
 */
add_filter( 'attachment_fields_to_edit', __NAMESPACE__.'\fieldsToEdit', 10, 2);
function fieldsToEdit($formFields, $post ){
    $attachmentLibrary  = new AttachmentLibrary();

    return $attachmentLibrary->fieldsToEdit($formFields, $post );

}

add_action( 'edit_attachment', __NAMESPACE__.'\editAttachment');
function editAttachment($attachmentId){
    $attachmentLibrary  = new AttachmentLibrary();

    return $attachmentLibrary->editAttachment($attachmentId);
}

add_filter( 'ajax_query_attachments_args',  __NAMESPACE__.'\attachmentArgs');
function attachmentArgs($query){
    $attachmentLibrary  = new AttachmentLibrary();

    return $attachmentLibrary->attachmentArgs($query );
}


add_filter('wp_handle_upload', __NAMESPACE__.'\handleUpload');
function handleUpload($file){
    $attachmentLibrary  = new AttachmentLibrary();

    return $attachmentLibrary->handleUpload($file );
}

add_action( 'add_attachment', __NAMESPACE__.'\addAttachment');
function addAttachment( $postId) {
    $attachmentLibrary  = new AttachmentLibrary();

    return $attachmentLibrary->addAttachment($postId );
}