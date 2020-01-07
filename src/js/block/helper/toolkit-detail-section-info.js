import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { registerBlockType } from '@wordpress/blocks';
import { TextControl } from '@wordpress/components';

import * as Constants from '../../constants';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_TOOLKIT_DETAIL_SECTION_INFO, {
  title: __('Toolkit Section Info', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY_TOOLKIT,
  // TODO icon and description
  supports: { inserter: false },
  attributes: {
    index: { type: 'number' },
    title: { type: 'string' },
    presenter: { type: 'string' },
  },
  edit({ attributes, setAttributes }) {
    return (
      <Fragment>
        <TextControl
          label={__('Section title', Constants.TEXT_DOMAIN)}
          value={attributes.title}
          onChange={title => setAttributes({ title })}
        />
        <TextControl
          label={__('Presenter', Constants.TEXT_DOMAIN)}
          value={attributes.presenter}
          onChange={presenter => setAttributes({ presenter })}
        />
      </Fragment>
    );
  },
  save({ attributes }) {
    return (
      <div className="toolkit-detail-container__header toolkit-detail-section__header">
        <h2 className="heading heading--3 heading--one-line">
          {attributes.index + 1}. {attributes.title}
        </h2>
        <p className="toolkit-detail-section__header__presenter">
          {attributes.presenter}
        </p>
      </div>
    );
  },
});
