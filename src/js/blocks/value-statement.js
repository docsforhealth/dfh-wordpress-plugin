import { __ } from '@wordpress/i18n';
import { Button, ToggleControl, PanelBody } from '@wordpress/components';
import { Fragment } from 'react';
import { registerBlockType } from '@wordpress/blocks';
import {
  InnerBlocks,
  InspectorControls,
  MediaUpload,
} from '@wordpress/block-editor';

import * as Constants from '../constants';
import placeholderUrl from '../../../assets/images/illustration-flower.png';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType('dfh/value-statement', {
  title: __('Value Statement', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY,
  attributes: {
    reverse: { type: 'boolean', default: false },
    valueImage: {
      type: 'string',
      source: 'attribute',
      selector: '.landing-value__image img',
      attribute: 'src',
      default: placeholderUrl,
    },
    valueImageAlt: {
      type: 'string',
      source: 'attribute',
      selector: '.landing-value__image img',
      attribute: 'alt',
      default: 'Value illustration',
    },
  },
  edit({ attributes, setAttributes }) {
    return (
      <Fragment>
        <InspectorControls>
          <PanelBody
            title={__('Value Statement Settings', Constants.TEXT_DOMAIN)}
          >
            <ToggleControl
              label="Show image on left"
              checked={attributes.reverse}
              onChange={reverse => setAttributes({ reverse })}
            />
          </PanelBody>
        </InspectorControls>
        <div
          className={`landing-value ${attributes.reverse &&
            'landing-value--reversed'}`}
        >
          <div className="landing-value__description">
            <InnerBlocks
              templateLock="all"
              allowedBlocks={[Constants.BLOCK_TITLE, Constants.BLOCK_TEXT]}
              template={[
                [
                  Constants.BLOCK_TITLE,
                  { className: 'landing-value__description-title' },
                ],
                [Constants.BLOCK_TEXT, {}],
              ]}
            />
          </div>
          <div className="landing-value__image">
            <img src={attributes.valueImage} alt={attributes.valueImageAlt} />
            <MediaUpload
              onSelect={({ url, alt }) =>
                setAttributes({ valueImage: url, valueImageAlt: alt })
              }
              type="image"
              value={attributes.valueImage}
              render={({ open }) => (
                <div style={{ marginTop: '1rem' }}>
                  <Button
                    className="button button--outline button--small"
                    onClick={open}
                  >
                    {__('Select image', Constants.TEXT_DOMAIN)}
                  </Button>
                </div>
              )}
            />
          </div>
        </div>
      </Fragment>
    );
  },
  save({ attributes }) {
    return (
      <div
        className={`landing-value ${attributes.reverse &&
          'landing-value--reversed'}`}
      >
        <div className="landing-value__description">
          <InnerBlocks.Content />
        </div>
        <div className="landing-value__image">
          <img src={attributes.valueImage} alt={attributes.valueImageAlt} />
        </div>
      </div>
    );
  },
});
