import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

import * as Constants from '../../constants';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_RESOURCE_DETAIL_STEPS, {
  title: __('Resource Detail Steps', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY,
  supports: { inserter: false },
  edit() {
    return (
      <div class="resource-detail__steps">
        <InnerBlocks
          allowedBlocks={[
            Constants.BLOCK_TITLE,
            Constants.BLOCK_TEXT_CONTAINER,
            Constants.BLOCK_INNER_BLOCK_WRAPPER,
          ]}
          templateLock={Constants.INNER_BLOCKS_LOCKED}
          template={[
            [
              Constants.BLOCK_TITLE,
              { mainTitle: __('Documents', Constants.TEXT_DOMAIN), level: '3' },
            ],
            [
              Constants.BLOCK_INNER_BLOCK_WRAPPER,
              {
                wrapperElement: 'ol',
                wrapperClassName: 'resource-steps',
                allowedBlocks: [Constants.BLOCK_RESOURCE_DETAIL_STEPS_STEP],
                template: [[Constants.BLOCK_RESOURCE_DETAIL_STEPS_STEP, {}]],
              },
            ],
            [
              Constants.BLOCK_TITLE,
              {
                mainTitle: __('Next steps', Constants.TEXT_DOMAIN),
                level: '3',
              },
            ],
            [
              Constants.BLOCK_TEXT_CONTAINER,
              { onlyText: true, isLocked: true },
            ],
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
