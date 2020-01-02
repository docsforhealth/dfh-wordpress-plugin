import { __ } from '@wordpress/i18n';
import { Fragment } from 'react';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { ToggleControl, PanelBody, RadioControl } from '@wordpress/components';

import * as Constants from '../../constants';

export const ATTRIBUTE_SIZE = 'size';
export const ATTRIBUTE_SHOW_SIZE_OPTIONS = 'showSizeOptions';
export const config = {
  category: Constants.CATEGORY,
  parent: [Constants.BLOCK_BUTTON_CONTAINER],
  supports: { customClassName: false },
  attributes: {
    label: { type: 'string' },
    [ATTRIBUTE_SIZE]: { type: 'string', default: '' },
    [ATTRIBUTE_SHOW_SIZE_OPTIONS]: { type: 'boolean', default: true },
    isSecondary: { type: 'boolean', default: false },
    isOutlined: { type: 'boolean', default: false },
    url: { type: 'string' },
    urlTitle: { type: 'string' },
  },
};

export function buildButtonEdit({ attributes, setAttributes }, AssetPicker) {
  return (
    <Fragment>
      <InspectorControls>
        <PanelBody title={__('Link Button Settings', Constants.TEXT_DOMAIN)}>
          {attributes[ATTRIBUTE_SHOW_SIZE_OPTIONS] && (
            <RadioControl
              label={__('Size', Constants.TEXT_DOMAIN)}
              selected={attributes[ATTRIBUTE_SIZE]}
              options={[
                { label: __('Default', Constants.TEXT_DOMAIN), value: '' },
                {
                  label: __('Small', Constants.TEXT_DOMAIN),
                  value: Constants.BUTTON_SIZE_SMALL,
                },
              ]}
              onChange={size => setAttributes({ [ATTRIBUTE_SIZE]: size })}
            />
          )}
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
        className={`button-container__button button editor-is-clickable ${buildButtonClasseName(
          attributes,
        )}`}
        placeholder={__('Enter button label here', Constants.TEXT_DOMAIN)}
        value={attributes.label}
        onChange={label => setAttributes({ label })}
      />
      <AssetPicker
        url={attributes.url}
        title={attributes.urlTitle}
        onChange={({ url, title }) => setAttributes({ url, urlTitle: title })}
      />
    </Fragment>
  );
}

export function buildButtonSave({ attributes }, { openInNewTab = false } = {}) {
  const openProps = openInNewTab
    ? {
        rel: 'noopener noreferrer',
        target: '_blank',
      }
    : {};
  return (
    <a
      {...openProps}
      href={attributes.url}
      className={`button-container__button button ${buildButtonClasseName(
        attributes,
      )}`}
    >
      {attributes.label}
    </a>
  );
}

export function buildButtonClasseName(attributes) {
  const sizeClass = attributes[ATTRIBUTE_SIZE]
      ? `button--${attributes[ATTRIBUTE_SIZE]}`
      : '',
    isSecondaryClass = attributes.isSecondary ? 'button--secondary' : '',
    isOutlinedClass = attributes.isOutlined ? 'button--outline' : '';
  return `${sizeClass} ${isSecondaryClass} ${isOutlinedClass}`;
}
