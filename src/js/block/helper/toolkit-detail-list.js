import _ from 'lodash';
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { TextControl } from '@wordpress/components';
import { withSelect } from '@wordpress/data';

import * as Constants from '../../constants';
import * as LinkList from './toolkit-detail-list-link';
import * as SectionInfo from './toolkit-detail-section-info';

export const ATTR_OVERALL_MARKUP_ID = 'overallMarkupId';
export const ATTR_PARENT_CLIENT_ID = 'parentClientId';

const INT_SECTION_TITLE = 'title',
  INT_SECTION_PRESENTER = 'presenter',
  INT_LINK_TITLE = 'title',
  INT_LINK_URL = 'url',
  INT_LINK_SHOWATEND = 'showAtEnd';
const debouncedTryUpdateInnerBlockData = _.debounce(
  tryUpdateInnerBlockData,
  500,
);

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_TOOLKIT_DETAIL_LIST, {
  title: __('Toolkit Detail List', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY_TOOLKIT,
  icon: 'excerpt-view',
  description: __(
    'Links and navigation for a specific toolkit',
    Constants.TEXT_DOMAIN,
  ),
  supports: { inserter: false },
  attributes: {
    [ATTR_OVERALL_MARKUP_ID]: { type: 'string' },
    [ATTR_PARENT_CLIENT_ID]: { type: 'string' },
    sectionInfoList: { type: 'array', default: [] },
    linkInfoList: { type: 'array', default: [] },
  },
  edit: withSelect((select, { attributes }) => {
    const store = select(Constants.STORE_BLOCK_EDITOR),
      descendentIds = store.getClientIdsOfDescendants([
        attributes[ATTR_PARENT_CLIENT_ID],
      ]);
    return {
      innerBlockObjs: store.getBlocksByClientId(descendentIds),
    };
  })(({ innerBlockObjs, attributes, setAttributes }) => {
    // Hooks cannot be used in the `save` hook so we must set the attributes here
    debouncedTryUpdateInnerBlockData(innerBlockObjs, attributes, setAttributes);
    return (
      <Fragment>
        <div className="dfh-editor-block-title dfh-editor-block-title--nested">
          {__('Toolkit Links', Constants.TEXT_DOMAIN)}
        </div>
        <InnerBlocks
          allowedBlocks={[Constants.BLOCK_TOOLKIT_DETAIL_LIST_LINK]}
          // If parent InnerBlocks is locked, then we explicitly need to unlock this
          templateLock={Constants.INNER_BLOCKS_UNLOCKED}
          template={[[Constants.BLOCK_TOOLKIT_DETAIL_LIST_LINK]]}
        />
      </Fragment>
    );
  }),
  save({ attributes }) {
    const { sectionInfoList, linkInfoList } = attributes,
      numSections = sectionInfoList.length;
    return (
      <div className="toolkit-topics">
        <ol className="toolkit-topics__unsequenced-list">
          <InnerBlocks.Content />
        </ol>
        <button
          type="button"
          className="toolkit-topics__toggle button button--small button--outline button--secondary"
        >
          Show all {numSections} sections
        </button>
        <ol className="toolkit-topics__list">
          {linkInfoList
            // Show at end is false
            .filter(info => !info[INT_LINK_SHOWATEND])
            .map(info =>
              LinkList.buildSaveElement(
                info[INT_LINK_TITLE],
                info[INT_LINK_URL],
              ),
            )}
          {[...Array(numSections).keys()].map(index =>
            // Toolkit sections are in the middle
            buildSectionItem(
              attributes[ATTR_OVERALL_MARKUP_ID],
              sectionInfoList[index],
              numSections,
              index,
            ),
          )}
          {linkInfoList
            // Show at end is true
            .filter(info => info[INT_LINK_SHOWATEND])
            .map(info =>
              LinkList.buildSaveElement(
                info[INT_LINK_TITLE],
                info[INT_LINK_URL],
              ),
            )}
        </ol>
      </div>
    );
  },
});

function tryUpdateInnerBlockData(innerBlockData, attributes, setAttributes) {
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

function buildSectionItem(overallMarkupId, sectionInfo, numSections, index) {
  const title = sectionInfo[INT_SECTION_TITLE],
    presenter = sectionInfo[INT_SECTION_PRESENTER];
  return (
    <li
      key={`${title}-${presenter}`}
      className={`toolkit-topics__section ${
        index === numSections - 1
          ? 'toolkit-topics__section--last-in-sequence'
          : ''
      }`}
      data-slick-nav-target-id={overallMarkupId}
      data-slick-nav-target-index={index}
    >
      <div className="toolkit-topics__section__indicator-wrapper">
        <button type="button" className="toolkit-topics__section__control">
          <div className="toolkit-topics__section__control__title">{title}</div>
          <div className="toolkit-topics__section__control__subtitle">
            {presenter}
          </div>
        </button>
      </div>
    </li>
  );
}
