<?php

register_block_type('dfh/toolkit-detail-header', array(
    'render_callback' => 'dfh_dynamic_render_toolkit_detail_header',
    'attributes'      => array(
        'allToolkitsLabel' => array('type' => 'string', 'default' => __('All toolkits', DFH_TEXT_DOMAIN)),
    ),
));

function dfh_dynamic_render_toolkit_detail_header($attributes) {
    $all_toolkits_label = $attributes['allToolkitsLabel'];
    // see https://developer.wordpress.org/reference/functions/get_post/
    $toolkit = get_post();
    // see https://davidyeiser.com/tutorial/creating-custom-dynamic-gutenberg-block-wordpress-part1#6-setting-up-a-dynamic-block
    ob_start(); // Turn on output buffering
    /* BEGIN HTML OUTPUT */
    ?>
    <div class="toolkit-detail-container__header">
        <h1 class="heading heading--3">
            <a href="<?php echo dfh_get_toolkits_overview_url(); ?>" class="heading__nav">
                <img src="<?php echo esc_url(plugins_url('/assets/images/icon-arrow.svg', DFH_PLUGIN_ROOT)); ?>"
                    class="heading__nav__image"
                    alt="Back arrow to return to all toolkits page">
                <span class="heading__nav__text">
                    <?php echo esc_html($all_toolkits_label); ?>
                </span>
            </a>
            <span class="heading--one-line heading--bold">
                <?php echo esc_html($toolkit->post_title); ?>
            </span>
        </h1>
    </div>
    <?php
    /* END HTML OUTPUT */
    $output = ob_get_contents(); // collect output
    ob_end_clean(); // Turn off ouput buffer
    return $output; // Print output
}
