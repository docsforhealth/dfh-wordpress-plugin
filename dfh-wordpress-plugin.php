<?php
/**
 * Plugin Name: Docs for Health
 * Author: Eric Bai
 * Author URI: https://github.com/ericbai
 * Plugin URI: https://github.com/docsforhealth/dfh-wordpress-plugin
 * GitHub Plugin URI: https://github.com/docsforhealth/dfh-wordpress-plugin
 * Release Asset: true
 * Description: Custom blocks and functionality for the Docs for Health website
 * Version: 0.1.13
 * License: Apache-2.0
 * License URI: https://www.apache.org/licenses/LICENSE-2.0.txt
 * Text Domain: dfh
 */

defined('ABSPATH') || exit;

// From Contact Form 7 plugin setup files
if (!defined('DFH_PLUGIN_ROOT')) {
    define('DFH_PLUGIN_ROOT', __FILE__);
}
if (!defined('DFH_PLUGIN_DIR')) {
    define('DFH_PLUGIN_DIR', untrailingslashit(dirname(DFH_PLUGIN_ROOT)));
}
// Define the plugins that our plugin requires to function.
// Array format: 'Plugin Name' => 'Regex pattern for main plugin file'
if (!defined('DFH_REQUIRED_PLUGINS')) {
    define('DFH_REQUIRED_PLUGINS', array(
        'Contact Form 7' => '/wp-contact-form-7.php/',
        'Ajax Load More' => '/ajax-load-more.php/',
    ));
}

// *****************
// * EXTENSIBILITY *
// *****************

if (!defined('DFH_FILTER_BLOCK_CATEGORIES')) {
    define('DFH_FILTER_BLOCK_CATEGORIES', 'dfh_block_categories');
}

// *************************
// * SHARED WITH DFH THEME *
// *************************

if (!defined('DFH_TEXT_DOMAIN')) {
    define('DFH_TEXT_DOMAIN', 'dfh');
}

// Block categories
if (!defined('DFH_BLOCK_CATEGORY_COMMON')) {
    define('DFH_BLOCK_CATEGORY_COMMON', 'dfh-common');
}
if (!defined('DFH_BLOCK_CATEGORY_DEPRECATED')) {
    define('DFH_BLOCK_CATEGORY_DEPRECATED', 'dfh-deprecated');
}
if (!defined('DFH_BLOCK_CATEGORY_LANDING')) {
    define('DFH_BLOCK_CATEGORY_LANDING', 'dfh-landing');
}
if (!defined('DFH_BLOCK_CATEGORY_LAYOUT')) {
    define('DFH_BLOCK_CATEGORY_LAYOUT', 'dfh-layout');
}
if (!defined('DFH_BLOCK_CATEGORY_MEDIA')) {
    define('DFH_BLOCK_CATEGORY_MEDIA', 'dfh-media');
}
if (!defined('DFH_BLOCK_CATEGORY_CUSTOM_DATA')) {
    define('DFH_BLOCK_CATEGORY_CUSTOM_DATA', 'dfh-custom-data');
}

// Content types
if (!defined('DFH_CONTENT_TYPE_RESOURCE')) {
    define('DFH_CONTENT_TYPE_RESOURCE', 'dfh_resource');
}
if (!defined('DFH_CONTENT_TYPE_TOOLKIT')) {
    define('DFH_CONTENT_TYPE_TOOLKIT', 'dfh_toolkit');
}
if (!defined('DFH_CONTENT_TYPE_DOT_PHRASE')) {
    define('DFH_CONTENT_TYPE_DOT_PHRASE', 'dfh_dot_phrase');
}

// Template block for each content type
if (!defined('DFH_TEMPLATE_BLOCK_PAGE')) {
    define('DFH_TEMPLATE_BLOCK_PAGE', 'dfh/new-page-placeholder');
}
if (!defined('DFH_TEMPLATE_BLOCK_RESOURCE')) {
    define('DFH_TEMPLATE_BLOCK_RESOURCE', 'dfh/resource-detail');
}
if (!defined('DFH_TEMPLATE_BLOCK_TOOLKIT')) {
    define('DFH_TEMPLATE_BLOCK_TOOLKIT', 'dfh/toolkit-detail');
}
if (!defined('DFH_TEMPLATE_BLOCK_DOT_PHRASE')) {
    define('DFH_TEMPLATE_BLOCK_DOT_PHRASE', 'dfh/dot-phrase-detail');
}

// Required block for each content type
if (!defined('DFH_REQUIRED_BLOCK_RESOURCE')) {
    define('DFH_REQUIRED_BLOCK_RESOURCE', 'dfh/resource-detail-description');
}
if (!defined('DFH_REQUIRED_BLOCK_TOOLKIT')) {
    define('DFH_REQUIRED_BLOCK_TOOLKIT', 'dfh/toolkit-detail-metadata');
}
if (!defined('DFH_REQUIRED_BLOCK_DOT_PHRASE')) {
    define('DFH_REQUIRED_BLOCK_DOT_PHRASE', 'dfh/content-copy-area');
}

// Taxonomies
if (!defined('DFH_TAXONOMY_RESOURCE')) {
    define('DFH_TAXONOMY_RESOURCE', 'dfh_resource_classification');
}
if (!defined('DFH_TAXONOMY_RESOURCE_TYPE')) {
    define('DFH_TAXONOMY_RESOURCE_TYPE', 'dfh_resource_content_type');
}
if (!defined('DFH_TAXONOMY_DOT_PHRASE_CATEGORY')) {
    define('DFH_TAXONOMY_DOT_PHRASE_CATEGORY', 'dfh_dot_phrase_category');
}

// from https://waclawjacek.com/check-wordpress-plugin-dependencies/
if (!class_exists('DFH_Setup')) {
    require_once DFH_PLUGIN_DIR . '/src/php/class/Setup.php';
    $dfh_setup = new DFH_Setup();
    $dfh_setup->init();
}
