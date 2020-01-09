import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

import * as Constants from '../../constants';
import * as SharedButton from '../shared/button';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_RESOURCE_DETAIL_STEPS_STEP, {
  title: __('Resource Detail Step', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY_RESOURCE,
  icon: 'excerpt-view',
  description: __(
    'Specific step for a specific resource',
    Constants.TEXT_DOMAIN,
  ),
  parent: [Constants.BLOCK_RESOURCE_DETAIL_STEPS],
  edit({ clientId, attributes, setAttributes }) {
    return (
      <li key={clientId} className="resource-steps__step">
        <InnerBlocks
          templateLock={Constants.INNER_BLOCKS_LOCKED}
          template={[
            [
              Constants.BLOCK_INNER_BLOCK_WRAPPER,
              {
                wrapperClassNames: ['resource-steps__step__title'],
                isLocked: true,
                template: [
                  [Constants.BLOCK_CONTENT_CONTAINER, { noHeadings: true }],
                ],
              },
            ],
            [
              Constants.BLOCK_BUTTON_CONTAINER,
              {
                expandWidth: true,
                forceAttributes: {
                  [Constants.INNER_BLOCKS_FORCE_ATTRS_ALL]: {
                    [SharedButton.ATTR_SIZE]: Constants.BUTTON_SIZE_SMALL,
                    [SharedButton.ATTR_OPTION_SIZE]: false,
                  },
                },
                template: [
                  [
                    Constants.BLOCK_FILE_BUTTON,
                    {
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
  save({ clientId, attributes }) {
    return (
      <li key={clientId} className="resource-steps__step">
        <InnerBlocks.Content />
      </li>
    );
  },
});
