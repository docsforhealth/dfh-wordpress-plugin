import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import * as Constants from 'src/js/constants';

const title = __('Resource Detail', Constants.TEXT_DOMAIN);

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(`${Constants.NAMESPACE}/resource-detail`, {
  title,
  category: Constants.CATEGORY_CUSTOM_DATA,
  icon: 'networking',
  description: __(
    'Detailed information for a specific resource',
    Constants.TEXT_DOMAIN,
  ),
  edit() {
    return (
      <>
        <div className="dfh-editor-block-title">{title}</div>
        <div className="resource-detail">
          <InnerBlocks
            templateLock={Constants.INNER_BLOCKS_LOCKED}
            template={[
              [Constants.BLOCK_RESOURCE_DETAIL_DESCRIPTION],
              [Constants.BLOCK_RESOURCE_DETAIL_STEPS],
            ]}
          />
        </div>
      </>
    );
  },
  save() {
    return (
      <div className="resource-detail">
        <InnerBlocks.Content />
      </div>
    );
  },
});
