<?php

// https://developer.wordpress.org/block-editor/reference-guides/filters/editor-filters/#block-directory
remove_action( 'enqueue_block_editor_assets', 'wp_enqueue_editor_block_directory_assets' );
