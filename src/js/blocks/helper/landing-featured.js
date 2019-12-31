import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

import * as Constants from '../../constants';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_LANDING_FEATURED, {
  title: __('Landing Featured', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY,
  supports: { inserter: false },
  edit() {
    return (
      <section className="landing-toolkits">
        <div className="landing-toolkits__featured">
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
                  wrapperElement: 'div',
                  wrapperClassName: 'margin-b-2',
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
