<?php

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/filters/block-filters/#managing-block-categories
add_filter('block_categories_all', 'dfh_block_categories', 10, 2);
function dfh_block_categories($categories, $post) {
    // Note that the order specified here is the order the categories will display
    return array_merge(
        array(
            array(
                'slug'  => DFH_BLOCK_CATEGORY_COMMON,
                'title' => __('Common', DFH_TEXT_DOMAIN),
            ),
            array(
                'slug'  => DFH_BLOCK_CATEGORY_LAYOUT,
                'title' => __('Layout', DFH_TEXT_DOMAIN),
            ),
            array(
                'slug'  => DFH_BLOCK_CATEGORY_LANDING,
                'title' => __('Landing Page', DFH_TEXT_DOMAIN),
            ),
            array(
                'slug'  => DFH_BLOCK_CATEGORY_CUSTOM_DATA,
                'title' => __('Custom Data', DFH_TEXT_DOMAIN),
            ),
            array(
                'slug'  => DFH_BLOCK_CATEGORY_MEDIA,
                'title' => __('Media', DFH_TEXT_DOMAIN),
            ),
            array(
                'slug'  => DFH_BLOCK_CATEGORY_DEPRECATED,
                'title' => __('Deprecated', DFH_TEXT_DOMAIN),
            ),
        ),
        $categories
    );
}

add_action('init', 'dfh_register_dynamic_blocks');
function dfh_register_dynamic_blocks() {
    // if Block Editor is not active, bail.
    if (!function_exists('register_block_type')) {
        return;
    }
    // scripts and stylesheets already registered in editor-specific hooks
    // in these files, we only need to specify the render_callback AND attributes
    // see https://github.com/WordPress/gutenberg/issues/6187#issuecomment-381446732
    require DFH_PLUGIN_DIR . '/src/php/setup/block/dot_phrase_detail_info.php';
    require DFH_PLUGIN_DIR . '/src/php/setup/block/page_taxonomy_filter.php';
    require DFH_PLUGIN_DIR . '/src/php/setup/block/page_title.php';
    require DFH_PLUGIN_DIR . '/src/php/setup/block/resource_detail_info.php';
    require DFH_PLUGIN_DIR . '/src/php/setup/block/resource_overview.php';
    require DFH_PLUGIN_DIR . '/src/php/setup/block/toolkit_detail_header.php';
}
