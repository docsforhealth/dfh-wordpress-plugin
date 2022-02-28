import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import _ from 'lodash';
import * as Constants from 'src/js/constants';

// An overview of how to override a block using filters
//    see https://css-tricks.com/a-crash-course-in-wordpress-block-filters/
// Source code: https://github.com/WordPress/gutenberg/tree/trunk/packages/block-library/src/quote

// 1. Edit block attributes
addFilter(
  'blocks.registerBlockType',
  `${Constants.NAMESPACE}/block-core-separator/edit-config`,
  (settings, name) => {
    if (name !== Constants.CORE_BLOCK_SEPARATOR) {
      return settings;
    }
    // see https://github.com/WordPress/gutenberg/blob/trunk/packages/block-library/src/quote/block.json
    return _.assign({}, settings, {
      // remove support for typography settings and anchor tag customization
      supports: {},
      // remove style variations
      styles: [],
    });
  },
);
