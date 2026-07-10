<?php

namespace TSJIPPY\CONTENTFILTER;

use TSJIPPY;

if (! defined('ABSPATH')) exit;

add_action('init', function(){

    //register visibility taxonomy
    register_taxonomy('tsjippy_visibility', 'attachment', ['show_ui' => false]);
});