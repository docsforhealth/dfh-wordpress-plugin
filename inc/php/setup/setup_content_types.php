<?php

// see https://www.smashingmagazine.com/2015/04/extending-wordpress-custom-content-types/
// see https://www.billerickson.net/gutenberg-block-templates/
// see https://developer.wordpress.org/block-editor/developers/block-api/block-templates/#custom-post-types

// Need to flush URL rewrite rules when plugin is re-activated in order to get custom post type
// URL rewriting rules to work as intended
// see https://developer.wordpress.org/reference/functions/register_post_type/#flushing-rewrite-on-activation
register_activation_hook(__FILE__, 'dfh_activation_rewrite_flush');
function dfh_activation_rewrite_flush() {
    // First, we "add" the custom post type via the above written function.
    // Note: "add" is written with quotes, as CPTs don't get added to the DB,
    // They are only referenced in the post_type column with a post entry,
    // when you add a post of this CPT.
    dfh_register_resource_type();
    dfh_register_toolkit_type();
    // ATTENTION: This is *only* done during plugin activation hook
    // You should *NEVER EVER* do this on every page load!
    flush_rewrite_rules();
}

add_action('init', 'dfh_register_resource_type');
function dfh_register_resource_type() {
    // see https://developer.wordpress.org/plugins/post-types/registering-custom-post-types/
    register_post_type(DFH_CONTENT_TYPE_RESOURCE, array(
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
        'menu_icon'           => 'dashicons-image-filter',
        'template'            => array(array(DFH_TEMPLATE_BLOCK_RESOURCE)),
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
        'supports'            => array('title', 'editor'),
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
        'template'            => array(array(DFH_TEMPLATE_BLOCK_TOOLKIT)),
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
