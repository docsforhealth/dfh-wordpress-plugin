import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { withDispatch } from '@wordpress/data';

import * as Constants from '../../constants';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType('dfh/resource-detail', {
  title: __('Resource Detail', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY,
  supports: { inserter: false },
  // [FUTURE] This is a hack which forces the template to appear valid.
  // See https://github.com/WordPress/gutenberg/issues/11681
  edit: withDispatch(dispatch => {
    dispatch('core/block-editor').setTemplateValidity(true);
  })(() => (
    <div class="resource-detail">
      <InnerBlocks
        allowedBlocks={[
          Constants.BLOCK_RESOURCE_DETAIL_DESCRIPTION,
          Constants.BLOCK_RESOURCE_DETAIL_STEPS,
        ]}
        templateLock={Constants.INNER_BLOCKS_LOCKED}
        template={[
          [Constants.BLOCK_RESOURCE_DETAIL_DESCRIPTION, {}],
          [Constants.BLOCK_RESOURCE_DETAIL_STEPS, {}],
        ]}
      />
    </div>
  )),
  save() {
    return (
      <div className="resource-detail">
        <InnerBlocks.Content />
      </div>
    );
  },
});
