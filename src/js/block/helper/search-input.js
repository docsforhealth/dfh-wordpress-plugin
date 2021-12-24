import { registerBlockType } from '@wordpress/blocks';
import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import * as Constants from 'src/js/constants';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_SEARCH_INPUT, {
  title: __('Search Input', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY_COMMON,
  icon: 'search',
  description: __('Text input styled as a search bar', Constants.TEXT_DOMAIN),
  supports: { inserter: false },
  attributes: {
    className: { type: 'string', default: '' },
    placeholder: {
      type: 'string',
      default: __('Search here...', Constants.TEXT_DOMAIN),
    },
  },
  edit({ attributes, setAttributes }) {
    return (
      <TextControl
        label={__('Search bar placeholder', Constants.TEXT_DOMAIN)}
        value={attributes.placeholder}
        onChange={(placeholder) => setAttributes({ placeholder })}
      />
    );
  },
  save({ attributes }) {
    return (
      <input
        type="text"
        className={`form__control form__control--search ${attributes.className}`}
        placeholder={attributes.placeholder}
      />
    );
  },
});
