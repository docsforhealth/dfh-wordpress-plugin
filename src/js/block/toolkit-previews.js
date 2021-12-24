import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
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
            [
              Constants.BLOCK_AJAX_LOAD_MORE,
              {
                contentTypeId: Constants.CONTENT_TYPE_TOOLKIT,
                transitionContainerClass: 'container',
                numResultsPerPage: 8,
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
