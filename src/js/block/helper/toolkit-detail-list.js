import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { registerBlockType } from '@wordpress/blocks';
import { TextControl } from '@wordpress/components';

// TODO
import _ from 'lodash';
import { useSelect } from '@wordpress/data';

import * as Constants from '../../constants';

const debouncedTryUpdateSectionData = _.debounce(tryUpdateSectionData, 500);

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_TOOLKIT_DETAIL_LIST, {
  title: __('Toolkit Detail List', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY_TOOLKIT,
  // TODO icon and description
  supports: { inserter: false },
  attributes: {
    overallMarkupId: { type: 'string' },
    parentClientId: { type: 'string' },
    sectionTitles: { type: 'array' },
    sectionPresenters: { type: 'array' },
  },
  edit({ attributes, setAttributes }) {
    // TODO refactor
    const sectionData = useSelect(select => {
      const store = select(Constants.STORE_BLOCK_EDITOR),
        descendentIds = store.getClientIdsOfDescendants([
          attributes.parentClientId,
        ]);
      return store.getBlocksByClientId(descendentIds);
    });
    debouncedTryUpdateSectionData(sectionData, attributes, setAttributes);
    return null;
  },
  save({ attributes }) {
    const { sectionTitles, sectionPresenters } = attributes,
      numSections = sectionTitles.length;

    return (
      <div className="toolkit-detail-container__list">
        <div className="toolkit-detail-container__header" />
        <div className="toolkit-topics">
          <ol className="toolkit-topics__unsequenced-list">{/* TODO */}</ol>
          <button
            type="button"
            className="toolkit-topics__toggle button button--small button--outline button--secondary"
          >
            Show all {numSections} sections
          </button>
          <ol className="toolkit-topics__list">
            {[...Array(numSections).keys()].map(index =>
              buildListItem(
                attributes.overallMarkupId,
                sectionTitles,
                sectionPresenters,
                numSections,
                index,
              ),
            )}
          </ol>
        </div>
      </div>
    );
  },
});

function tryUpdateSectionData(sectionData, attributes, setAttributes) {
  const sectionTitles = [],
    sectionPresenters = [];
  sectionData
    .filter(block => block.name === Constants.BLOCK_TOOLKIT_DETAIL_SECTION_INFO)
    .forEach(({ attributes }) => {
      sectionTitles.push(attributes.title);
      sectionPresenters.push(attributes.presenter);
    });
  if (
    !_.isEqual(sectionTitles, attributes.sectionTitles) ||
    !_.isEqual(sectionPresenters, attributes.sectionPresenters)
  ) {
    setAttributes({ sectionTitles, sectionPresenters });
  }
}

function buildListItem(
  overallMarkupId,
  sectionTitles,
  sectionPresenters,
  numSections,
  index,
) {
  return (
    <li
      key={`${sectionTitles[index]}-${sectionPresenters[index]}`}
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
          <div className="toolkit-topics__section__control__title">
            {sectionTitles[index]}
          </div>
          <div className="toolkit-topics__section__control__subtitle">
            {sectionPresenters[index]}
          </div>
        </button>
      </div>
    </li>
  );
}
