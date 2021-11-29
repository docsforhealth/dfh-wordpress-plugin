import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { PanelBody, TextareaControl, TextControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import * as Constants from 'src/js/constants';

const title = __('Content Copy Area', Constants.TEXT_DOMAIN);

registerBlockType(`${Constants.NAMESPACE}/content-copy-area`, {
  apiVersion: 2,
  title,
  category: Constants.CATEGORY_COMMON,
  description: __(
    'Highlights content within a visually-distinct container with one-click copying of contents',
    Constants.TEXT_DOMAIN,
  ),
  attributes: {
    copyButtonLabel: {
      type: 'string',
      default: __('Copy', Constants.TEXT_DOMAIN),
    },
    copyDoneButtonLabel: {
      type: 'string',
      default: __('Copied', Constants.TEXT_DOMAIN),
    },
    // In the future, if want to add rich text copying, see https://stackoverflow.com/a/34192073
    plainTextContent: { type: 'string' },
    // props below are not user-editable, can be overridden programmatically
    uniqueId: { type: 'string' },
    editorContentsLabel: {
      type: 'string',
      default: __('Contents to copy', Constants.TEXT_DOMAIN),
    },
    editorContentsPlaceholder: {
      type: 'string',
      default: __('Enter contents here', Constants.TEXT_DOMAIN),
    },
  },
  edit({ attributes, setAttributes, clientId }) {
    if (!attributes.uniqueId) {
      setAttributes({ uniqueId: clientId });
    }
    return (
      <Fragment>
        <InspectorControls>
          <PanelBody title={__(`${title} Settings`, Constants.TEXT_DOMAIN)}>
            <TextControl
              label={__('Copy button initial state', Constants.TEXT_DOMAIN)}
              help={__('Shown on smaller screen sizes', Constants.TEXT_DOMAIN)}
              value={attributes.copyButtonLabel}
              onChange={(copyButtonLabel) => setAttributes({ copyButtonLabel })}
            />
            <TextControl
              label={__(
                'Copy button after copying once',
                Constants.TEXT_DOMAIN,
              )}
              help={__('Shown on smaller screen sizes', Constants.TEXT_DOMAIN)}
              value={attributes.copyDoneButtonLabel}
              onChange={(copyDoneButtonLabel) =>
                setAttributes({ copyDoneButtonLabel })
              }
            />
          </PanelBody>
        </InspectorControls>
        <div {...useBlockProps()}>
          <TextareaControl
            label={attributes.editorContentsLabel}
            placeholder={attributes.editorContentsPlaceholder}
            value={attributes.plainTextContent}
            onChange={(plainTextContent) => setAttributes({ plainTextContent })}
          />
        </div>
      </Fragment>
    );
  },
  save({ attributes }) {
    return (
      <div {...useBlockProps.save({ className: 'content-copy-area' })}>
        <button
          type="button"
          className="content-copy-area__copy"
          data-copy-selector={`#${attributes.uniqueId}-body`}
          data-copy-active-class="content-copy-area__copy--copying"
          data-copy-done-class="content-copy-area__copy--copied"
          data-copy-done-text={attributes.copyDoneButtonLabel}
        >
          {attributes.copyButtonLabel}
        </button>
        <span id={`${attributes.uniqueId}-body`}>
          {attributes.plainTextContent}
        </span>
      </div>
    );
  },
});
