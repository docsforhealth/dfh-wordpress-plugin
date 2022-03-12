import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import _ from 'lodash';
import * as Constants from 'src/js/constants';
import AutoLabelAppender from 'src/js/editor/auto-label-appender';
import RecursiveWrapper, {
  V1RecursiveWrapper,
} from 'src/js/editor/recursive-wrapper';
import WithInnerBlockAttrs from 'src/js/editor/with-inner-block-attrs';
import WrapOnlyIfHasClass from 'src/js/editor/wrap-only-if-has-class';

/**
 * WordPress uses InnerBlocks to specify nested blocks within a parent block. Because each block
 * can only contain ONE InnerBlocks, this helper block allows for multiple distinct InnerBlocks areas
 * representing multiple dynamic areas within one parent block
 *
 * Sometimes, we want certain nested blocks to be wrapped in certain container/wrapper elements for layout
 * purposes. This helper block allows for specifying those wrapper elements and classes that should
 * be applied to each wrapper element so that we don't have to create special-purpose blocks for
 * each scenario where we need to wrap a block in wrapper elements.
 *
 * This block also surfaces functionality from InnerBlocks and extends this functionality by
 * providing the ability to hide the InnerBlocks content in the editor and force attributes of specific
 * nested elements to be have a specific value.
 *
 * NOTE: Setting any values on any `InnerBlock`s related block only sets INITIAL VALUES
 * If you want to pass down subsequent value updates, you need to use the `WithInnerBlockAttrs`
 * helper block directly. See https://github.com/WordPress/gutenberg/issues/15759
 */

const v1Attributes = {
  allowedBlocks: { type: 'array' },
  template: { type: 'array' },
  isLocked: { type: 'boolean', default: false },
  hideInEdit: { type: 'boolean', default: false },
  wrapperElements: { type: 'array', default: ['div'] },
  wrapperClassNames: { type: 'array', default: [''] },
  // force all children (including nested children) of specific type to have
  // certain attribute values, see `with-inner-block-attrs` block
  forceAttributes: { type: 'object' },
};

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_INNER_BLOCK_WRAPPER, {
  title: __('Inner Block Wrapper', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY_COMMON,
  icon: 'grid-view',
  description: __(
    'Enables wrapping other blocks in custom elements',
    Constants.TEXT_DOMAIN,
  ),
  supports: { inserter: false },
  attributes: _.omit(
    {
      ...v1Attributes,
      // An array of objects that specify how to wrap the children blocks
      // see `recursive-wrapper` block for content item shape
      wrapper: { type: 'array', default: [] },
      // Note that, by default, the specified wrapper is only rendered in the SAVE hook.
      // For ease of display, it is not rendered by default in the EDIT hook
      showWrapperInEdit: { type: 'boolean', default: false },
    },
    // Deleted elements
    ['wrapperElements', 'wrapperClassNames'],
  ),
  edit({ clientId, attributes }) {
    return (
      // Need to hide via CSS instead of not rendering at all to pass `InnerBlocks` properties
      <WrapOnlyIfHasClass
        className={attributes.hideInEdit ? 'dfh-editor-hide' : ''}
      >
        <RecursiveWrapper
          skip={!attributes.showWrapperInEdit}
          wrapper={attributes.wrapper}
        >
          <WithInnerBlockAttrs
            clientId={clientId}
            innerBlockAttrs={attributes.forceAttributes}
          >
            <InnerBlocks
              allowedBlocks={attributes.allowedBlocks}
              template={attributes.template}
              templateLock={
                attributes.isLocked
                  ? Constants.INNER_BLOCKS_LOCKED
                  : Constants.INNER_BLOCKS_UNLOCKED
              }
              renderAppender={AutoLabelAppender}
            />
          </WithInnerBlockAttrs>
        </RecursiveWrapper>
      </WrapOnlyIfHasClass>
    );
  },
  save({ attributes }) {
    return (
      <RecursiveWrapper wrapper={attributes.wrapper}>
        <InnerBlocks.Content />
      </RecursiveWrapper>
    );
  },
  // see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-deprecation/
  // [BUG] As of WP 5.8.3, the `isEligible` hook seems to be never called
  deprecated: [
    // 1. added `showWrapperInEdit`
    // 2. consolidated `wrapperElements` and `wrapperClassNames` into `wrapper`
    {
      attributes: v1Attributes,
      supports: { inserter: false },
      save({ attributes }) {
        return (
          <V1RecursiveWrapper
            elements={attributes.wrapperElements}
            classNames={attributes.wrapperClassNames}
          >
            <InnerBlocks.Content />
          </V1RecursiveWrapper>
        );
      },
      migrate(attributes, innerBlocks) {
        const newAttributes = {
          ...attributes,
          showWrapperInEdit: true, // in the past wrapper was always shown
          wrapper: [],
        };
        // build new `wrapper` attribute
        attributes.wrapperElements?.forEach((elementName, index) => {
          newAttributes.wrapper.push({
            tagName: elementName,
            classNames: [attributes.wrapperClassNames[index]],
          });
        });
        // remove outdated attributes
        delete newAttributes.wrapperElements;
        delete newAttributes.wrapperClassNames;
        // return new attributes
        return newAttributes;
      },
    },
  ],
});
