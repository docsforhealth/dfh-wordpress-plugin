import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import * as Constants from 'src/js/constants';

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
                // TODO replace with BLOCK_PAGE_CATEGORIES_SEARCH_HEADER
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
            // TODO replace with BLOCK_PAGE_TAXONOMY_FILTER
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
            [
              Constants.BLOCK_AJAX_LOAD_MORE,
              {
                contentTypeId: Constants.CONTENT_TYPE_RESOURCE,
                transitionContainerClass: 'resource-previews',
                numResultsPerPage: 12,
              },
            ],
          ]}
        />
      </Fragment>
    );
  },
  save({ attributes }) {
    return (
      <Fragment>
        <InnerBlocks.Content />
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
