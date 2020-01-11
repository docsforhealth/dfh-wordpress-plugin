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

// depth-first search for block by name given array of blocks in a post's content
// see https://developer.wordpress.org/reference/functions/parse_blocks/#user-contributed-notes
function dfh_get_block(string $block_name, array $blocks) {
    $found_block = null;
    foreach ($blocks as $block) {
        if ($found_block) {
            return $found_block;
        }
        if ($block_name == $block['blockName']) {
            $found_block = $block;
        }
        else if ($block['innerBlocks']) {
            $found_block = dfh_get_block($block_name, $block['innerBlocks']);
        }
    }
    return $found_block;
}

function dfh_pluralize(int $num, string $singular, string $plural) {
    return esc_html($num == 1 ? $singular : $plural);
}
