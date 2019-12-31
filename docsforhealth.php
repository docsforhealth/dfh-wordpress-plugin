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

$DFH_TEXT_DOMAIN = 'dfh';

// see https://developer.wordpress.org/reference/functions/load_plugin_textdomain/
add_action('init', 'dfh_load_textdomain');
function dfh_load_textdomain() {
    load_plugin_textdomain('dfh', false, basename(__DIR__) . '/languages');
}

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/filters/block-filters/#managing-block-categories
add_filter('block_categories', 'dfh_block_categories', 10, 2);
function dfh_block_categories($categories, $post) {
    return array_merge(
        array(
            array(
                'slug' => 'dfh',
                'title' => __('Docs for Health', $GLOBALS['DFH_TEXT_DOMAIN']),
            ),
        ),
        $categories,
    );
}

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
add_action('init', 'dfh_setup_plugin');
function dfh_setup_plugin() {
    // if Block Editor is not active, bail.
    if (!function_exists('register_block_type')) {
        return;
    }
    // see https://wordpress.org/gutenberg/handbook/designers-developers/developers/internationalization/
    if (function_exists('wp_set_script_translations')) {
        wp_set_script_translations('dfh-editor-script', 'dfh', plugin_dir_path(__FILE__) . '/languages');
    }
    // register the `Resource` custom content type
    dfh_register_resource_type();
}

// see https://jasonyingling.me/enqueueing-scripts-and-styles-for-gutenberg-blocks/
add_action('enqueue_block_editor_assets', 'dfh_register_editor_blocks');
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

// see https://jasonyingling.me/enqueueing-scripts-and-styles-for-gutenberg-blocks/
add_action('enqueue_block_assets', 'dfh_register_frontend_blocks');
function dfh_register_frontend_blocks() {
    // Styles and scripts needed for ONLY the frontend
    // see https://github.com/WordPress/gutenberg/issues/1893#issuecomment-315240663
    if (!is_admin()) {
        wp_enqueue_script('jquery');
        // TODO add in scripts needed for frontend
        wp_enqueue_script(
            'dfh-frontend-script', // label
            plugins_url('build/editor.js', __FILE__), // script file
            array(), // dependencies
            filemtime(plugin_dir_path(__FILE__) . 'build/editor.js') // set version as file last modified time
        );
        // Register the frontend stylesheet.
        wp_enqueue_style(
            'dfh-frontend-styles', // label
            plugins_url('build/style.css', __FILE__), // CSS file
            array(), // dependencies
            filemtime(plugin_dir_path(__FILE__) . 'build/style.css') // set version as file last modified time
        );
    }
}

// Remove default "Post" type
// see https://wordpress.stackexchange.com/a/293203
add_action('admin_menu', 'dfh_remove_default_post_type');
function dfh_remove_default_post_type() {
    remove_menu_page('edit.php');
}

// Remove default "Post" type
// see https://wordpress.stackexchange.com/a/293203
add_action('admin_bar_menu', 'dfh_remove_default_post_type_menu_bar', 999);
function dfh_remove_default_post_type_menu_bar($wp_admin_bar) {
    $wp_admin_bar->remove_node('new-post');
}

// Remove default "Post" type
// see https://wordpress.stackexchange.com/a/293203
add_action('wp_dashboard_setup', 'dfh_remove_draft_widget', 999);
function dfh_remove_draft_widget() {
    remove_meta_box('dashboard_quick_press', 'dashboard', 'side');
}

// see https://www.smashingmagazine.com/2015/04/extending-wordpress-custom-content-types/
// see https://www.billerickson.net/gutenberg-block-templates/
// see https://developer.wordpress.org/block-editor/developers/block-api/block-templates/#custom-post-types
function dfh_register_resource_type() {
    // see https://developer.wordpress.org/plugins/post-types/registering-custom-post-types/
    register_post_type('dfh_resource', array(
        'hierarchical'        => false,
        'supports'            => array('title', 'editor'),
        'public'              => true,
        'show_ui'             => true,
        'show_in_rest'        => true,
        'publicly_queryable'  => true,
        'exclude_from_search' => true,
        'has_archive'         => false,
        'query_var'           => true,
        'can_export'          => true,
        'rewrite'             => array('slug' => 'resources', 'with_front' => false),
        'menu_icon'           => 'dashicons-rest-api',
        // TODO
        // 'template'            => array( array( 'core/quote', array( 'className' => 'is-style-large' ) ) ),
        // 'template_lock'      => 'all',
        'labels'              => array(
            'name'               => __('Resources', $GLOBALS['DFH_TEXT_DOMAIN']),
            'singular_name'      => __('Resource', $GLOBALS['DFH_TEXT_DOMAIN']),
            'add_new'            => __('Add New', $GLOBALS['DFH_TEXT_DOMAIN']),
            'add_new_item'       => __('Add New Resource', $GLOBALS['DFH_TEXT_DOMAIN']),
            'edit_item'          => __('Edit Resource', $GLOBALS['DFH_TEXT_DOMAIN']),
            'new_item'           => __('New Resource', $GLOBALS['DFH_TEXT_DOMAIN']),
            'view_item'          => __('View Resource', $GLOBALS['DFH_TEXT_DOMAIN']),
            'search_items'       => __('Search Resources', $GLOBALS['DFH_TEXT_DOMAIN']),
            'not_found'          => __('No Resources found', $GLOBALS['DFH_TEXT_DOMAIN']),
            'not_found_in_trash' => __('No Resources found in Trash', $GLOBALS['DFH_TEXT_DOMAIN']),
            'menu_name'          => __('Resources', $GLOBALS['DFH_TEXT_DOMAIN']),
        ),
    ));
    // see https://developer.wordpress.org/plugins/taxonomies/working-with-custom-taxonomies/
    register_taxonomy('dfh_resource_classification', 'dfh_resource', array(
        'hierarchical'          => false,
        'show_ui'               => true,
        'show_admin_column'     => true,
        'query_var'             => true,
        'show_in_rest'          => true,
        'rewrite'               => array('slug' => 'categories'),
        'labels'                => array(
            'name'                       => __('Categories', $GLOBALS['DFH_TEXT_DOMAIN']),
            'singular_name'              => __('Category', $GLOBALS['DFH_TEXT_DOMAIN']),
            'search_items'               => __('Categories', $GLOBALS['DFH_TEXT_DOMAIN']),
            'popular_items'              => __('Popular Categories', $GLOBALS['DFH_TEXT_DOMAIN']),
            'all_items'                  => __('All Categories', $GLOBALS['DFH_TEXT_DOMAIN']),
            'edit_item'                  => __('Edit Category', $GLOBALS['DFH_TEXT_DOMAIN']),
            'update_item'                => __('Update Category', $GLOBALS['DFH_TEXT_DOMAIN']),
            'add_new_item'               => __('Add New Category', $GLOBALS['DFH_TEXT_DOMAIN']),
            'new_item_name'              => __('New Category Name', $GLOBALS['DFH_TEXT_DOMAIN']),
            'separate_items_with_commas' => __('Separate Categories with commas', $GLOBALS['DFH_TEXT_DOMAIN']),
            'add_or_remove_items'        => __('Add or remove Categories', $GLOBALS['DFH_TEXT_DOMAIN']),
            'choose_from_most_used'      => __('Choose from most used Categories', $GLOBALS['DFH_TEXT_DOMAIN']),
            'not_found'                  => __('No Categories found', $GLOBALS['DFH_TEXT_DOMAIN']),
            'menu_name'                  => __('Categories', $GLOBALS['DFH_TEXT_DOMAIN']),
            'back_to_items'              => __('Back to Categories', $GLOBALS['DFH_TEXT_DOMAIN']),
        ),
      ));
}
