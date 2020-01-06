import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

import * as Constants from '../constants';

const title = __('Hero', Constants.TEXT_DOMAIN);

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(`${Constants.NAMESPACE}/hero`, {
  title,
  category: Constants.CATEGORY_LANDING,
  icon: 'flag',
  description: __(
    'Header with overview video for the landing page',
    Constants.TEXT_DOMAIN,
  ),
  edit() {
    return (
      <Fragment>
        <div className="dfh-editor-block-title">{title}</div>
        <div className="landing-hero">
          <InnerBlocks
            templateLock={Constants.INNER_BLOCKS_LOCKED}
            template={[
              [Constants.BLOCK_LANDING_HEADER, {}],
              [Constants.BLOCK_LANDING_VIDEO, {}],
            ]}
          />
        </div>
      </Fragment>
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
