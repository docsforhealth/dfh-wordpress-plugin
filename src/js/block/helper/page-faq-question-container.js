import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import * as Constants from 'src/js/constants';
import { addUniqueIdInApiVersionOne, pluralize } from 'src/js/utils';

const ATTR_UNIQUE_ID = '_uniqueId';

registerBlockType(
  Constants.BLOCK_FAQ_QUESTION_CONTAINER,
  addUniqueIdInApiVersionOne(ATTR_UNIQUE_ID, {
    title: __('Page FAQ Question Container', Constants.TEXT_DOMAIN),
    category: Constants.CATEGORY_LAYOUT,
    icon: 'align-wide',
    description: __(
      'Displays answers to frequently asked questions about the content on this page',
      Constants.TEXT_DOMAIN,
    ),
    supports: { inserter: false },
    attributes: {
      numQuestions: { type: 'number', default: 0 },
    },
    // Can use hooks here even though the `addUniqueIdInApiVersionOne` uses a CLASS-based
    // component because that is a HOC that wraps this one. Therefore, as long as this component
    // is a functional component, it can use hooks
    edit({ clientId, attributes, setAttributes }) {
      // Based on the `edit` template, we know that this block has two `BLOCK_INNER_BLOCK_WRAPPER`
      // children and that the second child (at index 1) is the one with the `BLOCK_FAQ_QUESTION`s
      const numQuestions = useSelect(
        (select) =>
          select(Constants.STORE_BLOCK_EDITOR).getBlock(clientId)
            ?.innerBlocks?.[1]?.innerBlocks?.length,
      );
      useEffect(() => {
        if (numQuestions !== attributes.numQuestions) {
          setAttributes({ numQuestions });
        }
      });
      return (
        <>
          <div className="dfh-editor-block-title dfh-editor-block-title--nested">
            {__('Frequently Asked Questions', Constants.TEXT_DOMAIN)}
          </div>
          <InnerBlocks
            templateLock={Constants.INNER_BLOCKS_LOCKED}
            template={[
              [
                Constants.BLOCK_INNER_BLOCK_WRAPPER,
                {
                  isLocked: true,
                  hideInEdit: true,
                  wrapper: [
                    { classNames: ['modal__title'] },
                    {
                      tagName: 'h1',
                      classNames: ['heading', 'heading--2', 'heading--bold'],
                    },
                  ],
                  template: [[Constants.BLOCK_PAGE_TITLE]],
                },
              ],
              [
                Constants.BLOCK_INNER_BLOCK_WRAPPER,
                {
                  wrapper: [
                    { classNames: ['modal__content'] },
                    { tagName: 'ul', classNames: ['page-faq__questions'] },
                  ],
                  allowedBlocks: [Constants.BLOCK_FAQ_QUESTION],
                  template: [[Constants.BLOCK_FAQ_QUESTION]],
                },
              ],
            ]}
          />
        </>
      );
    },
    save({ attributes }) {
      const { numQuestions } = attributes;
      return (
        <>
          <button
            type="button"
            className="page-faq__card__toggle"
            data-lity
            data-lity-target={`#${attributes[ATTR_UNIQUE_ID]}`}
            data-lity-override-modal-class="modal--open"
            data-lity-override-container-class="container container--narrow"
          >
            View {numQuestions} answered{' '}
            {pluralize(numQuestions, 'question', 'questions')}
          </button>
          <div
            id={attributes[ATTR_UNIQUE_ID]}
            className="page-faq__card__content lity-hide modal modal--adaptive"
            data-toggle-parent
            data-toggle-parent-child-class="faq-question"
            data-toggle-parent-child-open-class="faq-question--open"
            data-toggle-parent-num-initial-open="1"
          >
            <InnerBlocks.Content />
            <div className="modal__toggle">
              <button
                type="button"
                className="button button--small button--outline"
                data-lity-close
              >
                {__('Close', Constants.TEXT_DOMAIN)}
              </button>
            </div>
          </div>
        </>
      );
    },
  }),
);
