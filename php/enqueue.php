<?php
namespace SIM\CONTENTFILTER;
use SIM;

//load js script to change media screen
add_action( 'wp_enqueue_media', function(){
    wp_enqueue_script('sim_library_script', SIM\pathToUrl(MODULE_PATH.'js/library.min.js'), [], MODULE_VERSION);
});