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
    className: { type: 'string', default: '' },
    deemphasize: { type: 'boolean', default: false },
    oneLine: { type: 'boolean', default: false },
    placeholder: {
      type: 'string',
      default: __('Enter text here', Constants.TEXT_DOMAIN),
    },
    size: { type: 'string', default: '' },
    // `tagName` should not be `p` because cannot nest paragraph tags
    // see https://stackoverflow.com/a/12015809
    tagName: { type: 'string', default: 'div' },
    value: { type: 'string' },
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
                {
                  label: __('Large', Constants.TEXT_DOMAIN),
                  value: Constants.TEXT_SIZE_LARGE,
                },
                { label: __('Default', Constants.TEXT_DOMAIN), value: '' },
                {
                  label: __('Small', Constants.TEXT_DOMAIN),
                  value: Constants.TEXT_SIZE_SMALL,
                },
              ]}
              onChange={size => setAttributes({ size })}
            />
            <ToggleControl
              label={__('Force to be one line', Constants.TEXT_DOMAIN)}
              checked={attributes.oneLine}
              onChange={oneLine => setAttributes({ oneLine })}
            />
            <ToggleControl
              label={__('De-emphasize', Constants.TEXT_DOMAIN)}
              checked={attributes.deemphasize}
              onChange={deemphasize => setAttributes({ deemphasize })}
            />
          </PanelBody>
        </InspectorControls>
        <RichText
          tagName={attributes.tagName}
          className={`${className} text ${buildClasses(attributes)}`}
          placeholder={attributes.placeholder}
          value={attributes.value}
          onChange={value => setAttributes({ value })}
          multiline={!attributes.oneLine}
        />
      </Fragment>
    );
  },
  save({ attributes }) {
    return (
      <RichText.Content
        tagName={attributes.tagName}
        className={`text ${buildClasses(attributes)}`}
        value={attributes.value}
        multiline={!attributes.oneLine}
      />
    );
  },
});

function buildClasses(attributes) {
  const sizeClass = attributes.size ? `text--${attributes.size}` : '',
    oneLineClass = attributes.oneLine ? 'text--one-line' : '',
    deemphasizeClass = attributes.deemphasize ? 'text--light' : '',
    additionalClass = attributes.className ? attributes.className : '';
  return `${sizeClass} ${oneLineClass} ${deemphasizeClass} ${additionalClass}`;
}
