import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

import * as Constants from '../constants';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType('dfh/hero', {
  title: __('Hero', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY,
  edit() {
    return (
      <div className="landing-hero">
        <InnerBlocks
          allowedBlocks={[
            Constants.BLOCK_LANDING_HEADER,
            Constants.BLOCK_LANDING_VIDEO,
          ]}
          templateLock={Constants.INNER_BLOCKS_LOCKED}
          template={[
            [Constants.BLOCK_LANDING_HEADER, {}],
            [Constants.BLOCK_LANDING_VIDEO, {}],
          ]}
        />
      </div>
    );
  },
  save() {
    return (
      <div className="landing-hero">
        <InnerBlocks.Content />
      </div>
    );
  },
});
