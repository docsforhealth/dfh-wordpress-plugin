import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

import * as Constants from '../../constants';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_RESOURCE_DETAIL_DESCRIPTION, {
  title: __('Resource Detail Description', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY_RESOURCE,
  icon: 'networking',
  description: __(
    'Title, category, and description of a specific resource',
    Constants.TEXT_DOMAIN,
  ),
  supports: { inserter: false },
  edit() {
    return (
      <div className="resource-detail__info">
        <InnerBlocks
          templateLock={Constants.INNER_BLOCKS_LOCKED}
          template={[
            [Constants.BLOCK_RESOURCE_DETAIL_INFO, {}],
            [Constants.BLOCK_CONTENT_CONTAINER, { noHeadings: true }],
          ]}
        />
      </div>
    );
  },
  save() {
    return (
      <div className="resource-detail__info">
        <InnerBlocks.Content />
      </div>
    );
  },
});
