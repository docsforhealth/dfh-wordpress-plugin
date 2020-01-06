import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { TextControl } from '@wordpress/components';

import * as Constants from '../../constants';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(`${Constants.NAMESPACE}/resource-overview`, {
  title: __('Resource Overview', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY_LANDING,
  icon: 'index-card',
  description: __(
    'All resource categories with examples of each',
    Constants.TEXT_DOMAIN,
  ),
  supports: { multiple: false },
  edit({ attributes, setAttributes }) {
    return (
      <TextControl
        label={__('All resources button label', Constants.TEXT_DOMAIN)}
        help={__(
          'Label for the button in each category to go to the resource overview page',
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
