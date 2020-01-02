import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

import * as Constants from '../constants';
import LinkPicker from '../editor/link-picker';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(`${Constants.NAMESPACE}/resource-categories`, {
  title: __('Resource Categories', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY,
  icon: 'index-card',
  description: __(
    'Displays all resource categories with examples of each',
    Constants.TEXT_DOMAIN,
  ),
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
