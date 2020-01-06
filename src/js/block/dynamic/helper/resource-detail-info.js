import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { TextControl } from '@wordpress/components';

import * as Constants from '../../../constants';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_RESOURCE_DETAIL_INFO, {
  title: __('Resource Detail Info', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY_RESOURCE,
  icon: 'networking',
  description: __(
    'Title and category of a specific resource',
    Constants.TEXT_DOMAIN,
  ),
  supports: { inserter: false },
  edit({ attributes, setAttributes }) {
    return (
      <TextControl
        label={__('Back to all resources label', Constants.TEXT_DOMAIN)}
        help={__(
          'This label is shown on mobile devices only',
          Constants.TEXT_DOMAIN,
        )}
        value={attributes.allResourcesLabel}
        onChange={allResourcesLabel => setAttributes({ allResourcesLabel })}
      />
    );
  },
  save() {
    return null;
  },
});
