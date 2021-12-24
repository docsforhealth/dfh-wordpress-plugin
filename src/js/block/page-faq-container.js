import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import * as Constants from 'src/js/constants';

// TODO add editor title

registerBlockType(`${Constants.NAMESPACE}/page-faq-container`, {
  apiVersion: 2,
  title: __('Page FAQ Container', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY_LAYOUT,
  Constants,
  icon: 'layout', // TODO
  description: __(
    'Displays FAQ section with page header and body',
    Constants.TEXT_DOMAIN,
  ),
  edit({ attributes, setAttributes }) {
    return (
      <div {...useBlockProps()}>
        <InnerBlocks
          templateLock={Constants.INNER_BLOCKS_LOCKED}
          template={[
            [
              Constants.BLOCK_INNER_BLOCK_WRAPPER,
              {
                isLocked: true,
                wrapperElements: ['div'],
                wrapperClassNames: ['page-faq__card'],
                template: [
                  [
                    Constants.BLOCK_INNER_BLOCK_WRAPPER,
                    {
                      isLocked: true,
                      wrapperElements: ['h1', 'span'],
                      wrapperClassNames: [
                        'page-faq__card__title heading heading--2',
                        'heading__title',
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
                wrapperElements: ['div'],
                wrapperClassNames: ['page-faq__body'],
                template: [
                  [Constants.BLOCK_FAQ_HEADER], // TODO
                  [
                    Constants.BLOCK_AJAX_LOAD_MORE,
                    {
                      contentTypeId: '', // TODO
                      transitionContainerClass: 'page-faq__content',
                      numResultsPerPage: 6,
                    },
                  ],
                ],
              },
            ],
          ]}
        />
      </div>
    );
  },
  save({ attributes }) {
    return (
      <div {...useBlockProps.save({ className: 'page-faq' })}>
        <InnerBlocks.Content />
      </div>
    );
  },
});
