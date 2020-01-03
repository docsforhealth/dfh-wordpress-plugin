import { __ } from '@wordpress/i18n';
import { Fragment } from 'react';
import { InnerBlocks } from '@wordpress/block-editor';
import { InspectorControls } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { ToggleControl, PanelBody } from '@wordpress/components';

import * as Constants from '../constants';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType('dfh/content-container', {
  title: __('Content Container', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY_COMMON,
  icon: 'grid-view',
  description: __(
    'Ensures appropriate horizontal spacing and width of content of any type',
    Constants.TEXT_DOMAIN,
  ),
  attributes: {
    isNarrow: { type: 'boolean', default: false },
  },
  edit({ attributes, setAttributes }) {
    // TODO how to make content container more visible in the editor to show inspector options?
    //      maybe try adding a title to each component?
    // Do not apply `container` classes in the editor because of limited width
    return (
      <Fragment>
        <InspectorControls>
          <PanelBody
            title={__('Content Container Settings', Constants.TEXT_DOMAIN)}
          >
            <ToggleControl
              label={__('Is narrow width?', Constants.TEXT_DOMAIN)}
              checked={attributes.isNarrow}
              onChange={isNarrow => setAttributes({ isNarrow })}
            />
          </PanelBody>
        </InspectorControls>
        <div>
          <InnerBlocks templateLock={false} />
        </div>
      </Fragment>
    );
  },
  save({ attributes }) {
    return (
      <div className={`container ${buildClassName(attributes)}`}>
        <InnerBlocks.Content />
      </div>
    );
  },
});

function buildClassName(attributes) {
  return attributes.isNarrow ? 'container--narrow' : '';
}
