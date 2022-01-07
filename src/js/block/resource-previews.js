import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import * as SearchInput from 'src/js/block/helper/search-input';
import * as Constants from 'src/js/constants';
import { addUniqueIdInApiVersionOne } from 'src/js/utils';

// DEPRECATED
// Remove deprecated styles from `_page-taxonomy-filter.scss` and `_resource-overview-previews.scss`
// when this block is removed

const ATTR_UNIQUE_ID = '_uniqueId',
  ATTR_SEARCH_PLACEHOLDER = 'searchPlaceholder',
  title = __('Resource Overview Previews', Constants.TEXT_DOMAIN);

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(
  `${Constants.NAMESPACE}/resource-previews`,
  addUniqueIdInApiVersionOne(ATTR_UNIQUE_ID, {
    title,
    category: Constants.CATEGORY_DEPRECATED,
    icon: 'welcome-view-site',
    description: __(
      'Displays, searches, and filters previews of all resources',
      Constants.TEXT_DOMAIN,
    ),
    attributes: {
      [ATTR_SEARCH_PLACEHOLDER]: {
        ...SearchInput.CONTEXT_PLACEHOLDER_DEFINITION,
        default: __('Search for a resource...', Constants.TEXT_DOMAIN),
      },
    },
    providesContext: {
      [SearchInput.CONTEXT_PLACEHOLDER_KEY]: ATTR_SEARCH_PLACEHOLDER,
    },
    edit({ attributes, setAttributes }) {
      const containerClass =
          Constants.CONTENT_TYPE_TO_CONTAINER_CLASS[
            Constants.CONTENT_TYPE_RESOURCE
          ],
        updateLabelClassName = `label-${attributes[ATTR_UNIQUE_ID]}`,
        searchClassName = `search-${attributes[ATTR_UNIQUE_ID]}`,
        taxonomyFilterHtmlId = `taxonomy-${attributes[ATTR_UNIQUE_ID]}`;
      return (
        <>
          <div className="dfh-editor-block-title">{title}</div>
          <InnerBlocks
            templateLock={Constants.INNER_BLOCKS_LOCKED}
            template={[
              [
                Constants.BLOCK_INNER_BLOCK_WRAPPER,
                {
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
                              updateLabelClassName,
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
                Constants.BLOCK_PAGE_TAXONOMY_FILTER,
                {
                  htmlId: taxonomyFilterHtmlId,
                  className: 'page-taxonomy page-taxonomy--deprecated',
                  taxonomyId: Constants.TAXONOMY_RESOURCE,
                  maxNumToShow: 9,
                  updateLabelClassName,
                },
              ],
              [
                Constants.BLOCK_AJAX_LOAD_MORE,
                {
                  contentTypeId: Constants.CONTENT_TYPE_RESOURCE,
                  pluralName: 'resources',
                  transitionContainerClass: `${containerClass} ${containerClass}--deprecated`,
                  numResultsPerPage: 12,
                  searchClassName,
                  taxonomyFilterHtmlId,
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
