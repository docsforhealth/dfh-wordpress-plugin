import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

import * as Constants from '../constants';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_BUTTON_CONTAINER, {
  title: __('Button Container', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY,
  icon: 'editor-table',
  description: __(
    'Allows adding and automatic formatting of various button blocks',
    Constants.TEXT_DOMAIN,
  ),
  attributes: {
    template: { type: 'array', default: [[Constants.BLOCK_LINK_BUTTON, {}]] },
    isLocked: { type: 'boolean', default: false },
    expandWidth: { type: 'boolean', default: false },
  },
  edit({ attributes }) {
    return (
      <InnerBlocks
        allowedBlocks={[
          Constants.BLOCK_LINK_BUTTON,
          Constants.BLOCK_FILE_BUTTON,
        ]}
        template={attributes.template}
        templateLock={
          attributes.isLocked
            ? Constants.INNER_BLOCKS_LOCKED
            : Constants.INNER_BLOCKS_UNLOCKED
        }
      />
    );
  },
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
