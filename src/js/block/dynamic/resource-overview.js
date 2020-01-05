import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

import * as Constants from '../../constants';
import LinkPicker from '../../editor/link-picker';

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
      <LinkPicker
        url={attributes.allResourcesUrl}
        title={attributes.allResourcesTitle}
        onChange={({ url, title }) =>
          setAttributes({ allResourcesUrl: url, allResourcesTitle: title })
        }
      />
    );
  },
  save() {
    return null;
  },
});
