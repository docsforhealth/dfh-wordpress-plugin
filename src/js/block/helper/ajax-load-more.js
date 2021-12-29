import { useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { TextareaControl } from '@wordpress/components';
import { RawHTML } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import _ from 'lodash';
import * as Constants from 'src/js/constants';

/**
 * Wrapper for the Ajax Load More plugin shortcode
 *
 * see https://connekthq.com/plugins/ajax-load-more/docs/parameters/
 */

// TODO build in Ajax Load More plugins! such as pagination or "Load More" button support

registerBlockType(Constants.BLOCK_AJAX_LOAD_MORE, {
  apiVersion: 2,
  title: __('Ajax Load More', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY_COMMON,
  // icon: '', // TODO
  description: __(
    'Wrapper for the Ajax Load More plugin shortcode',
    Constants.TEXT_DOMAIN,
  ),
  // supports: { inserter: false }, // TODO
  attributes: {
    contentTypeId: { type: 'string', default: 'post' },
    containerElement: { type: 'string', default: 'div' },
    transitionContainerClass: { type: 'string', default: '' },
    numResultsPerPage: { type: 'number', default: 12 },
    // This input is escaped in the `save` method to prevent injection attacks
    noResultsMessage: {
      type: 'string',
      default: __(
        "We couldn't find anything. Please try another search or let us know what we're missing.",
        Constants.TEXT_DOMAIN,
      ),
    },
    // frontend JS functionality
    searchClassName: { type: 'string', default: '' },
    taxonomyFilterHtmlId: { type: 'string', default: '' },
  },
  edit({ attributes, setAttributes }) {
    // TODO make other custom data types accessible + add additional config
    return (
      <div {...useBlockProps()}>
        <TextareaControl
          label={__('No results message', Constants.TEXT_DOMAIN)}
          value={attributes.noResultsMessage}
          onChange={(noResultsMessage) => setAttributes({ noResultsMessage })}
        />
      </div>
    );
  },
  save({ attributes }) {
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
            // see https://connekthq.com/plugins/ajax-load-more/docs/repeater-templates/
            `[ajax_load_more
              container_type="${attributes.containerElement}"
              transition_container_classes="${
                attributes.transitionContainerClass
              }"
              post_type="${attributes.contentTypeId}"
              posts_per_page="${attributes.numResultsPerPage}"
              no_results_text="<div class='ajax-loader-none'>${_.escape(
                attributes.noResultsMessage,
              )}</div>"]`
          }
        </RawHTML>
      </>
    );
  },
});
