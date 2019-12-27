import { __ } from '@wordpress/i18n';
import { Fragment } from 'react';
import { registerBlockType } from '@wordpress/blocks';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { ToggleControl, PanelBody, RadioControl } from '@wordpress/components';

import * as Constants from '../constants';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_TEXT, {
  title: __('Text', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY,
  attributes: {
    value: {
      type: 'string',
      source: 'html',
      selector: 'p',
    },
    size: { type: 'string', default: '' },
    oneLine: { type: 'boolean', default: false },
    deemphasize: { type: 'boolean', default: false },
  },
  edit({ className, attributes, setAttributes }) {
    return (
      <Fragment>
        <InspectorControls>
          <PanelBody title={__('Text Settings', Constants.TEXT_DOMAIN)}>
            <RadioControl
              label={__('Size', Constants.TEXT_DOMAIN)}
              selected={attributes.size}
              options={[
                { label: 'Large', value: 'large' },
                { label: 'Default', value: '' },
                { label: 'Small', value: 'small' },
              ]}
              onChange={size => setAttributes({ size })}
            />
            <ToggleControl
              label="Force to be one line"
              checked={attributes.oneLine}
              onChange={oneLine => setAttributes({ oneLine })}
            />
            <ToggleControl
              label="De-emphasize"
              checked={attributes.deemphasize}
              onChange={deemphasize => setAttributes({ deemphasize })}
            />
          </PanelBody>
        </InspectorControls>
        <RichText
          tagName="p"
          className={`${className} text ${buildClasses(attributes)}`}
          placeholder={__('Enter text here', Constants.TEXT_DOMAIN)}
          value={attributes.value}
          onChange={value => setAttributes({ value })}
          preserveWhiteSpace={!attributes.oneLine}
        />
      </Fragment>
    );
  },
  save({ attributes }) {
    return (
      <RichText.Content
        tagName="p"
        className={`text ${buildClasses(attributes)}`}
        value={attributes.value}
        preserveWhiteSpace={!attributes.oneLine}
      />
    );
  },
});

function buildClasses(attributes) {
  const sizeClass = attributes.size && `text--${attributes.size}`,
    oneLineClass = attributes.oneLine && 'text--one-line',
    deemphasizeClass = attributes.deemphasize && 'text--light';
  return `${sizeClass} ${oneLineClass} ${deemphasizeClass}`;
}
