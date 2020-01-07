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
    const allowedCoreBlocks = {
      'core/list': Constants.CATEGORY_COMMON,

      'core/separator': Constants.CATEGORY_LAYOUT,
      'core/spacer': Constants.CATEGORY_LAYOUT,

      'core/audio': Constants.CATEGORY_MEDIA,
      'core/gallery': Constants.CATEGORY_MEDIA,
      'core/image': Constants.CATEGORY_MEDIA,
      'core/video': Constants.CATEGORY_MEDIA,
    };
    if (allowedCoreBlocks[blockName]) {
      return _.assign({}, blockSettings, {
        category: allowedCoreBlocks[blockName],
      });
    } else {
      // If not special whitelisted core blocks, then only allow custom DFH blocks
      return _.startsWith(blockName, Constants.NAMESPACE)
        ? blockSettings
        : _.assign({}, blockSettings, {
            supports: _.assign({}, blockSettings.supports, { inserter: false }),
          });
    }
  },
);
// sets the default block to the `dfh/text` block
// see https://developer.wordpress.org/block-editor/packages/packages-blocks/#setDefaultBlockName
window.onload = function() {
  setDefaultBlockName(Constants.BLOCK_TEXT);
};
