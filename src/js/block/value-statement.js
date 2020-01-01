import { __ } from '@wordpress/i18n';
import { Fragment } from 'react';
import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { ToggleControl, PanelBody } from '@wordpress/components';

import * as Constants from '../constants';
import ImagePicker from '../editor/image-picker';

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
        <div className={`landing-value ${buildClassName(attributes)}`}>
          <InnerBlocks
            allowedBlocks={[Constants.BLOCK_TEXT_CONTAINER]}
            templateLock={Constants.INNER_BLOCKS_LOCKED}
            template={[
              [
                Constants.BLOCK_TEXT_CONTAINER,
                {
                  wrapperElement: 'div',
                  wrapperClassName: 'landing-value__description',
                },
              ],
            ]}
          />
          <div className="landing-value__image">
            <ImagePicker
              onSelect={({ url, alt }) =>
                setAttributes({ valueImage: url, valueImageAlt: alt })
              }
              url={attributes.valueImage}
              description={attributes.valueImageAlt}
            />
          </div>
        </div>
      </Fragment>
    );
  },
  save({ attributes }) {
    return (
      <div className={`landing-value ${buildClassName(attributes)}`}>
        <InnerBlocks.Content />
        <div className="landing-value__image">
          <ImagePicker.Content
            url={attributes.valueImage}
            description={attributes.valueImageAlt}
          />
        </div>
      </div>
    );
  },
});

function buildClassName(attributes) {
  return attributes.reverse ? 'landing-value--reversed' : '';
}
