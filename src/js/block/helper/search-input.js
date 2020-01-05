import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

import * as Constants from '../../constants';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_SEARCH_INPUT, {
  title: __('Search Input', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY_COMMON,
  icon: 'search',
  description: __('Text input styled as a search bar', Constants.TEXT_DOMAIN),
  supports: { inserter: false },
  attributes: {
    placeholder: {
      type: 'string',
      default: __('Search here...', Constants.TEXT_DOMAIN),
    },
  },
  edit({ attributes }) {
    return (
      <input
        type="text"
        className="form__control form__control--search"
        placeholder={attributes.placeholder}
      />
    );
  },
  save({ attributes }) {
    return (
      <input
        type="text"
        className="form__control form__control--search"
        placeholder={attributes.placeholder}
      />
    );
  },
});
