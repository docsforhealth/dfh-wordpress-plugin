<?php

remove_theme_support('core-block-patterns');

// https://developer.wordpress.org/block-editor/reference-guides/filters/editor-filters/#should_load_remote_block_patterns
add_filter( 'should_load_remote_block_patterns', '__return_false' );
