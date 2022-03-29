import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import * as SearchInput from 'src/js/block/helper/search-input';
import * as Constants from 'src/js/constants';
import { addUniqueIdInApiVersionOne } from 'src/js/utils';

const ATTR_UNIQUE_ID = '_uniqueId',
  ATTR_SEARCH_PLACEHOLDER = 'searchPlaceholder',
  title = __('Toolkit Overview Previews', Constants.TEXT_DOMAIN);

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(
  `${Constants.NAMESPACE}/toolkit-previews`,
  addUniqueIdInApiVersionOne(ATTR_UNIQUE_ID, {
    title,
    category: Constants.CATEGORY_DEPRECATED,
    icon: 'welcome-view-site',
    description: __(
      'Displays and searches previews of all toolkits',
      Constants.TEXT_DOMAIN,
    ),
    attributes: {
      [ATTR_SEARCH_PLACEHOLDER]: {
        ...SearchInput.CONTEXT_PLACEHOLDER_DEFINITION,
        default: __('Search for a toolkit...', Constants.TEXT_DOMAIN),
      },
    },
    providesContext: {
      [SearchInput.CONTEXT_PLACEHOLDER_KEY]: ATTR_SEARCH_PLACEHOLDER,
    },
    edit({ attributes, setAttributes }) {
      const searchClassName = `search-${attributes[ATTR_UNIQUE_ID]}`;
      return (
        <>
          <div className="dfh-editor-block-title">{title}</div>
          <InnerBlocks
            templateLock={Constants.INNER_BLOCKS_LOCKED}
            template={[
              [
                Constants.BLOCK_INNER_BLOCK_WRAPPER,
                {
                  isLocked: true,
                  template: [
                    [
                      Constants.BLOCK_PAGE_HEADER,
                      {
                        hidePageTitleInEdit: true,
                        template: [
                          [
                            Constants.BLOCK_PAGE_CATEGORIES_SEARCH_HEADER,
                            {
                              className:
                                'page-header__section page-header__section--right',
                              searchClassName,
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
                  pluralName: 'toolkits',
                  transitionContainerClass:
                    Constants.CONTENT_TYPE_TO_CONTAINER_CLASS[
                      Constants.CONTENT_TYPE_TOOLKIT
                    ],
                  numResultsPerPage: 8,
                  searchClassName,
                },
              ],
            ]}
          />
        </>
      );
    },
    save({ attributes }) {
      return <InnerBlocks.Content />;
    },
  }),
);
