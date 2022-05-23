<?php

// see https://connekthq.com/plugins/ajax-load-more/docs/filter-hooks/

add_filter('alm_speed', 'dfh_alm_speed');
function dfh_alm_speed(){
    return 50; // default = 250;
}

// NOTE no need to add `_alm_disable_css` because css is disabled already because we include a
// CSS file in the correct location in our theme folder.
// see https://connekthq.com/plugins/ajax-load-more/docs/css-stylesheets/
add_filter('alm_settings', 'dfh_alm_global_settings');
function dfh_alm_global_settings($options) {
    // container is `div` instead of `ul`
    // see https://github.com/dcooney/wordpress-ajax-load-more/blob/cc2de2b732f26a4d84edaa3a8c051a07d5fc0175/core/classes/class-alm-shortcode.php#L401
    $options['_alm_container_type'] = 2;
    // specifies whether or not the loading style is a button or infinite scroll
    // class names specified here are added to `div.ajax-load-more-wrap`
    // to preview styles, inspect this page: https://connekthq.com/plugins/ajax-load-more/docs/loading-styles/
    $options['_alm_btn_color']      = 'default';
    $options['_alm_inline_css']     = 1;
    $options['_alm_scroll_top']     = 1;
    $options['_alm_error_notices']  = 1;
    return $options;
}
