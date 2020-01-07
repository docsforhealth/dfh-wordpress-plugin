<?php

// see https://www.smashingmagazine.com/2015/04/extending-wordpress-custom-content-types/
// see https://www.billerickson.net/gutenberg-block-templates/
// see https://developer.wordpress.org/block-editor/developers/block-api/block-templates/#custom-post-types

add_action('init', 'dfh_register_resource_type');
function dfh_register_resource_type() {
    // see https://developer.wordpress.org/plugins/post-types/registering-custom-post-types/
    register_post_type(DFH_CONTENT_TYPE_RESOURCE, array(
        'hierarchical'        => false,
        'supports'            => array('title', 'editor', 'excerpt'),
        'public'              => true,
        'show_ui'             => true,
        'show_in_rest'        => true,
        'publicly_queryable'  => true,
        'exclude_from_search' => true,
        'has_archive'         => false,
        'query_var'           => true,
        'can_export'          => true,
        'rewrite'             => array('slug' => 'resources', 'with_front' => false),
        'menu_icon'           => 'dashicons-image-filter',
        'template'            => array(array('dfh/resource-detail', array())),
        'template_lock'       => 'all',
        'labels'              => array(
            'name'               => __('Resources', DFH_TEXT_DOMAIN),
            'singular_name'      => __('Resource', DFH_TEXT_DOMAIN),
            'add_new'            => __('Add New', DFH_TEXT_DOMAIN),
            'add_new_item'       => __('Add New Resource', DFH_TEXT_DOMAIN),
            'edit_item'          => __('Edit Resource', DFH_TEXT_DOMAIN),
            'new_item'           => __('New Resource', DFH_TEXT_DOMAIN),
            'view_item'          => __('View Resource', DFH_TEXT_DOMAIN),
            'search_items'       => __('Search Resources', DFH_TEXT_DOMAIN),
            'not_found'          => __('No Resources found', DFH_TEXT_DOMAIN),
            'not_found_in_trash' => __('No Resources found in Trash', DFH_TEXT_DOMAIN),
            'menu_name'          => __('Resources', DFH_TEXT_DOMAIN),
        ),
    ));
    // see https://developer.wordpress.org/plugins/taxonomies/working-with-custom-taxonomies/
    register_taxonomy(DFH_TAXONOMY_RESOURCE, DFH_CONTENT_TYPE_RESOURCE, array(
        'hierarchical'          => false,
        'show_ui'               => true,
        'show_admin_column'     => true,
        'query_var'             => true,
        'show_in_rest'          => true,
        'rewrite'               => array('slug' => 'categories'),
        'labels'                => array(
            'name'                       => __('Categories', DFH_TEXT_DOMAIN),
            'singular_name'              => __('Category', DFH_TEXT_DOMAIN),
            'search_items'               => __('Categories', DFH_TEXT_DOMAIN),
            'popular_items'              => __('Popular Categories', DFH_TEXT_DOMAIN),
            'all_items'                  => __('All Categories', DFH_TEXT_DOMAIN),
            'edit_item'                  => __('Edit Category', DFH_TEXT_DOMAIN),
            'update_item'                => __('Update Category', DFH_TEXT_DOMAIN),
            'add_new_item'               => __('Add New Category', DFH_TEXT_DOMAIN),
            'new_item_name'              => __('New Category Name', DFH_TEXT_DOMAIN),
            'separate_items_with_commas' => __('Separate Categories with commas', DFH_TEXT_DOMAIN),
            'add_or_remove_items'        => __('Add or remove Categories', DFH_TEXT_DOMAIN),
            'choose_from_most_used'      => __('Choose from most used Categories', DFH_TEXT_DOMAIN),
            'not_found'                  => __('No Categories found', DFH_TEXT_DOMAIN),
            'menu_name'                  => __('Categories', DFH_TEXT_DOMAIN),
            'back_to_items'              => __('Back to Categories', DFH_TEXT_DOMAIN),
        ),
    ));
}


add_action('init', 'dfh_register_toolkit_type');
function dfh_register_toolkit_type() {
    // see https://developer.wordpress.org/plugins/post-types/registering-custom-post-types/
    register_post_type(DFH_CONTENT_TYPE_TOOLKIT, array(
        'hierarchical'        => false,
        'supports'            => array('title', 'editor', 'excerpt'),
        'public'              => true,
        'show_ui'             => true,
        'show_in_rest'        => true,
        'publicly_queryable'  => true,
        'exclude_from_search' => true,
        'has_archive'         => false,
        'query_var'           => true,
        'can_export'          => true,
        'rewrite'             => array('slug' => 'toolkits', 'with_front' => false),
        'menu_icon'           => 'dashicons-portfolio',
        // TODO
        // 'template'            => array(array('dfh/toolkit-detail', array())),
        // 'template_lock'       => 'all',
        'labels'              => array(
            'name'               => __('Toolkits', DFH_TEXT_DOMAIN),
            'singular_name'      => __('Toolkit', DFH_TEXT_DOMAIN),
            'add_new'            => __('Add New', DFH_TEXT_DOMAIN),
            'add_new_item'       => __('Add New Toolkit', DFH_TEXT_DOMAIN),
            'edit_item'          => __('Edit Toolkit', DFH_TEXT_DOMAIN),
            'new_item'           => __('New Toolkit', DFH_TEXT_DOMAIN),
            'view_item'          => __('View Toolkit', DFH_TEXT_DOMAIN),
            'search_items'       => __('Search Toolkits', DFH_TEXT_DOMAIN),
            'not_found'          => __('No Toolkits found', DFH_TEXT_DOMAIN),
            'not_found_in_trash' => __('No Toolkits found in Trash', DFH_TEXT_DOMAIN),
            'menu_name'          => __('Toolkits', DFH_TEXT_DOMAIN),
        ),
    ));
}
