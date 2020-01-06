import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { withDispatch } from '@wordpress/data';

import * as Constants from '../constants';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(`${Constants.NAMESPACE}/resource-detail`, {
  title: __('Resource Detail', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY_RESOURCE,
  icon: 'networking',
  description: __(
    'Detailed information for a specific resource',
    Constants.TEXT_DOMAIN,
  ),
  // [FUTURE] This hack forces the template to appear valid when locking template containing InnerBlocks
  // See https://github.com/WordPress/gutenberg/issues/11681
  edit: withDispatch(dispatch => {
    // set a timeout because block editor sometimes takes longer to load when reating a new resource
    setTimeout(() =>
      dispatch(Constants.STORE_BLOCK_EDITOR).setTemplateValidity(true),
    );
  })(() => (
    <div className="resource-detail">
      <InnerBlocks
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