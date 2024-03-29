import {
  BlockControls,
  __experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';
import {
  Popover,
  TextareaControl,
  ToolbarButton,
  ToolbarGroup,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { info as InfoIcon } from '@wordpress/icons';
import {
  applyFormat,
  registerFormatType,
  toggleFormat,
  useAnchorRef,
} from '@wordpress/rich-text';
import * as Constants from 'src/js/constants';

// Custom format tutorial: https://developer.wordpress.org/block-editor/how-to-guides/format-api/
// Default formats: https://github.com/WordPress/gutenberg/blob/trunk/packages/format-library/src
// Rich Text block: https://github.com/WordPress/gutenberg/tree/trunk/packages/block-editor/src/components/rich-text
// Rich Text helper library: https://github.com/WordPress/gutenberg/tree/trunk/packages/rich-text

const type = `${Constants.NAMESPACE}/format-more-info`;
const title = __('More Info', Constants.TEXT_DOMAIN);
const settings = {
  title,
  // `object` implies a SELF-CLOSING tag so if true will assume that the tag is self-closing
  // see https://github.com/WordPress/gutenberg/issues/40051#issuecomment-1088836769
  object: false,
  tagName: 'span',
  className: 'more-info',
  attributes: {
    description: 'data-more-info-description',
    url: 'data-more-info-url',
  },
  // see https://github.com/WordPress/gutenberg/blob/trunk/packages/format-library/src/link/index.js
  // example: https://wordpress.stackexchange.com/a/376740
  // Note: because this is NOT an object, which is determine by whether `toggleFormat` or `insertObject`
  // is passed to the `onChange` function, we reference `isActive` and `activeAttributes` instead of
  // `isObjectActive` and `activeObjectAttributes`
  edit({ isActive, activeAttributes, value, onChange, onFocus, contentRef }) {
    const updateAttributes = (newAttrs) =>
      onChange(
        applyFormat(value, {
          type,
          attributes: {
            ...activeAttributes,
            ...newAttrs,
          },
        }),
      );
    // NOTE: Because `useAnchorRef` also called the `useMemo` hook, we need to call it here so that
    // adding a `Popover` doesn't change the hook order and trigger a React exception
    const anchorRef = useAnchorRef({ ref: contentRef, value, settings });
    // The documentation uses `RichTextToolbarButton` which adds the format to the "More" dropdown
    // Since we want to surface this format as a top-level button, we will use `BlockControls` instead
    // see https://github.com/WordPress/gutenberg/issues/14881#issuecomment-517115815
    return (
      <>
        <BlockControls>
          <ToolbarGroup>
            <ToolbarButton
              icon={InfoIcon}
              title={
                isActive ? __('Remove More Info', Constants.TEXT_DOMAIN) : title
              }
              isActive={isActive}
              onClick={() => onChange(toggleFormat(value, { type }))}
            />
          </ToolbarGroup>
        </BlockControls>
        {isActive && (
          <Popover
            anchorRef={anchorRef}
            focusOnMount={false}
            onClose={onFocus}
            className="more-info-editor-popover"
          >
            <TextareaControl
              className="more-info-editor-popover__control"
              label={__('Description', Constants.TEXT_DOMAIN)}
              placeholder={__(
                'Enter description here...',
                Constants.TEXT_DOMAIN,
              )}
              value={activeAttributes.description}
              onChange={(description) => updateAttributes({ description })}
            />
            <LinkControl
              value={{ url: activeAttributes.url }}
              settings={[]}
              onChange={({ url }) => updateAttributes({ url })}
              onRemove={() => updateAttributes({ url: '' })}
              hasRichPreviews
            />
          </Popover>
        )}
      </>
    );
  },
};

// see https://github.com/WordPress/gutenberg/tree/trunk/packages/rich-text#registerformattype
// see https://github.com/WordPress/gutenberg/blob/trunk/packages/rich-text/src/register-format-type.js
registerFormatType(type, settings);
