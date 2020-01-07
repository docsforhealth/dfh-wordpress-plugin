import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

import * as Constants from '../../constants';
import WithInnerBlockAttrs from '../../editor/with-inner-block-attrs';
import {
  filterInnerBlockTemplate,
  handleForceAllAttrs,
  withPropTypes,
} from '../../utils';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_CONTENT_CONTAINER, {
  title: __('Content Container', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY_COMMON,
  icon: 'media-text',
  description: __(
    'Allows adding of various text and media content blocks',
    Constants.TEXT_DOMAIN,
  ),
  supports: { inserter: false },
  attributes: {
    template: {
      type: 'array',
      default: [[Constants.BLOCK_HEADING, {}], [Constants.BLOCK_TEXT, {}]],
    },
    isLocked: { type: 'boolean', default: false },
    noHeadings: { type: 'boolean', default: false },
    forceAttributes: { type: 'object' },
  },
  edit: withPropTypes(
    {
      template: PropTypes.arrayOf(PropTypes.array),
      isLocked: PropTypes.bool,
      noHeadings: PropTypes.bool,
      forceAttributes: PropTypes.objectOf(PropTypes.object),
    },
    ({ attributes, clientId }) => {
      const allowedBlockNames = attributes.noHeadings
        ? [Constants.BLOCK_TEXT, Constants.BLOCK_VIDEO_THUMBNAIL]
        : [
            Constants.BLOCK_HEADING,
            Constants.BLOCK_TEXT,
            Constants.BLOCK_VIDEO_THUMBNAIL,
          ];
      return (
        <WithInnerBlockAttrs
          clientId={clientId}
          innerBlockAttrs={handleForceAllAttrs(
            allowedBlockNames,
            attributes.forceAttributes,
          )}
        >
          <InnerBlocks
            allowedBlocks={allowedBlockNames}
            template={filterInnerBlockTemplate(
              allowedBlockNames,
              attributes.template,
            )}
            templateLock={
              attributes.isLocked
                ? Constants.INNER_BLOCKS_LOCKED
                : Constants.INNER_BLOCKS_UNLOCKED
            }
          />
        </WithInnerBlockAttrs>
      );
    },
  ),
  save() {
    return <InnerBlocks.Content />;
  },
});
