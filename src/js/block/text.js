import { __ } from '@wordpress/i18n';
import {
  createBlock,
  getBlockAttributes,
  registerBlockType,
} from '@wordpress/blocks';
import { Fragment } from '@wordpress/element';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { ToggleControl, PanelBody, RadioControl } from '@wordpress/components';

import * as Constants from '../constants';

export const ATTR_SIZE = 'size';
export const ATTR_OPTION_SIZE = 'showOptionSize';

const MERGE_BLOCK_PROP_NAME = 'value';

// Since this is now the default block, we need to support spitting, replacing, merging, etc
// see https://wordpress.org/support/topic/split-merge-and-replace-events-on-richtext-component/
// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_TEXT, {
  title: __('Text', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY_COMMON,
  icon: 'editor-paragraph',
  description: __('Paragraph text', Constants.TEXT_DOMAIN),
  attributes: {
    className: { type: 'string', default: '' },
    deemphasize: { type: 'boolean', default: false },
    oneLine: { type: 'boolean', default: false },
    placeholder: {
      type: 'string',
      default: __('Enter text here', Constants.TEXT_DOMAIN),
    },
    [ATTR_SIZE]: { type: 'string', default: Constants.TEXT_SIZE_DEFAULT },
    [ATTR_OPTION_SIZE]: { type: 'boolean', default: true },
    // `tagName` should not be `p` because cannot nest paragraph tags
    // see https://stackoverflow.com/a/12015809
    tagName: { type: 'string', default: 'div' },
    [MERGE_BLOCK_PROP_NAME]: { type: 'string' },
  },
  merge(attributes, attributesToMerge) {
    return {
      [MERGE_BLOCK_PROP_NAME]:
        (attributes[MERGE_BLOCK_PROP_NAME] || '') +
        (attributesToMerge[MERGE_BLOCK_PROP_NAME] || ''),
    };
  },
  // see https://github.com/WordPress/gutenberg/blob/00c82b4809e9b8b9d8e90b7220ceb4c6371a0ff1/packages/block-library/src/paragraph/edit.js#L183-L195
  // see https://wordpress.org/support/topic/split-merge-and-replace-events-on-richtext-component/
  edit({ className, attributes, setAttributes, mergeBlocks, onReplace }) {
    // Do NOT use the `multiline` attribute on `RichText` because this disrupts the appender
    // behavior when adding this block as a default block in the editor
    // see https://github.com/WordPress/gutenberg/blob/106b96a6add8a1ae75b5e3649c2a9a84ecbcbf36/packages/block-editor/src/components/block-list/block.js#L307
    return (
      <Fragment>
        <InspectorControls>
          <PanelBody title={__('Text Settings', Constants.TEXT_DOMAIN)}>
            {attributes[ATTR_OPTION_SIZE] && (
              <RadioControl
                label={__('Size', Constants.TEXT_DOMAIN)}
                selected={attributes[ATTR_SIZE]}
                options={[
                  {
                    label: __('Large', Constants.TEXT_DOMAIN),
                    value: Constants.TEXT_SIZE_LARGE,
                  },
                  {
                    label: __('Default', Constants.TEXT_DOMAIN),
                    value: Constants.TEXT_SIZE_DEFAULT,
                  },
                  {
                    label: __('Small', Constants.TEXT_DOMAIN),
                    value: Constants.TEXT_SIZE_SMALL,
                  },
                ]}
                onChange={size => setAttributes({ [ATTR_SIZE]: size })}
              />
            )}
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
          identifier={MERGE_BLOCK_PROP_NAME}
          className={`${className} text ${buildClassName(attributes)}`}
          placeholder={attributes.placeholder}
          value={attributes[MERGE_BLOCK_PROP_NAME]}
          onChange={value => setAttributes({ [MERGE_BLOCK_PROP_NAME]: value })}
          onSplit={value =>
            value
              ? createBlock(Constants.BLOCK_TEXT, {
                  ...attributes,
                  [MERGE_BLOCK_PROP_NAME]: value,
                })
              : createBlock(Constants.BLOCK_TEXT)
          }
          onMerge={mergeBlocks}
          onReplace={onReplace}
          onRemove={onReplace ? () => onReplace([]) : undefined}
          aria-label={
            attributes[MERGE_BLOCK_PROP_NAME]
              ? __('Text block', Constants.TEXT_DOMAIN)
              : __(
                  'Empty block; start writing or type forward slash to choose a block',
                  Constants.TEXT_DOMAIN,
                )
          }
        />
      </Fragment>
    );
  },
  save({ attributes }) {
    return (
      <RichText.Content
        tagName={attributes.tagName}
        className={`text ${buildClassName(attributes)}`}
        value={attributes[MERGE_BLOCK_PROP_NAME]}
      />
    );
  },
});

function buildClassName(attributes) {
  const sizeClass = attributes[ATTR_SIZE]
      ? `text--${attributes[ATTR_SIZE]}`
      : '',
    oneLineClass = attributes.oneLine ? 'text--one-line' : '',
    deemphasizeClass = attributes.deemphasize ? 'text--light' : '',
    additionalClass = attributes.className ? attributes.className : '';
  return `${sizeClass} ${oneLineClass} ${deemphasizeClass} ${additionalClass}`;
}
