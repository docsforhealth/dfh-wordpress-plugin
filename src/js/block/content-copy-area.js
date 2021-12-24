import { InspectorControls } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { PanelBody, TextareaControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import * as Constants from 'src/js/constants';
import { addUniqueIdInApiVersionOne } from 'src/js/utils';

const ATTR_UNIQUE_ID = '_uniqueId',
  title = __('Content Copy Area', Constants.TEXT_DOMAIN);

registerBlockType(
  `${Constants.NAMESPACE}/content-copy-area`,
  addUniqueIdInApiVersionOne(ATTR_UNIQUE_ID, {
    title,
    icon: 'media-text',
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
      editorContentsLabel: {
        type: 'string',
        default: __('Contents to copy', Constants.TEXT_DOMAIN),
      },
      editorContentsPlaceholder: {
        type: 'string',
        default: __('Enter contents here', Constants.TEXT_DOMAIN),
      },
      // In the future, if want to add rich text copying, see https://stackoverflow.com/a/34192073
      plainTextContent: { type: 'string' },
    },
    edit({ attributes, setAttributes, clientId }) {
      return (
        <>
          <InspectorControls>
            <PanelBody title={__(`${title} Settings`, Constants.TEXT_DOMAIN)}>
              <TextControl
                label={__('Copy button initial state', Constants.TEXT_DOMAIN)}
                help={__(
                  'Shown on smaller screen sizes',
                  Constants.TEXT_DOMAIN,
                )}
                value={attributes.copyButtonLabel}
                onChange={(copyButtonLabel) =>
                  setAttributes({ copyButtonLabel })
                }
              />
              <TextControl
                label={__(
                  'Copy button after copying once',
                  Constants.TEXT_DOMAIN,
                )}
                help={__(
                  'Shown on smaller screen sizes',
                  Constants.TEXT_DOMAIN,
                )}
                value={attributes.copyDoneButtonLabel}
                onChange={(copyDoneButtonLabel) =>
                  setAttributes({ copyDoneButtonLabel })
                }
              />
            </PanelBody>
          </InspectorControls>
          <TextareaControl
            label={attributes.editorContentsLabel}
            placeholder={attributes.editorContentsPlaceholder}
            value={attributes.plainTextContent}
            onChange={(plainTextContent) => setAttributes({ plainTextContent })}
          />
        </>
      );
    },
    save({ attributes }) {
      return (
        <div className="content-copy-area">
          <button
            type="button"
            className="content-copy-area__copy"
            data-copy-selector={`#${attributes[ATTR_UNIQUE_ID]}-body`}
            data-copy-active-class="content-copy-area__copy--copying"
            data-copy-done-class="content-copy-area__copy--copied"
            data-copy-done-text={attributes.copyDoneButtonLabel}
          >
            {attributes.copyButtonLabel}
          </button>
          <span id={`${attributes[ATTR_UNIQUE_ID]}-body`}>
            {attributes.plainTextContent}
          </span>
        </div>
      );
    },
  }),
);
