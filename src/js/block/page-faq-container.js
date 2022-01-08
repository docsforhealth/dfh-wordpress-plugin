import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { SelectControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import _ from 'lodash';
import * as PageTaxonomyFilter from 'src/js/block/dynamic/helper/page-taxonomy-filter';
import * as AjaxLoadMore from 'src/js/block/helper/ajax-load-more';
import * as SearchInput from 'src/js/block/helper/search-input';
import * as Constants from 'src/js/constants';
import { addUniqueIdInApiVersionOne } from 'src/js/utils';

// [FUTURE] Seems like current implementation of Contexts in Wordpress 5.8.2 has a bug where
// you CANNOT USE ANY ADDITIONAL HOOKS such as `useSelect` in the CHILDREN that consume Contexts via `usesContext`
// Doing so fails with the error:
//    "The final argument passed to useMemo changed size between renders. The order and size of this array must remain constant."
// Also, using `withSelect` as a fall also fails with the error: "Functions are not valid as a React child.
//    This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it."
// Therefore, we will try to serialize a JSON string with all necessary information to avoid additional
//    calls to WP Data in components to use Contexts

const ATTR_UNIQUE_ID = '_uniqueId',
  ATTR_CONTENT_ID = 'contentTypeId',
  ATTR_CONTENT_INFO = 'contentTypeInfo',
  ATTR_PLURAL_NAME = 'pluralName',
  ATTR_CONTENT_CONTAINER_CLASS = 'contentContainerClass',
  ATTR_SEARCH_PLACEHOLDER = 'searchPlaceholder',
  INITIAL_VAL_CONTENT_TYPE_ID = '',
  title = __('Page FAQ Container', Constants.TEXT_DOMAIN);

registerBlockType(
  `${Constants.NAMESPACE}/page-faq-container`,
  addUniqueIdInApiVersionOne(ATTR_UNIQUE_ID, {
    title,
    category: Constants.CATEGORY_LAYOUT,
    icon: 'layout',
    description: __(
      'Displays FAQ section with page header and body',
      Constants.TEXT_DOMAIN,
    ),
    attributes: {
      [ATTR_CONTENT_ID]: {
        ...AjaxLoadMore.CONTEXT_CONTENT_ID_DEFINITION,
        default: INITIAL_VAL_CONTENT_TYPE_ID,
      },
      [ATTR_CONTENT_INFO]:
        PageTaxonomyFilter.CONTEXT_CONTENT_TYPE_INFO_DEFINITION,
      [ATTR_CONTENT_CONTAINER_CLASS]:
        AjaxLoadMore.CONTEXT_CONTAINER_CLASS_DEFINITION,
      [ATTR_PLURAL_NAME]: AjaxLoadMore.CONTEXT_PLURAL_NAME_DEFINITION,
      [ATTR_SEARCH_PLACEHOLDER]: SearchInput.CONTEXT_PLACEHOLDER_DEFINITION,
    },
    // Need to use Contexts because setting properties on `InnerBlocks` only works
    // on the INITIAL RENDER. Did NOT use `WithInnerBlockAttrs.forceAttributes` because of excessive
    // reloads causing severely degraded performance. Contexts seem to be optional such that if a
    // child component using contexts is used in another non-context setting, the context value
    // is merely undefined instead of throwing an error.
    // See https://github.com/WordPress/gutenberg/issues/15759
    providesContext: {
      [PageTaxonomyFilter.CONTEXT_CONTENT_TYPE_INFO_KEY]: ATTR_CONTENT_INFO,
      [AjaxLoadMore.CONTEXT_PLURAL_NAME_KEY]: ATTR_PLURAL_NAME,
      [AjaxLoadMore.CONTEXT_CONTENT_ID_KEY]: ATTR_CONTENT_ID,
      [AjaxLoadMore.CONTEXT_CONTAINER_CLASS_KEY]: ATTR_CONTENT_CONTAINER_CLASS,
      [SearchInput.CONTEXT_PLACEHOLDER_KEY]: ATTR_SEARCH_PLACEHOLDER,
    },
    // best practices for WP Data https://jsnajdr.wordpress.com/2021/01/22/some-best-practices-for-using-useselect-from-wordpress-data/
    // TIP: to debug wp-data, you can call `wp.data.select` in the console
    edit({ attributes, setAttributes }) {
      // Can use hooks here even though the `addUniqueIdInApiVersionOne` uses a CLASS-based
      // component because that is a HOC that wraps this one. Therefore, as long as this component
      // is a functional component, it can use hooks
      const { customContentTypes, allTaxonomies } = useSelect((select) => ({
        customContentTypes: _.filter(
          select(Constants.STORE_CORE).getPostTypes({ per_page: -1 }),
          (postType) => _.startsWith(postType.slug, 'dfh'),
        ),
        allTaxonomies: select(Constants.STORE_CORE).getTaxonomies({
          per_page: -1,
        }),
      }));

      const searchClassName = `search-${attributes[ATTR_UNIQUE_ID]}`,
        taxonomyFilterHtmlId = `taxonomy-${attributes[ATTR_UNIQUE_ID]}`,
        contentTypeIdToInfo = mapContentTypeIdToInfo(
          customContentTypes,
          allTaxonomies,
        );
      return (
        <>
          <div className="dfh-editor-block-title">{title}</div>
          <SelectControl
            label={__('Select content type', Constants.TEXT_DOMAIN)}
            value={attributes[ATTR_CONTENT_ID]}
            options={[
              {
                label: __('Select a content type...', Constants.TEXT_DOMAIN),
                value: INITIAL_VAL_CONTENT_TYPE_ID,
                disabled: true,
              },
              ..._.map(customContentTypes, (contentType) => ({
                label: contentType.name,
                value: contentType.slug,
              })),
            ]}
            onChange={(contentTypeId) => {
              const info = contentTypeIdToInfo[contentTypeId];
              setAttributes({
                [ATTR_CONTENT_ID]: contentTypeId,
                [ATTR_CONTENT_INFO]: info,
                [ATTR_PLURAL_NAME]: info?.labels?.name,
                [ATTR_CONTENT_CONTAINER_CLASS]:
                  'page-faq__content__ajax ' +
                  (Constants.CONTENT_TYPE_TO_CONTAINER_CLASS[contentTypeId] ??
                    ''),
                [ATTR_SEARCH_PLACEHOLDER]: info?.labels?.search_items,
              });
            }}
          />
          <InnerBlocks
            templateLock={Constants.INNER_BLOCKS_LOCKED}
            template={[
              [
                Constants.BLOCK_INNER_BLOCK_WRAPPER,
                {
                  isLocked: true,
                  wrapper: [{ classNames: ['page-faq__card'] }],
                  template: [
                    [
                      Constants.BLOCK_INNER_BLOCK_WRAPPER,
                      {
                        isLocked: true,
                        hideInEdit: true,
                        wrapper: [
                          {
                            tagName: 'h1',
                            classNames: [
                              'page-faq__card__title',
                              'heading',
                              'heading--2',
                            ],
                          },
                          {
                            tagName: 'span',
                            classNames: ['heading__title'],
                          },
                        ],
                        template: [[Constants.BLOCK_PAGE_TITLE]],
                      },
                    ],
                    [Constants.BLOCK_FAQ_QUESTION_CONTAINER],
                  ],
                },
              ],
              [
                Constants.BLOCK_INNER_BLOCK_WRAPPER,
                {
                  isLocked: true,
                  wrapper: [{ classNames: ['page-faq__body'] }],
                  template: [
                    [
                      Constants.BLOCK_FAQ_HEADER,
                      {
                        searchClassName,
                        taxonomyFilterHtmlId,
                      },
                    ],
                    [
                      Constants.BLOCK_INNER_BLOCK_WRAPPER,
                      {
                        isLocked: true,
                        wrapper: [{ classNames: ['page-faq__content'] }],
                        template: [
                          [
                            Constants.BLOCK_AJAX_LOAD_MORE,
                            {
                              searchClassName,
                              taxonomyFilterHtmlId,
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
        </>
      );
    },
    save({ attributes }) {
      return (
        <div className="page-faq">
          <InnerBlocks.Content />
        </div>
      );
    },
  }),
);

function mapContentTypeIdToInfo(customContentTypes, allTaxonomies) {
  const contentTypeIdToInfo = Object.create(null);
  _.forEach(customContentTypes, (contentType) => {
    contentTypeIdToInfo[contentType.slug] = {
      ...contentType,
      // enhance with embedded taxonomy objects for all taxonomies that this content type has access to
      availableTaxonomies: _.filter(allTaxonomies, (taxonomy) =>
        _.includes(contentType.taxonomies, taxonomy.slug),
      ),
    };
  });
  return contentTypeIdToInfo;
}
