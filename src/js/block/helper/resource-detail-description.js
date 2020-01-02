import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

import * as Constants from '../../constants';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_RESOURCE_DETAIL_DESCRIPTION, {
  title: __('Resource Detail Description', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY,
  supports: { inserter: false },
  edit() {
    return (
      <div class="resource-detail__info">
        <InnerBlocks
          allowedBlocks={[
            Constants.BLOCK_RESOURCE_DETAIL_INFO,
            Constants.BLOCK_TEXT_CONTAINER,
          ]}
          templateLock={Constants.INNER_BLOCKS_LOCKED}
          template={[
            [Constants.BLOCK_RESOURCE_DETAIL_INFO, {}],
            [Constants.BLOCK_TEXT_CONTAINER, { onlyText: true }],
          ]}
        />
      </div>
    );
  },
  save() {
    return (
      <div className="resource-detail__info">
        <InnerBlocks.Content />
      </div>
    );
  },
});
