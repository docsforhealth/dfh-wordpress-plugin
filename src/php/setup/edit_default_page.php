<?php

// Remove default post type from the "Add item" menu of the nav menu section of theme customizer
// see https://developer.wordpress.org/reference/hooks/register_post_type_args/
// see https://wordpress.stackexchange.com/a/355679
add_filter('register_post_type_args', 'dfh_alter_default_page_type_args', 10, 2);
function dfh_alter_default_page_type_args($args, $post_type) {
    if ($post_type == 'page') {
        // Ensure that all blocks for a page are automatically wrapped in a content width container
        // see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-templates/
        $args['template'] = array(
            array(
                DFH_TEMPLATE_BLOCK_PAGE,
                array(
                    'options' => array(
                        array(
                            'title' => __('Content Page', DFH_TEXT_DOMAIN),
                            'description' => __('A new page with auto-adjusting width for user-generated content', DFH_TEXT_DOMAIN),
                            'template' => array(
                                array('dfh/content-width-container', array(), array(array('dfh/text')))
                            ),
                        ),
                        array(
                            'title' => __('Custom Data Type Page', DFH_TEXT_DOMAIN),
                            'description' => __('An overview page for a custom data type with accompanying FAQs', DFH_TEXT_DOMAIN),
                            'template' => array(
                                array('dfh/page-faq-container')
                            ),
                        ),
                        array(
                            'title' => __('Blank Page', DFH_TEXT_DOMAIN),
                            'description' => __('A completely blank new page without any pre-built formatting', DFH_TEXT_DOMAIN),
                            'template' => array(),
                        ),
                    ),
                ),
            ),
        );
    }
    return $args;
}
