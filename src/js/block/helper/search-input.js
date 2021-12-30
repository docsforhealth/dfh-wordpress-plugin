import { registerBlockType } from '@wordpress/blocks';
import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import * as Constants from 'src/js/constants';
import { addUniqueIdInApiVersionOne } from 'src/js/utils';

export const ATTR_PLACEHOLDER = 'placeholder';
export const ATTR_HIDE_IN_EDIT = 'hideInEdit';

const ATTR_UNIQUE_ID = '_uniqueId';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(
  Constants.BLOCK_SEARCH_INPUT,
  addUniqueIdInApiVersionOne(ATTR_UNIQUE_ID, {
    title: __('Search Input', Constants.TEXT_DOMAIN),
    category: Constants.CATEGORY_COMMON,
    icon: 'search',
    description: __('Text input styled as a search bar', Constants.TEXT_DOMAIN),
    supports: { inserter: false },
    attributes: {
      wrapperClassName: { type: 'string', default: '' },
      inputClassName: { type: 'string', default: '' },
      [ATTR_PLACEHOLDER]: {
        type: 'string',
        default: __('Search here...', Constants.TEXT_DOMAIN),
      },
      [ATTR_HIDE_IN_EDIT]: { type: 'boolean', default: false },
    },
    edit({ attributes, setAttributes }) {
      return (
        !attributes[ATTR_HIDE_IN_EDIT] && (
          <TextControl
            label={__('Search bar placeholder', Constants.TEXT_DOMAIN)}
            value={attributes[ATTR_PLACEHOLDER]}
            onChange={(placeholder) =>
              setAttributes({ [ATTR_PLACEHOLDER]: placeholder })
            }
          />
        )
      );
    },
    save({ attributes }) {
      const parentId = `parent-${attributes[ATTR_UNIQUE_ID]}`,
        controlId = `control-${attributes[ATTR_UNIQUE_ID]}`;
      return (
        <div
          id={parentId}
          className={`form__clear-control ${attributes.wrapperClassName}`}
        >
          <label htmlFor={controlId} className="sr-only">
            {attributes[ATTR_PLACEHOLDER]}
          </label>
          <input
            id={controlId}
            type="text"
            className={`form__control form__control--search ${attributes.inputClassName}`}
            placeholder={attributes[ATTR_PLACEHOLDER]}
          />
          <button
            type="button"
            className="form__clear-control__clear"
            data-clear-control-id={controlId}
            data-clear-parent-id={parentId}
          >
            <span className="sr-only">Clear search field</span>
          </button>
        </div>
      );
    },
  }),
);
