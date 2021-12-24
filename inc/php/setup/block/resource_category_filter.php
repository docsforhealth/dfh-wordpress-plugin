<?php

// [FUTURE] Note that passing props to a PHP dynamic block from Javascript does not work
// BUT you can still pass information via the attributes set in the Javascript `edit` hook
// Therefore, the below attributes are for reference

register_block_type('dfh/resource-category-filter', array(
    'render_callback' => 'dfh_dynamic_render_resource_category_filter',
    'attributes'      => array(
        'taxonomyId'          => array('type' => 'string', 'default' => DFH_TAXONOMY_RESOURCE),
        'maxNumToShow'        => array('type' => 'number', 'default' => 9),
        'listClassName'       => array('type' => 'string', 'default' => 'resource-categories__list'),
        'itemClassName'       => array('type' => 'string', 'default' => 'resource-categories__category'),
        'activeItemClassName' => array('type' => 'string', 'default' => 'resource-categories__category--active'),
    ),
));

function dfh_dynamic_render_resource_category_filter($attributes) {
    $tax_id = $attributes['taxonomyId'];
    $item_class = $attributes['itemClassName'];
    $active_class = $attributes['activeItemClassName'];

    $terms = get_terms(array(
        'taxonomy'   => $tax_id,
        'hide_empty' => false,
        'number'     => $attributes['maxNumToShow'],
    ));
    $taxonomy = get_taxonomy($tax_id);
    // data attributes used to support the frontend script in `frontend.js`
    // Names are for building the message about currently-selected categories
    // Active class is for easy toggling of what is active and what is not
    $name = $taxonomy ? strtolower($taxonomy->labels->name) : '';
    $singular_name = $taxonomy ? strtolower($taxonomy->labels->singular_name) : '';

    // see https://davidyeiser.com/tutorial/creating-custom-dynamic-gutenberg-block-wordpress-part1#6-setting-up-a-dynamic-block
    ob_start(); // Turn on output buffering
    /* BEGIN HTML OUTPUT */
    ?>
    <ul
        class="<?php echo esc_attr($attributes['listClassName']); ?>"
        data-name="<?php echo esc_attr($name); ?>"
        data-singular-name="<?php echo esc_attr($singular_name); ?>"
        data-item-class="<?php echo esc_attr($item_class); ?>"
        data-active-class="<?php echo esc_attr($active_class); ?>"
        data-taxonomy="<?php echo esc_attr($tax_id); ?>"
    >
        <?php foreach ($terms as $term): ?>
            <li>
                <button
                    type="button"
                    class="<?php echo esc_attr($item_class); ?> <?php echo esc_attr($active_class); ?>"
                    data-taxonomy-slug="<?php echo esc_attr($term->slug); ?>"
                >
                    <?php echo esc_html($term->name); ?>
                </button>
            </li>
        <?php endforeach ?>
    </ul>
    <?php
    /* END HTML OUTPUT */
    $output = ob_get_contents(); // collect output
    ob_end_clean(); // Turn off ouput buffer
    return $output; // Print output
}
