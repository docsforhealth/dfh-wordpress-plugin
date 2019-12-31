import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

import * as Constants from '../constants';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_BUTTON_CONTAINER, {
  title: __('Button Container', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY,
  attributes: {
    template: { type: 'array', default: [[Constants.BLOCK_BUTTON, {}]] },
    isLocked: { type: 'boolean', default: false },
  },
  edit({ attributes }) {
    return (
      <InnerBlocks
        allowedBlocks={[Constants.BLOCK_BUTTON]}
        template={attributes.template}
        templateLock={
          attributes.isLocked
            ? Constants.INNER_BLOCKS_LOCKED
            : Constants.INNER_BLOCKS_UNLOCKED
        }
      />
    );
  },
  save() {
    return (
      <div className="button-container">
        <InnerBlocks.Content />
      </div>
    );
  },
});
