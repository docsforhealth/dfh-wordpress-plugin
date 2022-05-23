import { addFilter } from '@wordpress/hooks';
import * as Constants from 'src/js/constants';

// allow reusable blocks category `reusable` to remain
const DEFAULT_CATEGORY_SLUGS_TO_HIDE = [
  'text',
  'media',
  'design',
  'widgets',
  'theme',
  'embed',
];

// hides all non-DFH blocks, with some exceptions
// from https://github.com/WordPress/gutenberg/issues/11723#issuecomment-441828833
addFilter(
  'blocks.registerBlockType',
  `${Constants.NAMESPACE}/custom-blocks`,
  (blockSettings, blockName) => {
    const allowedCoreBlocks = {
      [Constants.CORE_BLOCK_LIST]: Constants.CATEGORY_COMMON,
      [Constants.CORE_BLOCK_QUOTE]: Constants.CATEGORY_COMMON,

      [Constants.CORE_BLOCK_COLUMNS]: Constants.CATEGORY_LAYOUT,
      [Constants.CORE_BLOCK_SEPARATOR]: Constants.CATEGORY_LAYOUT,
      [Constants.CORE_BLOCK_TABLE]: Constants.CATEGORY_LAYOUT,

      [Constants.CORE_BLOCK_AUDIO]: Constants.CATEGORY_MEDIA,
      [Constants.CORE_BLOCK_EMBED]: Constants.CATEGORY_MEDIA,
      [Constants.CORE_BLOCK_GALLERY]: Constants.CATEGORY_MEDIA,
      [Constants.CORE_BLOCK_IMAGE]: Constants.CATEGORY_MEDIA,
      [Constants.CORE_BLOCK_VIDEO]: Constants.CATEGORY_MEDIA,
    };
    if (allowedCoreBlocks[blockName]) {
      return {
        ...blockSettings,
        category: allowedCoreBlocks[blockName],
      };
    } else if (
      DEFAULT_CATEGORY_SLUGS_TO_HIDE.includes(blockSettings.category)
    ) {
      // hide remaining core blocks that fall within predefined default categories to ensure that
      // we are not hiding the blocks from other plugins
      return {
        ...blockSettings,
        supports: {
          ...blockSettings.supports,
          inserter: false,
        },
      };
    } else {
      return blockSettings;
    }
  },
);
