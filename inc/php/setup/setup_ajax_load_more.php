<?php

// see https://connekthq.com/plugins/ajax-load-more/docs/filter-hooks/

add_filter('alm_speed', 'dfh_alm_speed');
function dfh_alm_speed(){
   return 100; // default = 250;
}

add_filter('alm_settings', 'dfh_alm_global_settings');
function dfh_alm_global_settings($options) {
    $options['_alm_container_type'] = 2;
    $options['_alm_disable_css']    = 0;
    $options['_alm_btn_color']      = 'infinite fading-circles';
    $options['_alm_inline_css']     = 1;
    $options['_alm_scroll_top']     = 1;
    $options['_alm_error_notices']  = 1;
    return $options;
}
