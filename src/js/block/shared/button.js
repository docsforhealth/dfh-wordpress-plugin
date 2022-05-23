import { InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, RadioControl, ToggleControl } from '@wordpress/components';
import { forwardRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { filter } from 'lodash';
import PropTypes from 'prop-types';
import * as Constants from 'src/js/constants';

////////////////
// Attributes //
////////////////

export const ATTR_SIZE = 'size';
export const ATTR_OPTION_SIZE = 'showSizeOptions';

///////////////////
// Configuration //
///////////////////

export const SHARED_CONFIG = {
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

//////////
// Edit //
//////////

export const Edit = forwardRef(
  ({ attributes, setAttributes, children, ...otherProps }, ref) => {
    return (
      <>
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
                onChange={(size) => setAttributes({ [ATTR_SIZE]: size })}
              />
            )}
            <ToggleControl
              label={__('Is secondary?', Constants.TEXT_DOMAIN)}
              checked={attributes.isSecondary}
              onChange={(isSecondary) => setAttributes({ isSecondary })}
            />
            <ToggleControl
              label={__('Is outlined?', Constants.TEXT_DOMAIN)}
              checked={attributes.isOutlined}
              onChange={(isOutlined) => setAttributes({ isOutlined })}
            />
          </PanelBody>
        </InspectorControls>
        <div {...otherProps} ref={ref}>
          <RichText
            className={`button-container__button button dfh-editor-is-clickable ${buildButtonClassName(
              attributes,
            )}`}
            placeholder={__('Enter button label here', Constants.TEXT_DOMAIN)}
            value={attributes.label}
            onChange={(label) => setAttributes({ label })}
            allowedFormats={[]}
          />
          {children &&
            children({
              url: attributes.url,
              title: attributes.urlTitle,
              label: __('Button target', Constants.TEXT_DOMAIN),
              onChange: ({ url, title }) =>
                setAttributes({ url, urlTitle: title }),
            })}
        </div>
      </>
    );
  },
);
Edit.propTypes = {
  attributes: PropTypes.object.isRequired,
  setAttributes: PropTypes.func.isRequired,
  children: PropTypes.func,
};

//////////
// Save //
//////////

export const Save = forwardRef(
  ({ attributes, openInNewTab, ...otherProps }, ref) => {
    // see https://github.com/WordPress/gutenberg/tree/trunk/packages/block-editor/src/components/rich-text#richtextcontent
    const openProps = openInNewTab
      ? {
          rel: 'noopener noreferrer',
          target: '_blank',
        }
      : {};
    return (
      <a
        {...otherProps}
        {...openProps}
        ref={ref}
        href={attributes.url}
        className={`button-container__button button ${buildButtonClassName(
          attributes,
        )}`}
      >
        <RichText.Content value={attributes.label} />
      </a>
    );
  },
);
Save.propTypes = {
  attributes: PropTypes.object.isRequired,
  openInNewTab: PropTypes.bool,
};

/////////////
// Helpers //
/////////////

function buildButtonClassName(attributes) {
  return filter([
    attributes[ATTR_SIZE] ? `button--${attributes[ATTR_SIZE]}` : '',
    attributes.isSecondary ? 'button--secondary' : '',
    attributes.isOutlined ? 'button--outline' : '',
  ]).join(' ');
}
