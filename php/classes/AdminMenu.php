<?php
namespace SIM\CONTENTFILTER;
use SIM;
use SIM\ADMIN;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class AdminMenu extends ADMIN\SubAdminMenu{

    public function __construct($settings, $name){
        parent::__construct($settings, $name);
    }

    public function settings($parent){
        global $wp_roles;

        $roles	= $wp_roles->role_names;

        ob_start();

        ?>
        <label>
            <input type="checkbox" name="default-status" value="private" <?php if(isset($this->settings['default-status']) && $this->settings['default-status'] == 'private'){echo 'checked';}?>>
            Make uploaded media private by default
        </label>
        <br>
        <br>
        <label>
            Disallow acces to pages with the confidential category for the following user roles:<br>
                <?php
                foreach($roles as $key=>$role){
                    ?>
                    <label>
                        <input type="checkbox" name="confidential-roles[]" value="<?php echo $key;?>" <?php if(is_array($this->settings['confidential-roles']) && in_array($key, $this->settings['confidential-roles'])){echo 'checked';}?>>
                        <?php echo $role;?>
                    </label>
                    <br>
                    <?php
                }
                ?>
        </label>
        <?php

        SIM\addRawHtml(ob_get_clean(), $parent);

        return true;
    }

    public function emails($parent){
        return false;
    }

    public function data($parent){
        return false;
    }

    public function functions($parent){
        return false;
    }

}