import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { TextareaControl } from '@wordpress/components';
import { Fragment, RawHTML } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import _ from 'lodash';
import * as Constants from 'src/js/constants';

const title = __('Toolkit Previews', Constants.TEXT_DOMAIN);

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(`${Constants.NAMESPACE}/toolkit-previews`, {
  title,
  category: Constants.CATEGORY_TOOLKIT,
  icon: 'welcome-view-site',
  description: __(
    'Displays and searches previews of all toolkits',
    Constants.TEXT_DOMAIN,
  ),
  attributes: {
    // This input is escaped in the `save` method to prevent injection attacks
    noResultsMessage: {
      type: 'string',
      default: __(
        "No toolkits found. Please try another search or let us know what we're missing.",
        Constants.TEXT_DOMAIN,
      ),
    },
  },
  edit({ attributes, setAttributes }) {
    return (
      <Fragment>
        <div className="dfh-editor-block-title">{title}</div>
        <InnerBlocks
          templateLock={Constants.INNER_BLOCKS_LOCKED}
          template={[
            [
              Constants.BLOCK_PAGE_HEADER,
              {
                isLocked: true,
                hideBlockTitleInEdit: true,
                hideInnerBlocksInEdit: true,
                template: [
                  [
                    Constants.BLOCK_INNER_BLOCK_WRAPPER,
                    {
                      wrapperClassNames: [
                        'form form--inline page-header__form',
                      ],
                      isLocked: true,
                      template: [
                        [
                          Constants.BLOCK_SEARCH_INPUT,
                          {
                            placeholder: __(
                              'Search for a toolkit...',
                              Constants.TEXT_DOMAIN,
                            ),
                          },
                        ],
                      ],
                    },
                  ],
                ],
              },
            ],
          ]}
        />
        <TextareaControl
          label={__('No results message', Constants.TEXT_DOMAIN)}
          value={attributes.noResultsMessage}
          onChange={(noResultsMessage) => setAttributes({ noResultsMessage })}
        />
      </Fragment>
    );
  },
  save({ attributes }) {
    return (
      <Fragment>
        <InnerBlocks.Content />
        <RawHTML>
          {
            // See `alm_templates/default.php` in the THEME for toolkit markup
            `[ajax_load_more
              id="${Constants.AJAX_ID_TOOLKIT}"
              container_type="div"
              transition_container_classes="container"
              post_type="${Constants.CONTENT_TYPE_TOOLKIT}"
              no_results_text="<div class='ajax-loader-none'>${_.escape(
                attributes.noResultsMessage,
              )}</div>"
              posts_per_page="8"]`
          }
        </RawHTML>
      </Fragment>
    );
  },
});
