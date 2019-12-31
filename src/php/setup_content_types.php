<?php

// see https://www.smashingmagazine.com/2015/04/extending-wordpress-custom-content-types/
// see https://www.billerickson.net/gutenberg-block-templates/
// see https://developer.wordpress.org/block-editor/developers/block-api/block-templates/#custom-post-types
add_action('init', 'dfh_register_resource_type');
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
