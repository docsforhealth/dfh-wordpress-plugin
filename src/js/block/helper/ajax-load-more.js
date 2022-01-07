import { useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { __experimentalNumberControl as NumberControl } from '@wordpress/components';
import { RawHTML, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import _ from 'lodash';
import * as Constants from 'src/js/constants';
import { syncAttrFromContextIfDefined } from 'src/js/utils';

/**
 * Wrapper for the Ajax Load More plugin shortcode
 *
 * see https://connekthq.com/plugins/ajax-load-more/docs/parameters/
 */

export const CONTEXT_PLURAL_NAME_KEY = `${Constants.BLOCK_AJAX_LOAD_MORE}/pluralName`;
export const CONTEXT_PLURAL_NAME_DEFINITION = { type: 'string' };

export const CONTEXT_CONTENT_ID_KEY = `${Constants.BLOCK_AJAX_LOAD_MORE}/contentId`;
export const CONTEXT_CONTENT_ID_DEFINITION = { type: 'string' };

export const CONTEXT_CONTAINER_CLASS_KEY = `${Constants.BLOCK_AJAX_LOAD_MORE}/containerClass`;
export const CONTEXT_CONTAINER_CLASS_DEFINITION = {
  type: 'string',
  default: '',
};

const ATTR_PLURAL_NAME = 'pluralName';
const ATTR_CONTENT_ID = 'contentTypeId';
const ATTR_TRANSITION_CONTAINER_CLASS = 'transitionContainerClass';

registerBlockType(Constants.BLOCK_AJAX_LOAD_MORE, {
  apiVersion: 2,
  title: __('Ajax Load More', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY_COMMON,
  icon: 'admin-site-alt3',
  description: __(
    'Wrapper for the Ajax Load More plugin shortcode',
    Constants.TEXT_DOMAIN,
  ),
  supports: { inserter: false },
  attributes: {
    containerElement: { type: 'string', default: 'div' },
    [ATTR_TRANSITION_CONTAINER_CLASS]: CONTEXT_CONTAINER_CLASS_DEFINITION,
    numResultsPerPage: { type: 'number', default: 12 },
    // synced with context in order to make available to save hook
    [ATTR_PLURAL_NAME]: CONTEXT_PLURAL_NAME_DEFINITION,
    [ATTR_CONTENT_ID]: CONTEXT_CONTENT_ID_DEFINITION,
    // frontend JS functionality
    searchClassName: { type: 'string', default: '' },
    taxonomyFilterHtmlId: { type: 'string', default: '' },
  },
  usesContext: [
    CONTEXT_PLURAL_NAME_KEY,
    CONTEXT_CONTENT_ID_KEY,
    CONTEXT_CONTAINER_CLASS_KEY,
  ],
  edit(props) {
    const { attributes, setAttributes } = props;
    // Can define these attributes by directly passing in OR via Context
    useEffect(() => {
      syncAttrFromContextIfDefined(
        props,
        CONTEXT_PLURAL_NAME_KEY,
        ATTR_PLURAL_NAME,
      );
      syncAttrFromContextIfDefined(
        props,
        CONTEXT_CONTENT_ID_KEY,
        ATTR_CONTENT_ID,
      );
      syncAttrFromContextIfDefined(
        props,
        CONTEXT_CONTAINER_CLASS_KEY,
        ATTR_TRANSITION_CONTAINER_CLASS,
      );
    });
    return (
      <div {...useBlockProps()}>
        <NumberControl
          label={__(
            'Number of results to load per page',
            Constants.TEXT_DOMAIN,
          )}
          value={attributes.numResultsPerPage}
          onChange={(numResultsPerPage) => setAttributes({ numResultsPerPage })}
          min={1}
          max={999}
        />
      </div>
    );
  },
  save({ attributes }) {
    const {
      buttonLabel,
      buttonLoadingLabel,
      buttonDoneLabel,
      noResultsMessage,
    } = getLabelNamesInSave(attributes[ATTR_PLURAL_NAME]);
    return (
      <>
        {/* Starting point for the setup-ajaxloadmore-filter-search.js frontend script */}
        <span
          data-ajax
          data-ajax-search-input-class={attributes.searchClassName}
          data-ajax-taxonomy-filter-id={attributes.taxonomyFilterHtmlId}
        />
        <RawHTML {...useBlockProps.save()}>
          {
            // See `alm_templates` directory in the THEME for markup
            //    see https://connekthq.com/plugins/ajax-load-more/docs/repeater-templates/
            // scroll=false to reveal button that user must select to load more
            //    see `_alm_btn_color` in `setup_ajax_load_more.php`
            `[ajax_load_more
              container_type="${attributes.containerElement}"
              transition_container_classes="${
                attributes[ATTR_TRANSITION_CONTAINER_CLASS]
              }"
              post_type="${attributes[ATTR_CONTENT_ID]}"
              posts_per_page="${attributes.numResultsPerPage}"
              scroll="false"
              button_label="${buttonLabel}"
              button_loading_label="${buttonLoadingLabel}"
              button_done_label="${buttonDoneLabel}"
              no_results_text="<div class='ajax-loader-none'>${_.escape(
                noResultsMessage,
              )}</div>"
            ]`
          }
        </RawHTML>
      </>
    );
  },
});

function getLabelNamesInSave(pluralName = null) {
  // labels for load more button, see https://connekthq.com/plugins/ajax-load-more/docs/parameters/
  let buttonLabel = __('Load more', Constants.TEXT_DOMAIN),
    buttonLoadingLabel = __('Loading...', Constants.TEXT_DOMAIN),
    buttonDoneLabel = __('Finished loading', Constants.TEXT_DOMAIN),
    noResultsMessage = __(
      "We couldn't find anything. Please try another search or let us know what we're missing.",
      Constants.TEXT_DOMAIN,
    );
  // use custom name if available
  if (_.isString(pluralName)) {
    const lowercased = pluralName.toLowerCase();
    buttonLabel = `Load more ${lowercased}`;
    buttonLoadingLabel = `Loading ${lowercased}...`;
    buttonDoneLabel = `Loaded all ${lowercased}`;
    noResultsMessage = `We couldn't find any ${lowercased}. Please try another search or let us know what we're missing.`;
  }
  return {
    buttonLabel,
    buttonLoadingLabel,
    buttonDoneLabel,
    noResultsMessage,
  };
}
