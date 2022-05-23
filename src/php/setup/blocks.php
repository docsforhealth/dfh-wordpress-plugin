<?php

// see `src/js/allow-only-custom-blocks` for hiding core blocks

// see https://jasonyingling.me/enqueueing-scripts-and-styles-for-gutenberg-blocks/
add_action('enqueue_block_editor_assets', 'dfh_register_editor_blocks');
function dfh_register_editor_blocks() {
    // Register the block editor script.
    wp_enqueue_script(
        'dfh-editor-script', // label
        plugins_url('/build/editor.js', DFH_PLUGIN_ROOT), // URL to script file
        array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-block-editor', 'wp-data', 'wp-hooks', 'wp-dom-ready'), // dependencies
        filemtime(DFH_PLUGIN_DIR . '/build/editor.js') // is a file path, set version as file last modified time
    );
    // see https://wordpress.org/gutenberg/handbook/designers-developers/developers/internationalization/
    if (function_exists('wp_set_script_translations')) {
        wp_set_script_translations(
            'dfh-editor-script',
            DFH_TEXT_DOMAIN,
            DFH_PLUGIN_DIR . '/languages'
        );
    }
    // Register the block editor stylesheet.
    wp_enqueue_style(
        'dfh-editor-styles', // label
        plugins_url('/build/editor.css', DFH_PLUGIN_ROOT), // URL to CSS file
        array('wp-edit-blocks'), // dependencies
        filemtime(DFH_PLUGIN_DIR . '/build/editor.css') // is a file path, set version as file last modified time
    );
}

// see https://jasonyingling.me/enqueueing-scripts-and-styles-for-gutenberg-blocks/
add_action('enqueue_block_assets', 'dfh_register_frontend_blocks');
function dfh_register_frontend_blocks() {
    // Styles and scripts needed for ONLY the frontend
    // see https://github.com/WordPress/gutenberg/issues/1893#issuecomment-315240663
    if (!is_admin()) {
        wp_enqueue_script(
            'dfh-frontend-script', // label
            plugins_url('/build/frontend.js', DFH_PLUGIN_ROOT), // URL to script file
            array('lodash', 'jquery'), // dependencies
            filemtime(DFH_PLUGIN_DIR . '/build/frontend.js') // is a file path, set version as file last modified time
        );
        // see https://wordpress.org/gutenberg/handbook/designers-developers/developers/internationalization/
        if (function_exists('wp_set_script_translations')) {
            wp_set_script_translations(
                'dfh-frontend-script',
                DFH_TEXT_DOMAIN,
                DFH_PLUGIN_DIR . '/languages'
            );
        }
        // Register the frontend stylesheet.
        wp_enqueue_style(
            'dfh-frontend-styles', // label
            plugins_url('/build/frontend.css', DFH_PLUGIN_ROOT), // URL to CSS file
            array(), // dependencies
            filemtime(DFH_PLUGIN_DIR . '/build/frontend.css') // is a file path, set version as file last modified time
        );
    }
}
