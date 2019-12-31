<?php

// see https://wordpress.stackexchange.com/a/293203

add_action('admin_menu', 'dfh_remove_default_post_type');
function dfh_remove_default_post_type() {
    remove_menu_page('edit.php');
}

add_action('admin_bar_menu', 'dfh_remove_default_post_type_menu_bar', 999);
function dfh_remove_default_post_type_menu_bar($wp_admin_bar) {
    $wp_admin_bar->remove_node('new-post');
}

add_action('wp_dashboard_setup', 'dfh_remove_draft_widget', 999);
function dfh_remove_draft_widget() {
    remove_meta_box('dashboard_quick_press', 'dashboard', 'side');
}
