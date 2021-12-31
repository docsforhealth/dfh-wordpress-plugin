import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import * as Constants from 'src/js/constants';
import { addUniqueIdInApiVersionOne } from 'src/js/utils';

const ATTR_UNIQUE_ID = '_uniqueId',
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
    edit({ attributes, setAttributes }) {
      const searchClassName = `search-${attributes[ATTR_UNIQUE_ID]}`,
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
                  isLocked: true,
                  wrapper: [{ classNames: ['page-faq__card'] }],
                  template: [
                    [
                      Constants.BLOCK_INNER_BLOCK_WRAPPER,
                      {
                        isLocked: true,
                        showWrapperInEdit: true,
                        wrapper: [
                          {
                            tagName: 'h1',
                            classNames: [
                              'page-faq__card__title',
                              'heading',
                              'heading--2',
                            ],
                          },
                          { tagName: 'span', classNames: ['heading__title'] },
                        ],
                        template: [[Constants.BLOCK_PAGE_TITLE]],
                      },
                    ],
                    // TODO
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
                      { searchClassName, taxonomyFilterHtmlId },
                    ],
                    [
                      Constants.BLOCK_AJAX_LOAD_MORE,
                      {
                        contentTypeId: '', // TODO content type selector IN THIS ELEMENT?
                        transitionContainerClass: 'page-faq__content',
                        numResultsPerPage: 6,
                        searchClassName,
                        taxonomyFilterHtmlId,
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
