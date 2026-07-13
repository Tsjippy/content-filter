<?php

namespace TSJIPPY\CONTENTFILTER;

use TSJIPPY;
use TSJIPPY\ADMIN;

if (! defined('ABSPATH')) {
    exit;
}

class AdminMenu extends ADMIN\SubAdminMenu
{

    /**
     * AdminMenu constructor.
     *
     * @param array $settings The settings for the plugin
     * @param string $name The name of the plugin
     */
    public function __construct($settings, $name)
    {
        parent::__construct($settings, $name);
    }

    /**
     * Add the settings page to the admin menu
     *
     * @param \DOMElement $parent The parent menu slug
     * 
     * @return bool True if the settings page was added, false otherwise
     */
    public function settings($parent)
    {
        global $wp_roles;

        $roles    = $wp_roles->role_names;

        ob_start();

        ?>
        <label>
            <input type="checkbox" name="default-status" value="private" <?php if (isset($this->settings['default-status']) && $this->settings['default-status'] == 'private') echo 'checked'; ?>>
            Make uploaded media private by default
        </label>
        <br>
        <br>
        <label>
            Disallow acces to pages with the confidential category for the following user roles:<br>
            <?php
            foreach ($roles as $key => $role) {
            ?>
                <label>
                    <input type="checkbox" name="confidential-roles[<?php echo esc_attr($key); ?>]" value="<?php echo esc_attr($key); ?>" <?php if(isset($this->settings['confidential-roles'][$key]) ) echo  'checked'; ?>>
                    <?php echo esc_html($role); ?>
                </label>
                <br>
            <?php
            }
            ?>
        </label>
        <br>
        <?php

        TSJIPPY\addRawHtml(ob_get_clean(), $parent);

        return true;
    }

    /**
     * Function to display the emails page
     *
     * @param   string  $parent The parent menu slug
     * 
     * @return  bool            True if the emails page was displayed, false otherwise
     */
    public function emails($parent)
    {
        return false;
    }

    /**
     * Add the data page to the admin menu
     *
     * @param string $parent The parent menu slug
     * 
     * @return bool True if the data page was added, false otherwise
     */
    public function data($parent)
    {
        return false;
    }

    /**
     * Add the functions page to the admin menu
     *
     * @param string $parent The parent menu slug
     * 
     * @return bool True if the functions page was added, false otherwise
     */
    public function functions($parent)
    {
        return false;
    }
}
