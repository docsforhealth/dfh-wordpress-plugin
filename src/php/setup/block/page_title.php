<?php

register_block_type('dfh/page-title', array(
    'render_callback' => 'dfh_dynamic_render_page_title',
));

function dfh_dynamic_render_page_title() {
    // `get_post` used for every type of entity, including posts, pages, and custom types
    // see https://developer.wordpress.org/reference/functions/get_post/
    $entity = get_post();
    return $entity->post_title;
}
