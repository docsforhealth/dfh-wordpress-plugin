import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

import * as Constants from '../../constants';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_RESOURCE_DETAIL_STEPS, {
  title: __('Resource Detail Steps', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY,
  icon: 'excerpt-view',
  description: __('Next steps for a specific resource', Constants.TEXT_DOMAIN),
  supports: { inserter: false },
  edit() {
    return (
      <div class="resource-detail__steps">
        <InnerBlocks
          templateLock={Constants.INNER_BLOCKS_LOCKED}
          template={[
            [
              Constants.BLOCK_HEADING,
              {
                mainTitle: __('Documents', Constants.TEXT_DOMAIN),
                level: Constants.HEADING_SIZE_MEDIUM,
                showPreTitle: false,
                showPostTitle: false,
              },
            ],
            [
              Constants.BLOCK_INNER_BLOCK_WRAPPER,
              {
                wrapperElements: ['ol'],
                wrapperClassNames: ['resource-steps'],
                allowedBlocks: [Constants.BLOCK_RESOURCE_DETAIL_STEPS_STEP],
                template: [[Constants.BLOCK_RESOURCE_DETAIL_STEPS_STEP, {}]],
              },
            ],
            [
              Constants.BLOCK_HEADING,
              {
                mainTitle: __('Next steps', Constants.TEXT_DOMAIN),
                level: Constants.HEADING_SIZE_MEDIUM,
                showPreTitle: false,
                showPostTitle: false,
              },
            ],
            [Constants.BLOCK_TEXT_CONTAINER, { onlyText: true }],
          ]}
        />
      </div>
    );
  },
  save() {
    return (
      <div className="resource-detail__steps">
        <InnerBlocks.Content />
      </div>
    );
  },
});
