<?php

register_block_type('dfh/resource-detail-info', array(
    'render_callback' => 'dfh_dynamic_render_resource_detail_info',
    'attributes'      => array(
        'allResourcesLabel' => array('type' => 'string', 'default' => __('All resources', DFH_TEXT_DOMAIN)),
    ),
));

function dfh_dynamic_render_resource_detail_info($attributes) {
    $all_resources_label = $attributes['allResourcesLabel'];
    // see https://developer.wordpress.org/reference/functions/get_post/
    $resource = get_post();
    // see https://developer.wordpress.org/reference/functions/wp_get_post_terms/
    $terms = wp_get_post_terms($resource->ID, DFH_TAXONOMY_RESOURCE);
    // see https://davidyeiser.com/tutorial/creating-custom-dynamic-gutenberg-block-wordpress-part1#6-setting-up-a-dynamic-block
    ob_start(); // Turn on output buffering
    /* BEGIN HTML OUTPUT */
    ?>
    <h1 class="heading heading--2">
        <a href="<?php echo dfh_get_resources_overview_url(); ?>" class="heading__nav">
            <img src="<?php echo esc_url(plugins_url('/assets/images/icon-arrow.svg', DFH_PLUGIN_ROOT)); ?>"
                class="heading__nav__image"
                alt="Back arrow to return to all resources page">
            <span class="heading__nav__text">
                <?php echo esc_html($all_resources_label); ?>
            </span>
        </a>
        <?php echo esc_html($resource->post_title); ?>
    </h1>
    <?php if (count($terms) > 0): ?>
        <ul class="list list--unstyled margin-b-1">
            <?php foreach ($terms as $term): ?>
                <li class="tag">
                    <?php echo esc_html($term->name); ?>
                </li>
            <?php endforeach ?>
        </ul>
    <?php endif ?>
    <?php
    /* END HTML OUTPUT */
    $output = ob_get_contents(); // collect output
    ob_end_clean(); // Turn off ouput buffer
    return $output; // Print output
}
