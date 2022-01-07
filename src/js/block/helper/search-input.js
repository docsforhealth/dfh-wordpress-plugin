import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import * as Constants from 'src/js/constants';
import {
  addUniqueIdInApiVersionOne,
  syncAttrFromContextIfDefined,
} from 'src/js/utils';

export const CONTEXT_PLACEHOLDER_KEY = `${Constants.BLOCK_SEARCH_INPUT}/placeholder`;
export const CONTEXT_PLACEHOLDER_DEFINITION = {
  type: 'string',
  default: __('Search here...', Constants.TEXT_DOMAIN),
};

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
      placeholder: CONTEXT_PLACEHOLDER_DEFINITION,
    },
    usesContext: [CONTEXT_PLACEHOLDER_KEY],
    // see `addUniqueIdInApiVersionOne` for how this `edit` object is handled
    edit: {
      componentDidMount(props) {
        syncAttrFromContextIfDefined(
          props,
          CONTEXT_PLACEHOLDER_KEY,
          'placeholder',
        );
      },
      componentDidUpdate(currentProps) {
        syncAttrFromContextIfDefined(
          currentProps,
          CONTEXT_PLACEHOLDER_KEY,
          'placeholder',
        );
      },
      // have to return something from edit hook
      render(props) {
        return <div></div>;
      },
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
            {attributes.placeholder}
          </label>
          <input
            id={controlId}
            type="text"
            className={`form__control form__control--search ${attributes.inputClassName}`}
            placeholder={attributes.placeholder}
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
