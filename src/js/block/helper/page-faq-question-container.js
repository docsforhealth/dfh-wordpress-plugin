import { useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import * as Constants from 'src/js/constants';

// TODO

registerBlockType(Constants.BLOCK_FAQ_QUESTION_CONTAINER, {
  apiVersion: 2,
  title: __('Page FAQ Question Container', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY_LAYOUT,
  // icon: '', // TODO
  description: __('', Constants.TEXT_DOMAIN), // TODO
  supports: { inserter: false },
  edit({ attributes, setAttributes }) {
    // TODO {...useBlockProps()}
    // TODO Constants.BLOCK_PAGE_TITLE for dynamic page title
    // TODO Constants.BLOCK_FAQ_QUESTION
    return (
      <div {...useBlockProps()}>
        <button
          type="button"
          class="page-faq__card__toggle"
          data-lity
          data-lity-target="#dfh-resources-faq"
          data-lity-override-modal-class="modal--open"
          data-lity-override-container-class="container container--narrow"
        >
          TODO View 1 answered questions
        </button>
        <div
          id="dfh-resources-faq"
          class="page-faq__card__content lity-hide modal modal--adaptive"
        >
          <div class="modal__title">
            <h1 class="heading heading--2 heading--bold">
              Forms & Letters Help
            </h1>
          </div>
          <div class="modal__content">
            <ul class="page-faq__questions">
              <li class="faq-question">
                <div class="faq-question__question">
                  <h2 class="text text--large">TODO Question</h2>
                  <button
                    type="button"
                    class="faq-question__toggle"
                    data-toggle-container-class="faq-question"
                    data-toggle-container-open-class="faq-question--open"
                    data-toggle-open-word="show"
                    data-toggle-close-word="hide"
                  >
                    <span class="sr-only">TODO Toggle show answer</span>
                  </button>
                </div>
                <div class="faq-question__answer">TODO Answer</div>
              </li>
            </ul>
          </div>
          <div class="modal__toggle">
            <button
              type="button"
              class="button button--small button--outline"
              data-lity-close
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  },
  save({ attributes }) {
    return <div {...useBlockProps.save()}></div>;
  },
});
