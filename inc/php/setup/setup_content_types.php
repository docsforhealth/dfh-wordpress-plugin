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
    dfh_register_dot_phrase_type();
    // ATTENTION: This is *only* done during plugin activation hook
    // You should *NEVER EVER* do this on every page load!
    flush_rewrite_rules();
}

add_action('init', 'dfh_register_resource_type');
function dfh_register_resource_type() {
    // see https://developer.wordpress.org/plugins/post-types/registering-custom-post-types/
    register_post_type(DFH_CONTENT_TYPE_RESOURCE, array(
        'description'         => 'Form or letter resource',
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
        'template_lock'       => 'insert',
        'labels'              => array(
            'add_new'                  => __('Add New', DFH_TEXT_DOMAIN),
            'add_new_item'             => __('Add New Resource', DFH_TEXT_DOMAIN),
            'all_items'                => __('Resources', DFH_TEXT_DOMAIN),
            'archives'                 => __('Resources', DFH_TEXT_DOMAIN),
            'attributes'               => __('Resource Attributes', DFH_TEXT_DOMAIN),
            'edit_item'                => __('Edit Resource', DFH_TEXT_DOMAIN),
            'featured_image'           => __('Featured image', DFH_TEXT_DOMAIN),
            'filter_by_date'           => __('Filter by date', DFH_TEXT_DOMAIN),
            'filter_items_list'        => __('Filter resources list', DFH_TEXT_DOMAIN),
            'insert_into_item'         => __('Insert into resource', DFH_TEXT_DOMAIN),
            'item_link'                => __('Resource Link', DFH_TEXT_DOMAIN),
            'item_link_description'    => __('A link to a resource.', DFH_TEXT_DOMAIN),
            'item_published'           => __('Resource published.', DFH_TEXT_DOMAIN),
            'item_published_privately' => __('Resource published privately.', DFH_TEXT_DOMAIN),
            'item_reverted_to_draft'   => __('Resource reverted to draft.', DFH_TEXT_DOMAIN),
            'item_scheduled'           => __('Resource scheduled.', DFH_TEXT_DOMAIN),
            'item_updated'             => __('Resource updated.', DFH_TEXT_DOMAIN),
            'items_list'               => __('Resources list', DFH_TEXT_DOMAIN),
            'items_list_navigation'    => __('Resources list navigation', DFH_TEXT_DOMAIN),
            'menu_name'                => __('Resources', DFH_TEXT_DOMAIN),
            'name'                     => __('Resources', DFH_TEXT_DOMAIN),
            'name_admin_bar'           => __('Resource', DFH_TEXT_DOMAIN),
            'new_item'                 => __('New Resource', DFH_TEXT_DOMAIN),
            'not_found'                => __('No Resources found', DFH_TEXT_DOMAIN),
            'not_found_in_trash'       => __('No Resources found in Trash', DFH_TEXT_DOMAIN),
            'parent_item_colon'        => __('Parent Resource:', DFH_TEXT_DOMAIN),
            'remove_featured_image'    => __('Remove featured image', DFH_TEXT_DOMAIN),
            'search_items'             => __('Search for a resource...', DFH_TEXT_DOMAIN),
            'set_featured_image'       => __('Set featured image', DFH_TEXT_DOMAIN),
            'singular_name'            => __('Resource', DFH_TEXT_DOMAIN),
            'uploaded_to_this_item'    => __('Uploaded to this resource', DFH_TEXT_DOMAIN),
            'use_featured_image'       => __('Use as featured image', DFH_TEXT_DOMAIN),
            'view_item'                => __('View Resource', DFH_TEXT_DOMAIN),
            'view_items'               => __('View Resources', DFH_TEXT_DOMAIN),
        ),
    ));
    // see https://developer.wordpress.org/plugins/taxonomies/working-with-custom-taxonomies/
    register_taxonomy(DFH_TAXONOMY_RESOURCE, DFH_CONTENT_TYPE_RESOURCE, array(
        'hierarchical'          => false,
        'show_ui'               => true,
        'show_admin_column'     => true,
        'query_var'             => true,
        'show_in_rest'          => true,
        'rewrite'               => array('slug' => 'resource-categories'),
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
    register_taxonomy(DFH_TAXONOMY_RESOURCE_TYPE, DFH_CONTENT_TYPE_RESOURCE, array(
        'hierarchical'          => false,
        'show_ui'               => true,
        'show_admin_column'     => true,
        'query_var'             => true,
        'show_in_rest'          => true,
        'rewrite'               => array('slug' => 'resource-content-types'),
        'labels'                => array(
            'name'                       => __('Content Types', DFH_TEXT_DOMAIN),
            'singular_name'              => __('Content Type', DFH_TEXT_DOMAIN),
            'search_items'               => __('Content Types', DFH_TEXT_DOMAIN),
            'popular_items'              => __('Popular Content Types', DFH_TEXT_DOMAIN),
            'all_items'                  => __('All Content Types', DFH_TEXT_DOMAIN),
            'edit_item'                  => __('Edit Content Type', DFH_TEXT_DOMAIN),
            'update_item'                => __('Update Content Type', DFH_TEXT_DOMAIN),
            'add_new_item'               => __('Add New Content Type', DFH_TEXT_DOMAIN),
            'new_item_name'              => __('New Content Type Name', DFH_TEXT_DOMAIN),
            'separate_items_with_commas' => __('Separate Content Types with commas', DFH_TEXT_DOMAIN),
            'add_or_remove_items'        => __('Add or remove Content Types', DFH_TEXT_DOMAIN),
            'choose_from_most_used'      => __('Choose from most used Content Types', DFH_TEXT_DOMAIN),
            'not_found'                  => __('No Content Types found', DFH_TEXT_DOMAIN),
            'menu_name'                  => __('Content Types', DFH_TEXT_DOMAIN),
            'back_to_items'              => __('Back to Content Types', DFH_TEXT_DOMAIN),
        ),
    ));
}

add_action('init', 'dfh_register_toolkit_type');
function dfh_register_toolkit_type() {
    // see https://developer.wordpress.org/plugins/post-types/registering-custom-post-types/
    register_post_type(DFH_CONTENT_TYPE_TOOLKIT, array(
        'description'         => 'Educational toolkit with text and rich media content',
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
        'template_lock'       => 'insert',
        'labels'              => array(
            'add_new'                  => __('Add New', DFH_TEXT_DOMAIN),
            'add_new_item'             => __('Add New Toolkit', DFH_TEXT_DOMAIN),
            'all_items'                => __('Toolkits', DFH_TEXT_DOMAIN),
            'archives'                 => __('Toolkits', DFH_TEXT_DOMAIN),
            'attributes'               => __('Toolkit Attributes', DFH_TEXT_DOMAIN),
            'edit_item'                => __('Edit Toolkit', DFH_TEXT_DOMAIN),
            'featured_image'           => __('Featured image', DFH_TEXT_DOMAIN),
            'filter_by_date'           => __('Filter by date', DFH_TEXT_DOMAIN),
            'filter_items_list'        => __('Filter toolkits list', DFH_TEXT_DOMAIN),
            'insert_into_item'         => __('Insert into toolkit', DFH_TEXT_DOMAIN),
            'item_link'                => __('Toolkit Link', DFH_TEXT_DOMAIN),
            'item_link_description'    => __('A link to a toolkit.', DFH_TEXT_DOMAIN),
            'item_published'           => __('Toolkit published.', DFH_TEXT_DOMAIN),
            'item_published_privately' => __('Toolkit published privately.', DFH_TEXT_DOMAIN),
            'item_reverted_to_draft'   => __('Toolkit reverted to draft.', DFH_TEXT_DOMAIN),
            'item_scheduled'           => __('Toolkit scheduled.', DFH_TEXT_DOMAIN),
            'item_updated'             => __('Toolkit updated.', DFH_TEXT_DOMAIN),
            'items_list'               => __('Toolkits list', DFH_TEXT_DOMAIN),
            'items_list_navigation'    => __('Toolkits list navigation', DFH_TEXT_DOMAIN),
            'menu_name'                => __('Toolkits', DFH_TEXT_DOMAIN),
            'name'                     => __('Toolkits', DFH_TEXT_DOMAIN),
            'name_admin_bar'           => __('Toolkit', DFH_TEXT_DOMAIN),
            'new_item'                 => __('New Toolkit', DFH_TEXT_DOMAIN),
            'not_found'                => __('No Toolkits found', DFH_TEXT_DOMAIN),
            'not_found_in_trash'       => __('No Toolkits found in Trash', DFH_TEXT_DOMAIN),
            'parent_item_colon'        => __('Parent Toolkit:', DFH_TEXT_DOMAIN),
            'remove_featured_image'    => __('Remove featured image', DFH_TEXT_DOMAIN),
            'search_items'             => __('Search for a toolkit...', DFH_TEXT_DOMAIN),
            'set_featured_image'       => __('Set featured image', DFH_TEXT_DOMAIN),
            'singular_name'            => __('Toolkit', DFH_TEXT_DOMAIN),
            'uploaded_to_this_item'    => __('Uploaded to this toolkit', DFH_TEXT_DOMAIN),
            'use_featured_image'       => __('Use as featured image', DFH_TEXT_DOMAIN),
            'view_item'                => __('View Toolkit', DFH_TEXT_DOMAIN),
            'view_items'               => __('View Toolkits', DFH_TEXT_DOMAIN),
        ),
    ));
}

add_action('init', 'dfh_register_dot_phrase_type');
function dfh_register_dot_phrase_type() {
    // see https://developer.wordpress.org/plugins/post-types/registering-custom-post-types/
    register_post_type(DFH_CONTENT_TYPE_DOT_PHRASE, array(
        'description'         => 'Pre-made dot phrase with supporting research',
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
        'rewrite'             => array('slug' => 'dot-phrases', 'with_front' => false),
        'menu_icon'           => 'dashicons-format-status',
        'template'            => array(array(DFH_TEMPLATE_BLOCK_DOT_PHRASE)),
        'template_lock'       => 'insert',
        'labels'              => array(
            'add_new'                  => __('Add New', DFH_TEXT_DOMAIN),
            'add_new_item'             => __('Add New Dot Phrase', DFH_TEXT_DOMAIN),
            'all_items'                => __('Dot Phrases', DFH_TEXT_DOMAIN),
            'archives'                 => __('Dot Phrases', DFH_TEXT_DOMAIN),
            'attributes'               => __('Dot Phrase Attributes', DFH_TEXT_DOMAIN),
            'edit_item'                => __('Edit Dot Phrase', DFH_TEXT_DOMAIN),
            'featured_image'           => __('Featured image', DFH_TEXT_DOMAIN),
            'filter_by_date'           => __('Filter by date', DFH_TEXT_DOMAIN),
            'filter_items_list'        => __('Filter dot phrases list', DFH_TEXT_DOMAIN),
            'insert_into_item'         => __('Insert into dot phrase', DFH_TEXT_DOMAIN),
            'item_link'                => __('Dot Phrase Link', DFH_TEXT_DOMAIN),
            'item_link_description'    => __('A link to a dot phrase.', DFH_TEXT_DOMAIN),
            'item_published'           => __('Dot Phrase published.', DFH_TEXT_DOMAIN),
            'item_published_privately' => __('Dot Phrase published privately.', DFH_TEXT_DOMAIN),
            'item_reverted_to_draft'   => __('Dot Phrase reverted to draft.', DFH_TEXT_DOMAIN),
            'item_scheduled'           => __('Dot Phrase scheduled.', DFH_TEXT_DOMAIN),
            'item_updated'             => __('Dot Phrase updated.', DFH_TEXT_DOMAIN),
            'items_list'               => __('Dot Phrases list', DFH_TEXT_DOMAIN),
            'items_list_navigation'    => __('Dot Phrases list navigation', DFH_TEXT_DOMAIN),
            'menu_name'                => __('Dot Phrases', DFH_TEXT_DOMAIN),
            'name'                     => __('Dot Phrases', DFH_TEXT_DOMAIN),
            'name_admin_bar'           => __('Dot Phrase', DFH_TEXT_DOMAIN),
            'new_item'                 => __('New Dot Phrase', DFH_TEXT_DOMAIN),
            'not_found'                => __('No Dot Phrases found', DFH_TEXT_DOMAIN),
            'not_found_in_trash'       => __('No Dot Phrases found in Trash', DFH_TEXT_DOMAIN),
            'parent_item_colon'        => __('Parent Dot Phrase:', DFH_TEXT_DOMAIN),
            'remove_featured_image'    => __('Remove featured image', DFH_TEXT_DOMAIN),
            'search_items'             => __('Search for a dot phrase...', DFH_TEXT_DOMAIN),
            'set_featured_image'       => __('Set featured image', DFH_TEXT_DOMAIN),
            'singular_name'            => __('Dot Phrase', DFH_TEXT_DOMAIN),
            'uploaded_to_this_item'    => __('Uploaded to this dot phrase', DFH_TEXT_DOMAIN),
            'use_featured_image'       => __('Use as featured image', DFH_TEXT_DOMAIN),
            'view_item'                => __('View Dot Phrase', DFH_TEXT_DOMAIN),
            'view_items'               => __('View Dot Phrases', DFH_TEXT_DOMAIN),
        ),
    ));
    register_taxonomy(DFH_TAXONOMY_DOT_PHRASE_CATEGORY, DFH_CONTENT_TYPE_DOT_PHRASE, array(
        'hierarchical'          => false,
        'show_ui'               => true,
        'show_admin_column'     => true,
        'query_var'             => true,
        'show_in_rest'          => true,
        'rewrite'               => array('slug' => 'dot-phrase-categories'),
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
