import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

import * as Constants from '../constants';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(`${Constants.NAMESPACE}/featured-and-contact`, {
  title: __('Featured & Contact', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY,
  icon: 'awards',
  description: __(
    'Featured item and contact form for the landing page',
    Constants.TEXT_DOMAIN,
  ),
  edit() {
    return (
      <div className="landing-featured-and-contact">
        <InnerBlocks
          allowedBlocks={[
            Constants.BLOCK_LANDING_FEATURED,
            Constants.BLOCK_LANDING_CONTACT,
          ]}
          templateLock={Constants.INNER_BLOCKS_LOCKED}
          template={[
            [Constants.BLOCK_LANDING_FEATURED, {}],
            [Constants.BLOCK_LANDING_CONTACT, {}],
          ]}
        />
      </div>
    );
  },
  save({ attributes }) {
    return (
      <div className="landing-featured-and-contact">
        <InnerBlocks.Content />
      </div>
    );
  },
});
