import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { withSelect } from '@wordpress/data';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import * as Heading from 'src/js/block/heading';
import * as Constants from 'src/js/constants';
import WithInnerBlockAttrs from 'src/js/editor/with-inner-block-attrs';

export const ATTR_OVERALL_MARKUP_ID = 'overallMarkupId';
export const ATTR_PARENT_CLIENT_ID = 'parentClientId';
export const ATTR_BACK_BUTTON_LABEL = 'backButtonLabel';
export const ATTR_NEXT_BUTTON_LABEL = 'nextButtonLabel';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_TOOLKIT_DETAIL_SECTION, {
  title: __('Toolkit Section', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY_CUSTOM_DATA,
  icon: 'analytics',
  description: __(
    'Text and rich media content for a particular section of a toolkit',
    Constants.TEXT_DOMAIN,
  ),
  parent: [Constants.BLOCK_TOOLKIT_DETAIL_SECTION_CONTAINER],
  attributes: {
    // NOTE do not need to save `ATTR_PARENT_CLIENT_ID` because this changes with every page load
    // [ATTR_PARENT_CLIENT_ID]: { type: 'string' },
    [ATTR_OVERALL_MARKUP_ID]: { type: 'string' },
    [ATTR_BACK_BUTTON_LABEL]: { type: 'string' },
    [ATTR_NEXT_BUTTON_LABEL]: { type: 'string' },
    index: { type: 'number' },
    isLastBlock: { type: 'boolean' },
  },
  edit: withSelect((select, { clientId, attributes }) => {
    const store = select(Constants.STORE_BLOCK_EDITOR);
    return {
      // see https://developer.wordpress.org/block-editor/data/data-core-block-editor/#getBlockIndex
      index: store.getBlockIndex(clientId, attributes[ATTR_PARENT_CLIENT_ID]),
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
          <div>{__('Section', Constants.TEXT_DOMAIN)}</div>
          <span className="dfh-editor-block-title__label">{index + 1}</span>
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
                      [Constants.CORE_BLOCK_EMBED],
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
                data-slick-nav-target-id={attributes[ATTR_OVERALL_MARKUP_ID]}
                data-slick-nav-method="slickPrev"
              >
                {attributes[ATTR_BACK_BUTTON_LABEL]}
              </button>
            )}
            {!attributes.isLastBlock && (
              <button
                type="button"
                className="button-container__button button button--secondary"
                data-slick-nav-target-id={attributes[ATTR_OVERALL_MARKUP_ID]}
                data-slick-nav-method="slickNext"
              >
                {attributes[ATTR_NEXT_BUTTON_LABEL]}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  },
});

function tryUpdateSectionData(innerBlockData, attributes, setAttributes) {
  const sectionInfoList = [],
    linkInfoList = [];
  innerBlockData.forEach(({ name, attributes }) => {
    if (name === Constants.BLOCK_TOOLKIT_DETAIL_SECTION_INFO) {
      sectionInfoList.push({
        [INT_SECTION_TITLE]: attributes[SectionInfo.ATTR_TITLE],
        [INT_SECTION_PRESENTER]: attributes[SectionInfo.ATTR_PRESENTER],
      });
    } else if (name === Constants.BLOCK_TOOLKIT_DETAIL_LIST_LINK) {
      linkInfoList.push({
        [INT_LINK_TITLE]: attributes[LinkList.ATTR_TITLE],
        [INT_LINK_URL]: attributes[LinkList.ATTR_URL],
        [INT_LINK_SHOWATEND]: attributes[LinkList.ATTR_SHOW_AT_END],
      });
    }
  });
  if (
    !_.isEqual(sectionInfoList, attributes.sectionInfoList) ||
    !_.isEqual(linkInfoList, attributes.linkInfoList)
  ) {
    setAttributes({ sectionInfoList, linkInfoList });
  }
}
