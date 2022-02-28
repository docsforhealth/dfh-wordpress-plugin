import { setDefaultBlockName } from '@wordpress/blocks';
import { addFilter } from '@wordpress/hooks';
import _ from 'lodash';
import * as Constants from 'src/js/constants';

// hides all non-DFH blocks
// from https://github.com/WordPress/gutenberg/issues/11723#issuecomment-441828833
addFilter(
  'blocks.registerBlockType',
  Constants.NAMESPACE,
  (blockSettings, blockName) => {
    const allowedCoreBlocks = {
      [Constants.CORE_BLOCK_LIST]: Constants.CATEGORY_COMMON,
      [Constants.CORE_BLOCK_QUOTE]: Constants.CATEGORY_COMMON,

      [Constants.CORE_BLOCK_COLUMNS]: Constants.CATEGORY_LAYOUT,
      [Constants.CORE_BLOCK_SEPARATOR]: Constants.CATEGORY_LAYOUT, // TODO fix styling
      [Constants.CORE_BLOCK_SPACER]: Constants.CATEGORY_LAYOUT, // TODO fix styling
      [Constants.CORE_BLOCK_TABLE]: Constants.CATEGORY_LAYOUT, // TODO test styling

      [Constants.CORE_BLOCK_AUDIO]: Constants.CATEGORY_MEDIA,
      [Constants.CORE_BLOCK_EMBED]: Constants.CATEGORY_MEDIA,
      [Constants.CORE_BLOCK_GALLERY]: Constants.CATEGORY_MEDIA,
      [Constants.CORE_BLOCK_IMAGE]: Constants.CATEGORY_MEDIA,
      [Constants.CORE_BLOCK_VIDEO]: Constants.CATEGORY_MEDIA,
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
window.onload = function () {
  setDefaultBlockName(Constants.BLOCK_TEXT);
};
