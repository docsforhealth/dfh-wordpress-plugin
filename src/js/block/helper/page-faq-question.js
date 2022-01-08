import { useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { TextareaControl, TextControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import _ from 'lodash';
import * as Constants from 'src/js/constants';

registerBlockType(Constants.BLOCK_FAQ_QUESTION, {
  apiVersion: 2,
  title: __('Page FAQ Question', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY_LAYOUT,
  icon: 'align-wide',
  description: __(
    'Frequently asked question and answer',
    Constants.TEXT_DOMAIN,
  ),
  parent: [Constants.BLOCK_FAQ_QUESTION_CONTAINER],
  attributes: {
    // need to set default value to avoid uncontrolled --> controlled error
    // see https://stackoverflow.com/a/67961946
    question: { type: 'string', default: '' },
    answer: { type: 'string', default: '' },

    openWord: { type: 'string', default: __('show', Constants.TEXT_DOMAIN) },
    closeWord: { type: 'string', default: __('hide', Constants.TEXT_DOMAIN) },
  },
  edit({ clientId, attributes, setAttributes }) {
    const parentInnerBlocks = useSelect((select) => {
        // `true` argument to `getBlockParents` means should return ascending resultings, meaning the first
        // item in the returned clientId array is the immediate parent's clientId
        // see https://developer.wordpress.org/block-editor/reference-guides/data/data-core-block-editor/#getblockparents
        const store = wp.data.select(Constants.STORE_BLOCK_EDITOR),
          parentClientId = store.getBlockParents(clientId, true)[0];
        return store.getBlock(parentClientId)?.innerBlocks;
      }),
      thisIndex = _.findIndex(
        parentInnerBlocks,
        (blockInfo) => blockInfo.clientId === clientId,
      );
    return (
      <div {...useBlockProps()}>
        <TextControl
          label={`${thisIndex + 1}. ${__('Question', Constants.TEXT_DOMAIN)}`}
          value={attributes.question}
          onChange={(question) => setAttributes({ question })}
        />
        <TextareaControl
          label={__('Answer', Constants.TEXT_DOMAIN)}
          value={attributes.answer}
          onChange={(answer) => setAttributes({ answer })}
        />
      </div>
    );
  },
  save({ attributes }) {
    return (
      <li {...useBlockProps.save({ className: 'faq-question' })}>
        <div className="faq-question__question">
          <h2 className="text text--large">{attributes.question}</h2>
          <button
            type="button"
            className="faq-question__toggle"
            data-toggle-container-class="faq-question"
            data-toggle-container-open-class="faq-question--open"
            data-toggle-open-word={attributes.openWord}
            data-toggle-close-word={attributes.closeWord}
          >
            <span className="sr-only">Toggle {attributes.openWord} answer</span>
          </button>
        </div>
        <div className="faq-question__answer">{attributes.answer}</div>
      </li>
    );
  },
});
