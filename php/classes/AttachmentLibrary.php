<?php

namespace TSJIPPY\CONTENTFILTER;

use TSJIPPY;

if (! defined('ABSPATH')) {
    exit;
}

class AttachmentLibrary
{
    /**
     * Adds public/private radio buttons to attachment page
     * 
     * @param array $formFields The form fields for an attachment
     * @param \WP_Post $post The attachment post object
     * 
     * @return array The updated form fields with the visibility radio buttons added
     */
    public function fieldsToEdit($formFields, $post)
    {
        $fieldValue = '';
        $postTerms  = wp_get_post_terms($post->ID, 'tsjippy_visibility');
        if(isset($postTerms[0]->slug)){
            $fieldValue = $postTerms[0]->slug;
        }

        ob_start();

        ?>
        <div>
            <input type='radio' name='attachments[<?php echo esc_attr($post->ID); ?>][visibility]'  value='public' <?php if ($fieldValue == 'public' || empty($fieldValue)) echo 'checked'; ?> style='width: initial'>
            Public
        </div>

        <div>
            <input  type='radio' name='attachments[<?php echo esc_attr($post->ID); ?>][visibility]' value='private' <?php if ($fieldValue == 'private') echo 'checked'; ?> style='width: initial' >
            Private
        </div>

        <?php

        $formFields['visibility'] = array(
            'value' => $fieldValue ?? '',
            'label' => __('Visibility', '%TEXTDOMAIN%'),
            'input' => 'html',
            'html'  =>  ob_get_clean(),
        );

        return $formFields;
    }

    /**
     * Change visibility of an attachment
     * 
     * @param int $attachmentId The ID of the attachment to set the visibility for
     * 
     * @return void
     */
    public function editAttachment($attachmentId)
    {
        // phpcs:ignore
        if (!isset($_REQUEST['attachments'][$attachmentId]['visibility'])) {
            return;
        }

        // phpcs:ignore
        $visibility     = TSJIPPY\sanitize($_REQUEST['attachments'][$attachmentId]['visibility']);

        //check if changed
        $prevVis    = '';
        $terms = wp_get_post_terms($attachmentId, 'tsjippy_visibility');
        if(isset($terms[0]->slug)){
            $prevVis    = $terms[0]->slug;
        }

        if ($prevVis != $visibility) {
            do_action('tsjippy-content-filter-before-visibility-change', $attachmentId, $visibility);

            //update post meta
            wp_set_post_terms($attachmentId, $visibility, 'tsjippy_visibility');

            //Check if moving to public or to private
            if ($visibility == 'public') {
                $targetPath = '';
            } else {
                $targetPath = 'private';
            }

            $this->moveAttachment($attachmentId, $targetPath);
        }
    }

    /**
     * Move attachment to other folder
     * @param      int     $postId            WP_Post id
     * @param      string    $subDir           The sub folder where the files should be uploaded
     */
    public function moveAttachment($postId, $subDir, $generate = true)
    {
        if (empty($subDir)) {
            $newPath   = wp_upload_dir()['basedir'];
        } else {
            $newPath   = wp_upload_dir()['basedir'] . "/$subDir";
            $subDir     = rtrim($subDir, "/") . '/';
        }

        //get the file location of the attachment
        $oldPath   = get_attached_file($postId);
        if (!file_exists($oldPath)) {
            return false;
        }

        $filename   = basename($oldPath);
        $extension  = ' . ' . pathinfo($oldPath, PATHINFO_EXTENSION);
        $baseDir    = dirname($oldPath);
        $baseName   = str_replace(["-scaled", $extension], "", $filename);

        //Update the location in the db
        update_attached_file($postId, "$newPath/$filename");

        //update main path
        update_metadata('post', $postId, '_wp_attached_file', $subDir . $filename);

        //Move all the files to the private folder
        $files = glob("$baseDir/$baseName*");
        $wpFileSystem   = TSJIPPY\loadWpFileSystem();

        foreach ($files as $file) {
            $wpFileSystem->move($file, "$newPath/" . basename($file));
        }

        if ($generate) {
            if (!function_exists('wp_generate_attachment_metadata')) {
                require_once(ABSPATH . '/wp-admin/includes/image.php');
            }
            wp_generate_attachment_metadata($postId, "$newPath/$filename");
        }

        TSJIPPY\urlUpdate(str_replace($filename, $baseName, $oldPath), "$newPath/$baseName");
    }

    /**
     * Filter library if needed
     * 
     * @param array $query The query args
     * 
     * @return array The updated query args
     */
    public function attachmentArgs($query)
    {
        if (!empty($query['tsjippy_visibility'])) {
            // Add a term query for the requested visibilty
            $query['tax_query'] = [
                [
                    'taxonomy' => 'tsjippy_visibility',
                    'field'    => 'slug',
                    'terms'    => array($query['tsjippy_visibility'])
                ]
            ];

            // if we want to see public we should also query for posts without the term
            if($query['tsjippy_visibility'] == 'public'){
                $query['tax_query']['relation'] = 'OR';
                $query['tax_query'][] = [
                    'taxonomy' => 'tsjippy_visibility',
                    'field'    => 'slug',
                    'terms'    => array($query['tsjippy_visibility']),
                    'operator' => 'NOT EXISTS',
                ];
            }
        }

        return $query;
    }

    /**
     * Move the file to the private dir
     * 
     * @param array $file The file array
     * 
     * @return array The file array
     */
    function handleUpload($file)
    {
        $default    = SETTINGS['default-status'] ?? 'private';

        if ($default == 'private' && !str_contains($file['file'], 'private')) {
            $newPath    = wp_upload_dir()['basedir'] . '/private/' . basename($file['file']);
            $newUrl     = TSJIPPY\pathToUrl($newPath);

            $wpFileSystem  = TSJIPPY\loadWpFileSystem();
            $wpFileSystem->move($file['file'], $newPath);

            $file['file']   = $newPath;
            $file['url']    = $newUrl;
        }

        return $file;
    }

    /**
     * Set the visibility key for a new attachment
     * 
     * @param int $postId The ID of the new attachment post
     * 
     * @return void
     */
    public function addAttachment($postId)
    {
        $default    = SETTINGS['default-status'] ?? 'private';

        if ($default == 'private') {
            wp_set_post_terms($postId, 'private', 'tsjippy_visibility');
        }
    }
}
