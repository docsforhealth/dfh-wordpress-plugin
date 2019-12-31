import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

import * as Constants from '../constants';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType('dfh/featured-and-contact', {
  title: __('Featured & Contact', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY,
  edit() {
    return (
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
    );
  },
  save({ attributes }) {
    return <InnerBlocks.Content />;
  },
});
