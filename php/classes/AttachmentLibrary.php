<?php

namespace TSJIPPY\CONTENTFILTER;

use TSJIPPY;

if (! defined('ABSPATH')) {
    exit;
}

class AttachmentLibrary
{
    /**
     * add public/private radio buttons to attachment page
     */
    public function fieldsToEdit($formFields, $post)
    {
        $fieldValue = get_post_meta($post->ID, 'tsjippy_visibility', true);

        ob_start();

?>
        <div>
            <input <?php if ($fieldValue == 'public' || empty($fieldValue)) {
                        echo 'checked';
                    } ?> style='width: initial' type='radio' name='attachments[<?php echo esc_attr($post->ID); ?>][visibility]' value='public'>
            Public
        </div>

        <div>
            <input <?php if ($fieldValue == 'private') {
                        echo 'checked';
                    } ?> style='width: initial' type='radio' name='attachments[<?php echo esc_attr($post->ID); ?>][visibility]' value='private'>
            Private
        </div>

<?php

        $formFields['visibility'] = array(
            'value' => $fieldValue ? $fieldValue : '',
            'label' => __('Visibility', '%TEXTDOMAIN%'),
            'input' => 'html',
            'html'  =>  ob_get_clean(),
        );

        return $formFields;
    }

    /**
     * change visibility of an attachment
     */
    public function editAttachment($attachmentId)
    {
        if (!isset($_REQUEST['attachments'][$attachmentId]['visibility'])) {
            return;
        }

        $visibility     = TSJIPPY\sanitize($_REQUEST['attachments'][$attachmentId]['visibility']);

        //check if changed
        $prevVis        = get_post_meta($attachmentId, 'tsjippy_visibility', true);

        if ($prevVis != $visibility) {
            do_action('tsjippy-before-visibility-change', $attachmentId, $visibility);

            //update post meta
            update_metadata('post', $attachmentId, 'tsjippy_visibility', $visibility);

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
     */
    public function attachmentArgs($query)
    {
        if (!empty($_REQUEST['query']['visibility'])) {
            $visibility = TSJIPPY\sanitize($_REQUEST['query']['visibility']);

            $query['meta_query'] = [
                [
                    'key'     => 'tsjippy_visibility',
                    'value'   => $visibility,
                    'compare' => '==',
                ]
            ];

            if ($visibility == 'public') {
                $query['meta_query']['relation'] = 'OR';
                $query['meta_query'][] = [
                    'key'     => 'tsjippy_visibility',
                    'compare' => 'NOT EXISTS'
                ];
            }
        }

        return $query;
    }

    /**
     * Move the file to the private dird
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
     * Set the visibility key
     */
    public function addAttachment($postId)
    {
        $default    = SETTINGS['default-status'] ?? 'private';

        if ($default == 'private') {
            update_metadata('post',  $postId, 'tsjippy_visibility', 'private');
        }
    }
}
