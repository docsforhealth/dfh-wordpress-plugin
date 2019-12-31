import { __ } from '@wordpress/i18n';
import { Fragment } from 'react';
import { registerBlockType } from '@wordpress/blocks';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { ToggleControl, PanelBody, RadioControl } from '@wordpress/components';

import * as Constants from '../../constants';
import LinkPicker from '../../editor/link-picker';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_BUTTON, {
  title: __('Link Button', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY,
  parent: [Constants.BLOCK_BUTTON_CONTAINER],
  supports: { customClassName: false },
  attributes: {
    label: {
      type: 'string',
      default: __('Enter button label here', Constants.TEXT_DOMAIN),
    },
    url: { type: 'string' },
    urlTitle: { type: 'string' },
    size: { type: 'string', default: '' },
    isSecondary: { type: 'boolean', default: false },
    isOutlined: { type: 'boolean', default: false },
  },
  edit({ attributes, setAttributes }) {
    return (
      <Fragment>
        <InspectorControls>
          <PanelBody title={__('Link Button Settings', Constants.TEXT_DOMAIN)}>
            <RadioControl
              label={__('Size', Constants.TEXT_DOMAIN)}
              selected={attributes.size}
              options={[
                { label: __('Default', Constants.TEXT_DOMAIN), value: '' },
                {
                  label: __('Small', Constants.TEXT_DOMAIN),
                  value: Constants.BUTTON_SIZE_SMALL,
                },
              ]}
              onChange={size => setAttributes({ size })}
            />
            <ToggleControl
              label={__('Is secondary?', Constants.TEXT_DOMAIN)}
              checked={attributes.isSecondary}
              onChange={isSecondary => setAttributes({ isSecondary })}
            />
            <ToggleControl
              label={__('Is outlined?', Constants.TEXT_DOMAIN)}
              checked={attributes.isOutlined}
              onChange={isOutlined => setAttributes({ isOutlined })}
            />
          </PanelBody>
        </InspectorControls>
        <RichText
          className={`button-container__button button editor-is-clickable ${buildClasses(
            attributes,
          )}`}
          placeholder={attributes.label}
          value={attributes.label}
          onChange={label => setAttributes({ label })}
        />
        <LinkPicker
          url={attributes.url}
          title={attributes.urlTitle}
          onChange={({ url, title }) =>
            setAttributes({ url: url, urlTitle: title })
          }
        />
      </Fragment>
    );
  },
  save({ attributes }) {
    return (
      <LinkPicker.Content
        url={attributes.url}
        className={`button-container__button button ${buildClasses(
          attributes,
        )}`}
      >
        {attributes.label}
      </LinkPicker.Content>
    );
  },
});

function buildClasses(attributes) {
  const sizeClass = attributes.size ? `button--${attributes.size}` : '',
    isSecondaryClass = attributes.isSecondary ? 'button--secondary' : '',
    isOutlinedClass = attributes.isOutlined ? 'button--outline' : '';
  return `${sizeClass} ${isSecondaryClass} ${isOutlinedClass}`;
}
