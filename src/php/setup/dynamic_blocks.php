<?php

add_action('init', 'dfh_register_dynamic_blocks');
function dfh_register_dynamic_blocks() {
    // if Block Editor is not active, bail.
    if (!function_exists('register_block_type')) {
        return;
    }
    // scripts and stylesheets already registered in editor-specific hooks
    // in these files, we only need to specify the render_callback AND attributes
    // see https://github.com/WordPress/gutenberg/issues/6187#issuecomment-381446732
    require DFH_PLUGIN_DIR . '/src/php/block/dot_phrase_detail_info.php';
    require DFH_PLUGIN_DIR . '/src/php/block/page_taxonomy_filter.php';
    require DFH_PLUGIN_DIR . '/src/php/block/page_title.php';
    require DFH_PLUGIN_DIR . '/src/php/block/resource_detail_info.php';
    require DFH_PLUGIN_DIR . '/src/php/block/resource_overview.php';
    require DFH_PLUGIN_DIR . '/src/php/block/toolkit_detail_header.php';
}
