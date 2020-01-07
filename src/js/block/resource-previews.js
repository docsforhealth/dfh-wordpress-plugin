import _ from 'lodash';
import { __ } from '@wordpress/i18n';
import { Fragment, RawHTML } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { TextareaControl } from '@wordpress/components';

import * as Constants from '../constants';

const title = __('Resource Previews', Constants.TEXT_DOMAIN);

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(`${Constants.NAMESPACE}/resource-previews`, {
  title,
  category: Constants.CATEGORY_RESOURCE,
  icon: 'welcome-view-site',
  description: __(
    'Displays, searches, and filters previews of all resources',
    Constants.TEXT_DOMAIN,
  ),
  attributes: {
    // This input is escaped in the `save` method to prevent injection attacks
    noResultsMessage: {
      type: 'string',
      default: __(
        "No resources found. Please try another search or let us know what we're missing.",
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
                  buildMessageAreaInfo(
                    'page-header__metadata page-header__metadata--secondary',
                  ),
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
                              'Search for a resource...',
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
            [
              Constants.BLOCK_INNER_BLOCK_WRAPPER,
              {
                wrapperClassNames: ['resource-categories'],
                isLocked: true,
                template: [
                  buildMessageAreaInfo('resource-categories__metadata'),
                  [Constants.BLOCK_RESOURCE_CATEGORY_FILTER],
                ],
              },
            ],
          ]}
        />
        <TextareaControl
          label={__('No results message', Constants.TEXT_DOMAIN)}
          value={attributes.noResultsMessage}
          onChange={noResultsMessage => setAttributes({ noResultsMessage })}
        />
      </Fragment>
    );
  },
  save({ attributes }) {
    return (
      <Fragment>
        <InnerBlocks.Content />
        <RawHTML>
          {`[ajax_load_more
              id="dfh_ajax_resource_previews"
              container_type="div"
              transition_container_classes="resource-previews"
              post_type="${Constants.CONTENT_TYPE_RESOURCE}"
              no_results_text="<div class='resource-previews__none'>${_.escape(
                attributes.noResultsMessage,
              )}</div>"
              posts_per_page="12"]`}
        </RawHTML>
      </Fragment>
    );
  },
});

// Insert wrapper `span`s for the frontend script to dynamically update with
// message of the number of categories currently selected
function buildMessageAreaInfo(additionalClassName = '') {
  return [
    Constants.BLOCK_INNER_BLOCK_WRAPPER,
    {
      wrapperClassNames: [
        `${Constants.CLASS_RESOURCE_MESSAGE_AREA} ${additionalClassName}`,
      ],
      isLocked: true,
    },
  ];
}
