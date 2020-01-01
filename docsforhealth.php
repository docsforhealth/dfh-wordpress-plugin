<?php

/**
 * Plugin Name: Docs for Health
 * Author: Eric Bai
 * Author URI: https://github.com/ericbai
 * Description: Custom block plugin for the Docs for Health website
 * Version: 0.0.1
 * License: Apache-2.0
 * License URI: https://www.apache.org/licenses/LICENSE-2.0.txt
 * Text Domain: docsforhealth
 */

// Based on https://github.com/LinkedInLearning/WPContentBlocks-Adv-5034179

defined('ABSPATH') || exit;

// see https://developer.wordpress.org/reference/functions/load_plugin_textdomain/
$DFH_TEXT_DOMAIN = 'dfh';
add_action('init', 'dfh_load_textdomain');
function dfh_load_textdomain() {
    load_plugin_textdomain($GLOBALS['DFH_TEXT_DOMAIN'], false, basename(__DIR__) . '/languages');
}

require plugin_dir_path(__FILE__) . '/src/php/remove_default_post_type.php';
require plugin_dir_path(__FILE__) . '/src/php/setup_blocks.php';
require plugin_dir_path(__FILE__) . '/src/php/setup_content_types.php';
