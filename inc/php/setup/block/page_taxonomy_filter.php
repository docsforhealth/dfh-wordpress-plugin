<?php

// NOTE: setting `attributes` in the PHP registration function is to provide default values
// While we can update attributes in the JS `edit` hook because these values are persisted to
// the WordPress database, specifying default values in the JS file will NOT be reflected in
// this PHP file as default values in the JS file are NOT actually set and persisted to the database
// see: https://awhitepixel.com/blog/wordpress-gutenberg-create-custom-block-part-9-dynamic-blocks-php-render/

// NOTE: unknown bug in WP 5.8.2 so that $block->context is always empty despite the JS edit component
// being able to successfully access the context object

register_block_type('dfh/page-taxonomy-filter', array(
    'api_version' => 2,
    'render_callback' => 'dfh_dynamic_render_page_taxonomy_filter',
    'attributes'      => array(
        'maxNumToShow'         => array('type' => 'number', 'default' => 9),
        'className'            => array('type' => 'string', 'default' => 'page-taxonomy'),
        'openClassName'        => array('type' => 'string', 'default' => 'page-taxonomy--open'),
        'toggleClassName'      => array('type' => 'string', 'default' => 'page-taxonomy__toggle'),
        'listClassName'        => array('type' => 'string', 'default' => 'page-taxonomy__list'),
        'itemClassName'        => array('type' => 'string', 'default' => 'page-taxonomy__item'),
        'activeItemClassName'  => array('type' => 'string', 'default' => 'page-taxonomy__item--active'),
        // used by accompanying frontend script to update labels with number of categories selected
        'updateLabelClassName' => array('type' => 'string', 'default' => ''),
        // id for this taxonomy filter element, for the `ajax-load-more` block to identify this one
        'htmlId'               => array('type' => 'string', 'default' => ''),
        // user selects a `taxonomyId` from one of the available taxonomies obtained THROUGH CONTEXT
        //      with key `CONTEXT_CONTENT_TYPE_INFO`
        // NOTE that if no available taxonomies still may have a selected taxonomyId because we
        // cannot update state from within the `edit` hook
        'taxonomyId'           => array('type' => 'string', 'default' => ''),
    ),
));

function dfh_dynamic_render_page_taxonomy_filter($attributes) {
    $tax_id = $attributes['taxonomyId'];
    $item_class = $attributes['itemClassName'];
    $active_class = $attributes['activeItemClassName'];
    // If no taxonomyId, then do not show filter
    // NOTE: should technically be using $block->context as described in https://developer.wordpress.org/block-editor/reference-guides/block-api/block-context/#php
    // but the block context is never populated in PHP in WordPress WordPress 5.8.2. Therefore, the workaround
    // is to use `useEffect` in the JS edit component to clear the taxonomy id when no
    // available taxonomies are present
    if ($tax_id == '') {
        return;
    }
    // if should display taxonomy filter, then get taxonomy terms
    $terms = get_terms(array(
        'taxonomy'   => $tax_id,
        'hide_empty' => false,
        'number'     => $attributes['maxNumToShow'],
    ));
    if (empty($terms)) {
        return;
    }
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
            id="<?php echo esc_attr($attributes['htmlId']); ?>"
            class="<?php echo esc_attr($attributes['listClassName']); ?>"
            data-taxonomy-plural-name="<?php echo esc_attr($name); ?>"
            data-taxonomy-singular-name="<?php echo esc_attr($singular_name); ?>"
            data-taxonomy-item-class="<?php echo esc_attr($item_class); ?>"
            data-taxonomy-active-class="<?php echo esc_attr($active_class); ?>"
            data-taxonomy-id="<?php echo esc_attr($tax_id); ?>"
            data-taxonomy-update-label-class="<?php echo esc_attr($attributes['updateLabelClassName']); ?>"
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
