import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

import * as Constants from '../../constants';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_LANDING_HEADER, {
  title: __('Landing Header', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY,
  icon: 'flag',
  description: __('Header of the landing page', Constants.TEXT_DOMAIN),
  supports: { inserter: false },
  edit() {
    const titleConfig = {
        tagName: 'h1',
        className: 'heading heading--1',
        placeholder: __('Enter title here', Constants.TEXT_DOMAIN),
      },
      subtitleConfig = {
        tagName: 'p',
        className: 'text text--large margin-b-3',
        placeholder: __('Enter subtitle here', Constants.TEXT_DOMAIN),
      };
    return (
      <header className="landing-header">
        <div className="landing-header__container">
          <InnerBlocks
            allowedBlocks={[
              Constants.BLOCK_TEXT_CONTAINER,
              Constants.BLOCK_BUTTON_CONTAINER,
            ]}
            templateLock={Constants.INNER_BLOCKS_LOCKED}
            template={[
              [
                Constants.BLOCK_TEXT_CONTAINER,
                {
                  template: [
                    [Constants.BLOCK_TEXT, titleConfig],
                    [Constants.BLOCK_TEXT, subtitleConfig],
                  ],
                  isLocked: true,
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
