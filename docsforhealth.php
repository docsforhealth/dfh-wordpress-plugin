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
function dfh_register_blocks() {
    // if Block Editor is not active, bail.
    if (!function_exists('register_block_type')) {
        return;
    }

    // Retister the block editor script.
    wp_register_script(
        'dfh-editor-script', // label
        plugins_url('build/index.js', __FILE__), // script file
        array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', "wp-data"), // dependencies
        filemtime(plugin_dir_path(__FILE__) . 'build/index.js') // set version as file last modified time
    );

    // Register the block editor stylesheet.
    wp_register_style(
        'dfh-editor-styles', // label
        plugins_url('build/editor.css', __FILE__), // CSS file
        array('wp-edit-blocks'), // dependencies
        filemtime(plugin_dir_path(__FILE__) . 'build/editor.css') // set version as file last modified time
    );

    // Register the front-end stylesheet.
    wp_register_style(
        'dfh-front-end-styles', // label
        plugins_url('build/style.css', __FILE__), // CSS file
        array(), // dependencies
        filemtime(plugin_dir_path(__FILE__) . 'build/style.css') // set version as file last modified time
    );

    // See https://wordpress.org/gutenberg/handbook/designers-developers/developers/internationalization/
    if (function_exists('wp_set_script_translations')) {
        wp_set_script_translations('dfh-editor-script', 'dfh', plugin_dir_path(__FILE__) . '/languages');
    }

    // Loop through $blocks and register each block with the same script and styles.
    $blocks = [
        'dfh/hero',
    ];
    foreach($blocks as $block) {
        register_block_type($block, array(
            'editor_script' => 'dfh-editor-script', // Calls registered script above
            'editor_style' => 'dfh-editor-styles', // Calls registered stylesheet above
            'style' => 'dfh-front-end-styles', // Calls registered stylesheet above
        ));
    }
}
add_action('init', 'dfh_register_blocks');
