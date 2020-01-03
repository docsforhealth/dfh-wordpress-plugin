import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

import * as Constants from '../../constants';
import * as Heading from '../heading';
import * as Text from '../text';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_LANDING_HEADER, {
  title: __('Landing Header', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY,
  icon: 'flag',
  description: __('Header of the landing page', Constants.TEXT_DOMAIN),
  supports: { inserter: false },
  edit() {
    return (
      <header className="landing-header">
        <div className="landing-header__container">
          <InnerBlocks
            templateLock={Constants.INNER_BLOCKS_LOCKED}
            template={[
              [
                Constants.BLOCK_INNER_BLOCK_WRAPPER,
                {
                  wrapperClassNames: ['margin-b-3'],
                  isLocked: true,
                  template: [
                    [
                      Constants.BLOCK_TEXT_CONTAINER,
                      {
                        forceAttributes: {
                          [Constants.BLOCK_HEADING]: {
                            [Heading.ATTR_LEVEL]: Constants.HEADING_SIZE_XLARGE,
                            [Heading.ATTR_SHOW_PRE_TITLE]: false,
                            [Heading.ATTR_SHOW_POST_TITLE]: false,
                            [Heading.ATTR_HIGHLIGHT_MAIN_TITLE]: false,

                            [Heading.ATTR_OPTION_LEVEL]: false,
                            [Heading.ATTR_OPTION_SHOW_PRE_TITLE]: false,
                            [Heading.ATTR_OPTION_SHOW_POST_TITLE]: false,
                            [Heading.ATTR_OPTION_HIGHLIGHT_MAIN_TITLE]: false,
                          },
                          [Constants.BLOCK_TEXT]: {
                            [Text.ATTR_SIZE]: Constants.TEXT_SIZE_LARGE,
                            [Text.ATTR_OPTION_SIZE]: false,
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
      </header>
    );
  },
  save() {
    return (
      <header className="landing-header">
        <div className="landing-header__container">
          <InnerBlocks.Content />
        </div>
      </header>
    );
  },
});
