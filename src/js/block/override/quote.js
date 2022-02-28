import { addFilter } from '@wordpress/hooks';
import _ from 'lodash';
import * as Constants from 'src/js/constants';

// An overview of how to override a block using filters
//    see https://css-tricks.com/a-crash-course-in-wordpress-block-filters/
// Source code: https://github.com/WordPress/gutenberg/tree/trunk/packages/block-library/src/quote

addFilter(
  'blocks.registerBlockType',
  `${Constants.NAMESPACE}/block-core-quote/edit-config`,
  (settings, name) => {
    if (name !== Constants.CORE_BLOCK_QUOTE) {
      return settings;
    }
    // see https://github.com/WordPress/gutenberg/blob/trunk/packages/block-library/src/quote/block.json
    return _.assign({}, settings, {
      // remove support for typography settings and anchor tag customization
      supports: {},
      // customize style variations
      styles: [
        {
          name: 'default',
          label: 'Default',
          isDefault: true,
        },
        { name: 'large-text', label: 'Large Text' },
      ],
    });
  },
);
