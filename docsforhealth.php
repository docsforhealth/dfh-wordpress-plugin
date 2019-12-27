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

defined( 'ABSPATH' ) || exit;

// see https://developer.wordpress.org/reference/functions/load_plugin_textdomain/
function dfh_load_textdomain() {
    load_plugin_textdomain('dfh', false, basename(__DIR__) . '/languages');
}
add_action('init', 'dfh_load_textdomain');

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/filters/block-filters/#managing-block-categories
function dfh_block_categories($categories, $post) {
    return array_merge(
        array(
            array(
                'slug' => 'dfh',
                'title' => __('Docs for Health', 'dfh'),
            ),
        ),
        $categories,
    );
}
add_filter('block_categories', 'dfh_block_categories', 10, 2);

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
function dfh_setup_plugin() {
    // if Block Editor is not active, bail.
    if (!function_exists('register_block_type')) {
        return;
    }
    // See https://wordpress.org/gutenberg/handbook/designers-developers/developers/internationalization/
    if (function_exists('wp_set_script_translations')) {
        wp_set_script_translations('dfh-editor-script', 'dfh', plugin_dir_path(__FILE__) . '/languages');
    }
}
add_action('init', 'dfh_setup_plugin');

// see https://jasonyingling.me/enqueueing-scripts-and-styles-for-gutenberg-blocks/
function dfh_register_editor_blocks() {
    // Register the block editor script.
    wp_enqueue_script(
        'dfh-editor-script', // label
        plugins_url('build/index.js', __FILE__), // script file
        array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-block-editor', 'wp-data'), // dependencies
        filemtime(plugin_dir_path(__FILE__) . 'build/index.js') // set version as file last modified time
    );
    // Register the block editor stylesheet.
    wp_enqueue_style(
        'dfh-editor-styles', // label
        plugins_url('build/editor.css', __FILE__), // CSS file
        array('wp-edit-blocks'), // dependencies
        filemtime(plugin_dir_path(__FILE__) . 'build/editor.css') // set version as file last modified time
    );
}
add_action('enqueue_block_editor_assets', 'dfh_register_editor_blocks');

// see https://jasonyingling.me/enqueueing-scripts-and-styles-for-gutenberg-blocks/
function dfh_register_frontend_blocks() {
    // TODO add in scripts needed for both frontend and backend

    // Register the front-end stylesheet.
    wp_enqueue_style(
        'dfh-front-end-styles', // label
        plugins_url('build/style.css', __FILE__), // CSS file
        array(), // dependencies
        filemtime(plugin_dir_path(__FILE__) . 'build/style.css') // set version as file last modified time
    );
}
add_action('enqueue_block_assets', 'dfh_register_frontend_blocks');
