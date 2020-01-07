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

defined('ABSPATH') || exit;

// From Contact Form 7 plugin setup files
define('DFH_PLUGIN_ROOT', __FILE__);
define('DFH_PLUGIN_DIR', untrailingslashit(dirname(DFH_PLUGIN_ROOT)));

// Define the plugins that our plugin requires to function.
// Array format: 'Plugin Name' => 'Path to main plugin file'
define('DFH_REQUIRED_PLUGINS', array(
    'Contact Form 7' => 'contact-form-7/wp-contact-form-7.php',
    'Ajax Load More' => 'ajax-load-more/ajax-load-more.php',
));

define('DFH_BLOCK_CATEGORY_COMMON', 'dfh-common');
define('DFH_BLOCK_CATEGORY_LANDING', 'dfh-landing');
define('DFH_BLOCK_CATEGORY_LAYOUT', 'dfh-layout');
define('DFH_BLOCK_CATEGORY_MEDIA', 'dfh-media');
define('DFH_BLOCK_CATEGORY_RESOURCE', 'dfh-resource');

// Can be defined by either the Docs for Health theme or plugin
if (!defined('DFH_TEXT_DOMAIN')) {
    define('DFH_TEXT_DOMAIN', 'dfh');
}
if (!defined('DFH_CONTENT_TYPE_RESOURCE')) {
    define('DFH_CONTENT_TYPE_RESOURCE', 'dfh_resource');
}
if (!defined('DFH_TAXONOMY_RESOURCE')) {
    define('DFH_TAXONOMY_RESOURCE', 'dfh_resource_classification');
}

// from https://waclawjacek.com/check-wordpress-plugin-dependencies/
if (!class_exists('DFH_Setup')) {
    require_once DFH_PLUGIN_DIR . '/src/php/class/Setup.php';
    $dfh_setup = new DFH_Setup();
    $dfh_setup->init();
}
