import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

import * as Constants from '../constants';
import WithInnerBlockAttrs from '../editor/with-inner-block-attrs';
import {
  filterInnerBlockTemplate,
  handleForceAllAttrs,
  withPropTypes,
} from '../utils';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_BUTTON_CONTAINER, {
  title: __('Buttons', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY_COMMON,
  icon: 'editor-table',
  description: __(
    'Allows adding and automatic formatting of various button blocks',
    Constants.TEXT_DOMAIN,
  ),
  attributes: {
    template: { type: 'array', default: [[Constants.BLOCK_LINK_BUTTON]] },
    isLocked: { type: 'boolean', default: false },
    expandWidth: { type: 'boolean', default: false },
    forceAttributes: { type: 'object' },
  },
  edit: withPropTypes(
    {
      template: PropTypes.arrayOf(PropTypes.array),
      isLocked: PropTypes.bool,
      expandWidth: PropTypes.bool,
      forceAttributes: PropTypes.objectOf(PropTypes.object),
    },
    ({ attributes, clientId }) => {
      const allowedBlockNames = [
        Constants.BLOCK_LINK_BUTTON,
        Constants.BLOCK_FILE_BUTTON,
      ];
      return (
        <WithInnerBlockAttrs
          clientId={clientId}
          innerBlockAttrs={handleForceAllAttrs(
            attributes.forceAttributes,
            allowedBlockNames,
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
  save({ attributes }) {
    return (
      <div className={`button-container ${buildClassName(attributes)}`}>
        <InnerBlocks.Content />
      </div>
    );
  },
});

function buildClassName(attributes) {
  return attributes.expandWidth ? 'button-container--expand-width' : '';
}
