import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { ToggleControl, PanelBody, RadioControl } from '@wordpress/components';

import * as Constants from '../../constants';

export const ATTR_SIZE = 'size';
export const ATTR_OPTION_SIZE = 'showSizeOptions';
export const config = {
  category: Constants.CATEGORY_COMMON,
  parent: [Constants.BLOCK_BUTTON_CONTAINER],
  supports: { customClassName: false },
  attributes: {
    label: { type: 'string' },
    [ATTR_SIZE]: { type: 'string', default: Constants.BUTTON_SIZE_DEFAULT },
    [ATTR_OPTION_SIZE]: { type: 'boolean', default: true },
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
          {attributes[ATTR_OPTION_SIZE] && (
            <RadioControl
              label={__('Size', Constants.TEXT_DOMAIN)}
              selected={attributes[ATTR_SIZE]}
              options={[
                {
                  label: __('Default', Constants.TEXT_DOMAIN),
                  value: Constants.BUTTON_SIZE_DEFAULT,
                },
                {
                  label: __('Small', Constants.TEXT_DOMAIN),
                  value: Constants.BUTTON_SIZE_SMALL,
                },
              ]}
              onChange={size => setAttributes({ [ATTR_SIZE]: size })}
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
        className={`button-container__button button editor-is-clickable ${buildButtonClassName(
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
      className={`button-container__button button ${buildButtonClassName(
        attributes,
      )}`}
    >
      {attributes.label}
    </a>
  );
}

function buildButtonClassName(attributes) {
  const sizeClass = attributes[ATTR_SIZE]
      ? `button--${attributes[ATTR_SIZE]}`
      : '',
    isSecondaryClass = attributes.isSecondary ? 'button--secondary' : '',
    isOutlinedClass = attributes.isOutlined ? 'button--outline' : '';
  return `${sizeClass} ${isSecondaryClass} ${isOutlinedClass}`;
}
