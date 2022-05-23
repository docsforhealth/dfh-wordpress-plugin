import { registerBlockType } from '@wordpress/blocks';
import { useEffect } from '@wordpress/element';
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
    edit(props) {
      // Can use `useEffect` hook here even though the `addUniqueIdInApiVersionOne` uses a CLASS-based
      // component because that is a HOC that wraps this one. Therefore, as long as this component
      // is a functional component, it can use hooks
      const { context, attributes } = props;
      useEffect(() => {
        syncAttrFromContextIfDefined(
          props,
          CONTEXT_PLACEHOLDER_KEY,
          'placeholder',
        );
      }, [context[CONTEXT_PLACEHOLDER_KEY], attributes.placeholder]);
      // Can't return null, have to return something from edit hook
      return <div></div>;
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
