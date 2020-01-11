<?php
/**
 * Plugin Name: Docs for Health
 * Author: Eric Bai
 * Author URI: https://github.com/ericbai
 * Plugin URI: https://github.com/ericbai/dfh-wordpress-plugin
 * GitHub Plugin URI: https://github.com/ericbai/dfh-wordpress-plugin
 * Release Asset: true
 * Description: Custom plugin for the Docs for Health website
 * Version: 0.0.17
 * License: Apache-2.0
 * License URI: https://www.apache.org/licenses/LICENSE-2.0.txt
 * Text Domain: dfh
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
define('DFH_BLOCK_CATEGORY_TOOLKIT', 'dfh-toolkit');

define('DFH_TEMPLATE_BLOCK_RESOURCE', 'dfh/resource-detail');
define('DFH_TEMPLATE_BLOCK_TOOLKIT', 'dfh/toolkit-detail');

// Can be defined by either the Docs for Health theme or plugin
if (!defined('DFH_TEXT_DOMAIN')) {
    define('DFH_TEXT_DOMAIN', 'dfh');
}
if (!defined('DFH_CONTENT_TYPE_RESOURCE')) {
    define('DFH_CONTENT_TYPE_RESOURCE', 'dfh_resource');
}
if (!defined('DFH_CONTENT_TYPE_TOOLKIT')) {
    define('DFH_CONTENT_TYPE_TOOLKIT', 'dfh_toolkit');
}
if (!defined('DFH_REQUIRED_BLOCK_RESOURCE')) {
    define('DFH_REQUIRED_BLOCK_RESOURCE', 'dfh/resource-detail-description');
}
if (!defined('DFH_REQUIRED_BLOCK_TOOLKIT')) {
    define('DFH_REQUIRED_BLOCK_TOOLKIT', 'dfh/toolkit-detail-metadata');
}
if (!defined('DFH_TAXONOMY_RESOURCE')) {
    define('DFH_TAXONOMY_RESOURCE', 'dfh_resource_classification');
}

// from https://waclawjacek.com/check-wordpress-plugin-dependencies/
if (!class_exists('DFH_Setup')) {
    require_once DFH_PLUGIN_DIR . '/inc/php/class/Setup.php';
    $dfh_setup = new DFH_Setup();
    $dfh_setup->init();
}
