<?php

// see https://developer.wordpress.org/reference/functions/load_plugin_textdomain/
add_action('init', 'dfh_load_textdomain');
function dfh_load_textdomain() {
    load_plugin_textdomain(DFH_TEXT_DOMAIN, false, DFH_PLUGIN_DIR . '/languages');
}
