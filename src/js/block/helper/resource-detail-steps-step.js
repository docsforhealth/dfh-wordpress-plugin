import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

import * as Constants from '../../constants';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_RESOURCE_DETAIL_STEPS_STEP, {
  title: __('Resource Detail Step', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY,
  parent: [Constants.BLOCK_RESOURCE_DETAIL_STEPS],
  edit({ attributes, setAttributes }) {
    return (
      <li class="resource-steps__step">
        <InnerBlocks
          allowedBlocks={[
            Constants.BLOCK_INNER_BLOCK_WRAPPER,
            Constants.BLOCK_BUTTON_CONTAINER,
          ]}
          templateLock={Constants.INNER_BLOCKS_LOCKED}
          template={[
            [
              Constants.BLOCK_INNER_BLOCK_WRAPPER,
              {
                wrapperElement: 'div',
                wrapperClassName: 'resource-steps__step__title',
                allowedBlocks: [Constants.BLOCK_TEXT_CONTAINER],
                template: [
                  [Constants.BLOCK_TEXT_CONTAINER, { onlyText: true }],
                ],
              },
            ],
            [
              Constants.BLOCK_BUTTON_CONTAINER,
              {
                expandWidth: true,
                template: [
                  [
                    Constants.BLOCK_FILE_BUTTON,
                    {
                      size: Constants.BUTTON_SIZE_SMALL,
                      isOutlined: true,
                      label: __('Download file', Constants.TEXT_DOMAIN),
                    },
                  ],
                ],
              },
            ],
          ]}
        />
      </li>
    );
  },
  save({ attributes }) {
    return (
      <li class="resource-steps__step">
        <InnerBlocks.Content />
      </li>
    );
  },
});
