import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { registerBlockType } from '@wordpress/blocks';
import { TextControl } from '@wordpress/components';

import * as Constants from '../../constants';

export const ATTR_INDEX = 'index';
export const ATTR_PRESENTER = 'presenter';
export const ATTR_TITLE = 'title';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_TOOLKIT_DETAIL_SECTION_INFO, {
  title: __('Toolkit Section Info', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY_TOOLKIT,
  // TODO icon and description
  supports: { inserter: false },
  attributes: {
    [ATTR_INDEX]: { type: 'number' },
    [ATTR_TITLE]: { type: 'string' },
    [ATTR_PRESENTER]: { type: 'string' },
  },
  edit({ attributes, setAttributes }) {
    return (
      <Fragment>
        <TextControl
          label={__('Section title', Constants.TEXT_DOMAIN)}
          value={attributes[ATTR_TITLE]}
          onChange={title => setAttributes({ [ATTR_TITLE]: title })}
        />
        <TextControl
          label={__('Presenter', Constants.TEXT_DOMAIN)}
          value={attributes[ATTR_PRESENTER]}
          onChange={presenter => setAttributes({ [ATTR_PRESENTER]: presenter })}
        />
      </Fragment>
    );
  },
  save({ attributes }) {
    return (
      <div className="toolkit-detail-container__header toolkit-detail-section__header">
        <h2 className="heading heading--3 heading--one-line">
          {attributes[ATTR_INDEX] + 1}. {attributes[ATTR_TITLE]}
        </h2>
        <p className="toolkit-detail-section__header__presenter">
          {attributes[ATTR_PRESENTER]}
        </p>
      </div>
    );
  },
});
