<?php

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/filters/block-filters/#managing-block-categories
add_filter('block_categories_all', 'dfh_block_categories', 10, 2);
function dfh_block_categories($categories, $post) {
    // Note that the order specified here is the order the categories will display
    // also has custom hook, see https://developer.wordpress.org/plugins/hooks/custom-hooks
    return apply_filters(DFH_FILTER_BLOCK_CATEGORIES, array_merge(
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
    ));
}
