<?php

// see https://developer.wordpress.org/reference/hooks/register_taxonomy_args/
// see https://developer.wordpress.org/reference/functions/register_taxonomy/
add_filter('register_taxonomy_args', 'dfh_alter_default_taxonomies', 10, 3);
function dfh_alter_default_taxonomies($args, $taxonomy, $object_type) {
    if (in_array($taxonomy, array('category', 'post_tag'))) {
        $args['public']             = false;
        $args['publicly_queryable'] = false;
        $args['show_ui']            = false;
        $args['show_in_menu']       = false;
        $args['show_in_nav_menus']  = false; // This is what hides in Menu customizer
        $args['show_in_rest']       = false;
        $args['show_tagcloud']      = false;
        $args['show_in_quick_edit'] = false;
        $args['show_admin_column']  = false;
    }
    return $args;
}
