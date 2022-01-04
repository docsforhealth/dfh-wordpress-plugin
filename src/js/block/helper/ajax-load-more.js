import { useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import {
  TextareaControl,
  TextControl,
  __experimentalNumberControl as NumberControl,
} from '@wordpress/components';
import { RawHTML } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import _ from 'lodash';
import * as Constants from 'src/js/constants';

/**
 * Wrapper for the Ajax Load More plugin shortcode
 *
 * see https://connekthq.com/plugins/ajax-load-more/docs/parameters/
 */

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
    contentTypeId: { type: 'string', default: 'post' },
    containerElement: { type: 'string', default: 'div' },
    transitionContainerClass: { type: 'string', default: '' },
    numResultsPerPage: { type: 'number', default: 12 },
    // TODO replace all below with pluralName: { type, 'string' }, OR self-lookup to core data


    // This input is escaped in the `save` method to prevent injection attacks
    noResultsMessage: {
      type: 'string',
      default: __(
        "We couldn't find anything. Please try another search or let us know what we're missing.",
        Constants.TEXT_DOMAIN,
      ),
    },
    // labels for load more button, see https://connekthq.com/plugins/ajax-load-more/docs/parameters/
    buttonLabel: {
      type: 'string',
      default: __('Load more', Constants.TEXT_DOMAIN),
    },
    buttonLoadingLabel: {
      type: 'string',
      default: __('Loading...', Constants.TEXT_DOMAIN),
    },
    buttonDoneLabel: {
      type: 'string',
      default: __('Finished loading', Constants.TEXT_DOMAIN),
    },


    // frontend JS functionality
    searchClassName: { type: 'string', default: '' },
    taxonomyFilterHtmlId: { type: 'string', default: '' },
  },
  edit({ attributes, setAttributes }) {

    // TODO If we select content type here, is there a way to pass this data up to parent?
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
        {/*<TextControl
          label={__('Button load more label', Constants.TEXT_DOMAIN)}
          value={attributes.buttonLabel}
          onChange={(buttonLabel) => setAttributes({ buttonLabel })}
        />
        <TextControl
          label={__('Button currently loading label', Constants.TEXT_DOMAIN)}
          value={attributes.buttonLoadingLabel}
          onChange={(buttonLoadingLabel) =>
            setAttributes({ buttonLoadingLabel })
          }
        />
        <TextControl
          label={__('Button done loading label', Constants.TEXT_DOMAIN)}
          value={attributes.buttonDoneLabel}
          onChange={(buttonDoneLabel) => setAttributes({ buttonDoneLabel })}
        />
        <TextareaControl
          label={__('No results message', Constants.TEXT_DOMAIN)}
          value={attributes.noResultsMessage}
          onChange={(noResultsMessage) => setAttributes({ noResultsMessage })}
        />*/}
      </div>
    );
  },
  save({ attributes }) {
    // TODO if we change the contentTypeId from above which may change the generated saved content,
    // does that invalidate this block?


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
                attributes.transitionContainerClass
              }"
              post_type="${attributes.contentTypeId}"
              posts_per_page="${attributes.numResultsPerPage}"
              scroll="false"
              button_label="${attributes.buttonLabel}"
              button_loading_label="${attributes.buttonLoadingLabel}"
              button_done_label="${attributes.buttonDoneLabel}"
              no_results_text="<div class='ajax-loader-none'>${_.escape(
                attributes.noResultsMessage,
              )}</div>"
            ]`
          }
        </RawHTML>
      </>
    );
  },
});
