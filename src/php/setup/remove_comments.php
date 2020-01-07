<?php

// from https://wordpress.stackexchange.com/a/17936

// Removes from post and pages
add_action('init', 'dfh_remove_comment_support', 100);
function dfh_remove_comment_support() {
    remove_post_type_support('post', 'comments');
    remove_post_type_support('page', 'comments');
}

// Removes from admin menu
add_action('admin_menu', 'dfh_remove_comment_admin_menus');
function dfh_remove_comment_admin_menus() {
    remove_menu_page('edit-comments.php');
}

// Removes from admin bar
add_action('wp_before_admin_bar_render', 'dfh_remove_comment_admin_bar');
function dfh_remove_comment_admin_bar() {
    global $wp_admin_bar;
    $wp_admin_bar->remove_menu('comments');
}
