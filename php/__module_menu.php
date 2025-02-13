<?php
namespace SIM\CONTENTFILTER;
use SIM;

const MODULE_VERSION		= '8.0.5';

DEFINE(__NAMESPACE__.'\MODULE_PATH', plugin_dir_path(__DIR__));

DEFINE(__NAMESPACE__.'\MODULE_SLUG', strtolower(basename(dirname(__DIR__))));

add_action('sim_module_contentfilter_activated', __NAMESPACE__.'\moduleActivated');
function moduleActivated(){	
	//Create a public category if it does not exist
	wp_create_category('Public');
	wp_create_category('Confidential');
}

add_filter('sim_submenu_contentfilter_options', __NAMESPACE__.'\subMenuOptions', 10, 2);
function subMenuOptions($optionsHtml, $settings){
	global $wp_roles;

	ob_start();

	$roles	= $wp_roles->role_names;
    ?>
	<label>
		<input type="checkbox" name="default_status" value="private" <?php if(isset($settings['default_status']) && $settings['default_status'] == 'private'){echo 'checked';}?>>
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
					<input type="checkbox" name="confidential-roles[]" value="<?php echo $key;?>" <?php if(is_array($settings['confidential-roles']) && in_array($key, $settings['confidential-roles'])){echo 'checked';}?>>
					<?php echo $role;?>
				</label>
				<br>
				<?php
			}
			?>
	</label>
	<?php
	return $optionsHtml.ob_get_clean();
}