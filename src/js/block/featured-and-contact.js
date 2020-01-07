import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

import * as Constants from '../constants';

const title = __('Featured & Contact', Constants.TEXT_DOMAIN);

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(`${Constants.NAMESPACE}/featured-and-contact`, {
  title,
  category: Constants.CATEGORY_LANDING,
  icon: 'awards',
  description: __(
    'Featured item and contact form for the landing page',
    Constants.TEXT_DOMAIN,
  ),
  edit() {
    return (
      <Fragment>
        <div className="dfh-editor-block-title">{title}</div>
        <InnerBlocks
          templateLock={Constants.INNER_BLOCKS_LOCKED}
          template={[
            [Constants.BLOCK_LANDING_FEATURED],
            [Constants.BLOCK_LANDING_CONTACT],
          ]}
        />
      </Fragment>
    );
  },
  save({ attributes }) {
    return <InnerBlocks.Content />;
  },
});
