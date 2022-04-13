import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { TextControl } from '@wordpress/components';

import * as Constants from '../../../constants';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_TOOLKIT_DETAIL_HEADER, {
  title: __('Toolkit Detail Header', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY_CUSTOM_DATA,
  icon: 'portfolio',
  description: __(
    'Title and navigation for a specific toolkit',
    Constants.TEXT_DOMAIN,
  ),
  supports: { inserter: false },
  // for dynamic blocks, see attributes in corresponding PHP file
  // see reasoning in `page_taxonomy_filter.php`
  edit({ attributes, setAttributes }) {
    return (
      <TextControl
        label={__('Back to all toolkits label', Constants.TEXT_DOMAIN)}
        help={__(
          'This label is shown on mobile devices only',
          Constants.TEXT_DOMAIN,
        )}
        value={attributes.allToolkitsLabel}
        onChange={allToolkitsLabel => setAttributes({ allToolkitsLabel })}
      />
    );
  },
  save() {
    return null;
  },
});
