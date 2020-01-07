import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { withSelect } from '@wordpress/data';

import * as Constants from '../../constants';
import * as Heading from '../heading';
import WithInnerBlockAttrs from '../../editor/with-inner-block-attrs';

const title = __('Toolkit Section', Constants.TEXT_DOMAIN);

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_TOOLKIT_DETAIL_SECTION, {
  title,
  category: Constants.CATEGORY_TOOLKIT,
  // TODO icon and description
  parent: [Constants.BLOCK_TOOLKIT_DETAIL_SECTION_CONTAINER],
  attributes: {
    overallMarkupId: { type: 'string' },
    parentClientId: { type: 'string' },
    backButtonLabel: { type: 'string' },
    nextButtonLabel: { type: 'string' },
    index: { type: 'number' },
    isLastBlock: { type: 'boolean' },
  },
  edit: withSelect((select, { clientId, attributes }) => {
    const store = select(Constants.STORE_BLOCK_EDITOR);
    return {
      // see https://developer.wordpress.org/block-editor/data/data-core-block-editor/#getBlockIndex
      index: store.getBlockIndex(clientId, attributes.parentClientId),
      // see https://developer.wordpress.org/block-editor/data/data-core-block-editor/#getNextBlockClientId
      isLastBlock: !store.getNextBlockClientId(clientId),
    };
  })(({ index, isLastBlock, clientId, attributes, setAttributes }) => {
    // Hooks cannot be used in the `save` hook so we must set the attributes here
    if (index !== attributes.index || isLastBlock !== attributes.isLastBlock) {
      setAttributes({ index, isLastBlock });
    }
    return (
      <Fragment>
        <div className="dfh-editor-block-title dfh-editor-block-title--nested">
          <span className="dfh-editor-block-title__label">{index + 1}</span>
          {title}
        </div>
        <div className="toolkit-detail-section">
          <WithInnerBlockAttrs
            clientId={clientId}
            innerBlockAttrs={{
              // Need to use WithInnerBlockAttrs to dynamically update index in case blocks reorder
              [Constants.BLOCK_TOOLKIT_DETAIL_SECTION_INFO]: { index },
            }}
          >
            <InnerBlocks
              templateLock={Constants.INNER_BLOCKS_LOCKED}
              template={[
                [Constants.BLOCK_TOOLKIT_DETAIL_SECTION_INFO],
                [
                  Constants.BLOCK_CONTENT_CONTAINER,
                  {
                    forceAttributes: {
                      [Constants.BLOCK_HEADING]: {
                        [Heading.ATTR_LEVEL]: Constants.HEADING_SIZE_MEDIUM,
                        [Heading.ATTR_OPTION_LEVEL]: false,
                        [Heading.ATTR_HIGHLIGHT_MAIN_TITLE]: false,
                        [Heading.ATTR_OPTION_HIGHLIGHT_MAIN_TITLE]: false,
                      },
                    },
                    template: [
                      [Constants.CORE_BLOCK_VIDEO],
                      [Constants.BLOCK_TEXT],
                      [Constants.CORE_BLOCK_SEPARATOR],
                      [
                        Constants.BLOCK_HEADING,
                        {
                          mainTitle: __(
                            'Further reading',
                            Constants.TEXT_DOMAIN,
                          ),
                        },
                      ],
                      [Constants.CORE_BLOCK_LIST],
                    ],
                  },
                ],
              ]}
            />
          </WithInnerBlockAttrs>
        </div>
      </Fragment>
    );
  }),
  save({ attributes }) {
    return (
      <div className="toolkit-detail-section">
        <InnerBlocks.Content />
        <div className="toolkit-detail-section__controls">
          <div className="button-container button-container--expand-width">
            {attributes.index > 0 && (
              <button
                type="button"
                className="button-container__button button button--outline"
                data-slick-nav-target-id={attributes.overallMarkupId}
                data-slick-nav-method="slickPrev"
              >
                {attributes.backButtonLabel}
              </button>
            )}
            {!attributes.isLastBlock && (
              <button
                type="button"
                className="button-container__button button button--secondary"
                data-slick-nav-target-id={attributes.overallMarkupId}
                data-slick-nav-method="slickNext"
              >
                {attributes.nextButtonLabel}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  },
});
