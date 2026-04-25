<?php
namespace SIM\CONTENTFILTER;
use SIM;

//load js script to change media screen
add_action( 'wp_enqueue_media', __NAMESPACE__.'\loadAssets');
function loadAssets(){
    wp_enqueue_script('tsjippy_library_script', SIM\pathToUrl(PLUGINPATH.'js/library.min.js'), [], PLUGINVERSION);
}