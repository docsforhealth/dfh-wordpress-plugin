<?php

function dfh_get_resources_overview_url() {
    $fallback = 'javascript:history.back()';
    if (defined('DFH_THEME_MOD_RESOURCE_OVERVIEW_LOCATION')) {
        $page_id = get_theme_mod(DFH_THEME_MOD_RESOURCE_OVERVIEW_LOCATION);
        return $page_id ? esc_url(get_page_link($page_id)) : $fallback;
    }
    else {
        return $fallback;
    }
}

function dfh_get_toolkits_overview_url() {
    $fallback = 'javascript:history.back()';
    if (defined('DFH_THEME_MOD_TOOLKIT_OVERVIEW_LOCATION')) {
        $page_id = get_theme_mod(DFH_THEME_MOD_TOOLKIT_OVERVIEW_LOCATION);
        return $page_id ? esc_url(get_page_link($page_id)) : $fallback;
    }
    else {
        return $fallback;
    }
}
