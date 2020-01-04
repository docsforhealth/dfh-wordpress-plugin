<?php

register_block_type('dfh/taxonomy-count', array(
    'render_callback' => 'dfh_dynamic_render_taxonomy_count',
    'attributes'      => array(
        'taxonomyId'   => array('type' => 'string', 'default' => DFH_TAXONOMY_RESOURCE),
    ),
));

function dfh_dynamic_render_taxonomy_count($attributes) {
    $tax_id = $attributes['taxonomyId'];

    $num_terms = count(get_terms(array(
        'taxonomy' => $tax_id,
        'hide_empty' => false,
    )));
    $taxonomy = get_taxonomy($tax_id);
    $name = strtolower($taxonomy->labels->name);
    $singular_name = strtolower($taxonomy->labels->singular_name);

    return $num_terms . ' ' .($num_terms == 1 ? $singular_name : $name);
}
