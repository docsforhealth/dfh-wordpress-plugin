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

define('DFH_TEXT_DOMAIN', 'dfh');
define('DFH_BLOCK_CATEGORY_COMMON', 'dfh-common');
define('DFH_BLOCK_CATEGORY_LANDING', 'dfh-landing');
define('DFH_BLOCK_CATEGORY_RESOURCE', 'dfh-resource');
define('DFH_CONTENT_TYPE_RESOURCE', 'dfh_resource');
define('DFH_TAXONOMY_RESOURCE', 'dfh_resource_classification');

// from https://waclawjacek.com/check-wordpress-plugin-dependencies/
if (!class_exists('DFH_Setup')) {
    require_once DFH_PLUGIN_DIR . '/src/php/class/Setup.php';
    $dfh_setup = new DFH_Setup();
    $dfh_setup->init();
}
