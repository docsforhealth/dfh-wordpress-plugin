<?php

register_block_type('dfh/dot-phrase-detail-info', array(
    'render_callback' => 'dfh_dynamic_render_dot_phrase_detail_info',
));

function dfh_dynamic_render_dot_phrase_detail_info($attributes) {
    // see https://developer.wordpress.org/reference/functions/get_post/
    $dot_phrase = get_post();
    // see https://developer.wordpress.org/reference/functions/wp_get_post_terms/
    $categories = wp_get_post_terms($dot_phrase->ID, DFH_TAXONOMY_DOT_PHRASE_CATEGORY);
    // see https://davidyeiser.com/tutorial/creating-custom-dynamic-gutenberg-block-wordpress-part1#6-setting-up-a-dynamic-block
    ob_start(); // Turn on output buffering
    /* BEGIN HTML OUTPUT */
    ?>
    <h1 class="heading heading--2">
        <a href="<?php echo dfh_get_dot_phrases_overview_url(); ?>" class="heading__nav">
            <img src="<?php echo esc_url(plugins_url('/assets/images/icon-arrow.svg', DFH_PLUGIN_ROOT)); ?>"
                class="heading__nav__image"
                alt="Back arrow to return to all dot phrases page">
            <span class="heading__nav__text">
                <?php echo esc_html(__('All dot phrases', DFH_TEXT_DOMAIN)); ?>
            </span>
        </a>
        <?php echo esc_html($dot_phrase->post_title); ?>
    </h1>
    <?php if (count($categories) > 0): ?>
        <ul class="list list--unstyled margin-b-1">
            <?php foreach ($categories as $category):?>
                <?php
                    // Closing `li` tag is optional. Omit closing tag to solve `inline-block` extra spacing issue
                    // see. https://stackoverflow.com/a/5078297
                ?>
                <li class="tag"><?php echo esc_html($category->name); ?>
            <?php endforeach ?>
        </ul>
    <?php endif ?>
    <?php
    /* END HTML OUTPUT */
    $output = ob_get_contents(); // collect output
    ob_end_clean(); // Turn off ouput buffer
    return $output; // Print output
}
