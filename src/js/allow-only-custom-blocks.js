import _ from 'lodash';
import { addFilter } from '@wordpress/hooks';
import { setDefaultBlockName } from '@wordpress/blocks';

import * as Constants from './constants';

// hides all non-DFH blocks
// from https://github.com/WordPress/gutenberg/issues/11723#issuecomment-441828833
addFilter(
  'blocks.registerBlockType',
  Constants.NAMESPACE,
  (blockSettings, blockName) => {
    return _.startsWith(blockName, Constants.NAMESPACE)
      ? blockSettings
      : _.assign({}, blockSettings, {
          supports: _.assign({}, blockSettings.supports, { inserter: false }),
        });
  },
);
// sets the default block to the `dfh/text` block
// see https://developer.wordpress.org/block-editor/packages/packages-blocks/#setDefaultBlockName
window.onload = function() {
  setDefaultBlockName(Constants.BLOCK_TEXT);
};
