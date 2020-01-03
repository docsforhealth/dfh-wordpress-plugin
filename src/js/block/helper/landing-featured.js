import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

import * as Constants from '../../constants';
import * as Heading from '../heading';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_LANDING_FEATURED, {
  title: __('Landing Featured', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY_LANDING,
  icon: 'awards',
  description: __('Featured item on the landing page', Constants.TEXT_DOMAIN),
  supports: { inserter: false },
  edit() {
    return (
      <section className="landing-toolkits">
        <div className="landing-toolkits__featured">
          <InnerBlocks
            templateLock={Constants.INNER_BLOCKS_LOCKED}
            template={[
              [
                Constants.BLOCK_INNER_BLOCK_WRAPPER,
                {
                  wrapperClassNames: ['margin-b-2'],
                  isLocked: true,
                  allowedBlocks: [Constants.BLOCK_TEXT_CONTAINER],
                  template: [
                    [
                      Constants.BLOCK_TEXT_CONTAINER,
                      {
                        forceAttributes: {
                          [Constants.BLOCK_HEADING]: {
                            [Heading.ATTR_LEVEL]: Constants.HEADING_SIZE_LARGE,
                            [Heading.ATTR_OPTION_LEVEL]: false,
                          },
                        },
                      },
                    ],
                  ],
                },
              ],
              [Constants.BLOCK_BUTTON_CONTAINER, {}],
            ]}
          />
        </div>
      </section>
    );
  },
  save() {
    return (
      <section className="landing-toolkits">
        <div className="landing-toolkits__featured">
          <InnerBlocks.Content />
        </div>
      </section>
    );
  },
});
