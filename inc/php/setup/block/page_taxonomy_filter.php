<?php

// NOTE: setting `attributes` in the PHP registration function is to provide default values
// While we can update attributes in the JS `edit` hook because these values are persisted to
// the WordPress database, specifying default values in the JS file will NOT be reflected in
// this PHP file as default values in the JS file are NOT actually set and persisted to the database
// see: https://awhitepixel.com/blog/wordpress-gutenberg-create-custom-block-part-9-dynamic-blocks-php-render/

register_block_type('dfh/page-taxonomy-filter', array(
    'api_version' => 2,
    'render_callback' => 'dfh_dynamic_render_page_taxonomy_filter',
    'attributes'      => array(
        'taxonomyId'           => array('type' => 'string', 'default' => DFH_TAXONOMY_RESOURCE),
        'maxNumToShow'         => array('type' => 'number', 'default' => 9),
        'className'            => array('type' => 'string', 'default' => 'page-taxonomy'),
        'openClassName'        => array('type' => 'string', 'default' => 'page-taxonomy--open'),
        'toggleClassName'      => array('type' => 'string', 'default' => 'page-taxonomy__toggle'),
        'listClassName'        => array('type' => 'string', 'default' => 'page-taxonomy__list'),
        'itemClassName'        => array('type' => 'string', 'default' => 'page-taxonomy__category'),
        'activeItemClassName'  => array('type' => 'string', 'default' => 'page-taxonomy__category--active'),
        // used by accompanying frontend script to update labels with number of categories selected
        'updateLabelClassName' => array('type' => 'string', 'default' => ''),
        // used by accompnaying frontend script to bind change handler to search bar
        'searchClassName' => array('type' => 'string', 'default' => ''),
    ),
));

function dfh_dynamic_render_page_taxonomy_filter($attributes) {
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
    <div class="<?php echo esc_attr($attributes['className']); ?>">
        <button
            type="button"
            class="<?php echo esc_attr($attributes['toggleClassName']) . " " . esc_attr($attributes['updateLabelClassName']); ?>"
            data-toggle-container-class="<?php echo esc_attr($attributes['className']); ?>"
            data-toggle-container-open-class="<?php echo esc_attr($attributes['openClassName']); ?>"
        >
            <!-- Label for this toggle button dynamically updated in corresponding frontend JS script -->
            Loading...
        </button>
        <ul
            class="<?php echo esc_attr($attributes['listClassName']); ?>"
            data-taxonomy-plural-name="<?php echo esc_attr($name); ?>"
            data-taxonomy-singular-name="<?php echo esc_attr($singular_name); ?>"
            data-taxonomy-item-class="<?php echo esc_attr($item_class); ?>"
            data-taxonomy-active-class="<?php echo esc_attr($active_class); ?>"
            data-taxonomy-id="<?php echo esc_attr($tax_id); ?>"
            data-taxonomy-update-label-class="<?php echo esc_attr($attributes['updateLabelClassName']); ?>"
            data-taxonomy-search-input-class="<?php echo esc_attr($attributes['searchClassName']); ?>"
        >
            <?php foreach ($terms as $term): ?>
                <li>
                    <button
                        type="button"
                        class="<?php echo esc_attr($item_class) . " " . esc_attr($active_class); ?>"
                        data-taxonomy-term-slug="<?php echo esc_attr($term->slug); ?>"
                    >
                        <?php echo esc_html($term->name); ?>
                    </button>
                </li>
            <?php endforeach ?>
        </ul>
    </div>
    <?php
    /* END HTML OUTPUT */
    $output = ob_get_contents(); // collect output
    ob_end_clean(); // Turn off ouput buffer
    return $output; // Print output
}
