<?php

// see https://wordpress.stackexchange.com/a/293203
add_action('wp_dashboard_setup', 'dfh_remove_draft_widget', 999);
function dfh_remove_draft_widget() {
    remove_meta_box('dashboard_quick_press', 'dashboard', 'side');
}

// Remove default post type from the "Add item" menu of the nav menu section of theme customizer
// see https://developer.wordpress.org/reference/hooks/register_post_type_args/
// see https://wordpress.stackexchange.com/a/355679
add_filter('register_post_type_args', 'dfh_alter_default_post_type_args', 10, 2);
function dfh_alter_default_post_type_args($args, $post_type) {
    if ($post_type == 'post') {
        $args['public']              = false;
        $args['show_ui']             = false;
        $args['show_in_menu']        = false;
        $args['show_in_admin_bar']   = false;
        $args['show_in_nav_menus']   = false; // This is what hides in Menu customizer
        $args['can_export']          = false;
        $args['has_archive']         = false;
        $args['exclude_from_search'] = true;
        $args['publicly_queryable']  = false;
        $args['show_in_rest']        = false;
    }
    return $args;
}
