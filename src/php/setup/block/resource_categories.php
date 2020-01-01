<?php

register_block_type('dfh/resource-categories', array(
    'render_callback' => 'dfh_dynamic_render_resource_categories',
    'attributes'      => array(
        'allResourcesUrl'   => array('type' => 'string', 'default' => 'javascript:history.back()'),
        'allResourcesTitle' => array('type' => 'string', 'default' => 'javascript:history.back()'),
    ),
));

function dfh_dynamic_render_resource_categories($attributes) {
    $all_resources_url = $attributes['allResourcesUrl'];
    // see https://wordpress.stackexchange.com/a/193000
    $terms = get_terms(array('taxonomy' => DFH_TAXONOMY_RESOURCE));
    $terms_resources = array();
    foreach ($terms as $term) {
        $terms_resources[$term->name] = get_posts(array(
            'posts_per_page' => 3,
            'post_type'      => DFH_CONTENT_TYPE_RESOURCE,
            'tax_query'      => array(
                array(
                    'taxonomy' => DFH_TAXONOMY_RESOURCE,
                    'field'    => 'slug',
                    'terms'    => $term->slug,
                ),
            )
        ));
    }
    // see https://davidyeiser.com/tutorial/creating-custom-dynamic-gutenberg-block-wordpress-part1#6-setting-up-a-dynamic-block
    ob_start(); // Turn on output buffering
    /* BEGIN HTML OUTPUT */
    ?>
    <section class="landing-categories">
        <div id="landing-categories-nav"
            class="landing-categories__nav">
            <button type="button"
                class="landing-categories__nav__arrow landing-categories__nav__arrow--back"></button>
            <ul class="landing-categories__nav__items">
                <?php foreach ($terms as $index => $term): ?>
                    <li class="landing-categories__nav__item"
                        data-slick-nav-target-id="landing-categories"
                        data-slick-nav-target-index="<?php echo $index; ?>"
                    >
                        <button
                            type="button"
                            class="landing-categories__nav__item__control"
                        >
                            <?php echo $term->name; ?>
                        </button>
                    </li>
                <?php endforeach ?>
            </ul>
            <button type="button" class="landing-categories__nav__arrow"></button>
        </div>
        <div id="landing-categories"
            class="landing-categories__slide-container"
            data-slick-active-class="landing-categories__nav__item--active"
            data-slick='<?php echo json_encode(array(
                "adaptiveHeight" => true,
                "arrows"         => true,
                "prevArrow"      => "#landing-categories-nav .landing-categories__nav__arrow--back",
                "nextArrow"      => "#landing-categories-nav .landing-categories__nav__arrow",
            )); ?>'
        >
            <?php foreach ($terms as $term): ?>
                <div><div class="landing-categories__slide">
                    <div class="landing-categories__slide__description">
                        <h3 class="heading heading--2">
                            <span class="heading__title">
                                <?php echo $term->name; ?>
                            </span>
                        </h3>
                        <p class="text margin-b-2">
                            <?php echo $term->description; ?>
                        </p>
                        <div class="button-container">
                            <a href="<?php echo $all_resources_url; ?>"
                                class="button-container__button button button--outline">
                                View all resources
                            </a>
                        </div>
                    </div>
                    <?php if (count($terms_resources[$term->name]) > 0): ?>
                        <ul class="landing-categories__slide__examples">
                            <?php foreach ($terms_resources[$term->name] as $resource): ?>
                                <li class="landing-categories__slide__example">
                                    <h4 class="heading heading--3">
                                        <a href="<?php echo get_permalink($resource->ID); ?>" class="link"
                                            ><?php echo $resource->post_title; ?></a
                                        >
                                    </h4>
                                    <?php if (strlen($resource->post_excerpt) > 0): ?>
                                        <p class="text">
                                            <?php echo $resource->post_excerpt; ?>
                                        </p>
                                    <?php endif ?>
                                </li>
                            <?php endforeach ?>
                        </ul>
                    <?php endif ?>
                </div></div>
            <?php endforeach ?>
        </div>
    </section>
    <?php
    /* END HTML OUTPUT */
    $output = ob_get_contents(); // collect output
    ob_end_clean(); // Turn off ouput buffer
    return $output; // Print output
}
