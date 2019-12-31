<?php

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
    // see https://wordpress.org/gutenberg/handbook/designers-developers/developers/internationalization/
    if (function_exists('wp_set_script_translations')) {
        wp_set_script_translations(
            'dfh-editor-script',
            $GLOBALS['DFH_TEXT_DOMAIN'],
            plugin_dir_path(__FILE__) . '/languages'
        );
    }
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
        wp_enqueue_script(
            'dfh-frontend-script', // label
            plugins_url('build/editor.js', __FILE__), // script file
            array(), // dependencies
            filemtime(plugin_dir_path(__FILE__) . 'build/editor.js') // set version as file last modified time
        );
        // see https://wordpress.org/gutenberg/handbook/designers-developers/developers/internationalization/
        if (function_exists('wp_set_script_translations')) {
            wp_set_script_translations(
                'dfh-frontend-script',
                $GLOBALS['DFH_TEXT_DOMAIN'],
                plugin_dir_path(__FILE__) . '/languages'
            );
        }
        // Register the frontend stylesheet.
        wp_enqueue_style(
            'dfh-frontend-styles', // label
            plugins_url('build/style.css', __FILE__), // CSS file
            array(), // dependencies
            filemtime(plugin_dir_path(__FILE__) . 'build/style.css') // set version as file last modified time
        );
    }
}
