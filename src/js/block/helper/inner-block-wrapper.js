import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import * as Constants from 'src/js/constants';
import RecursiveWrapper from 'src/js/editor/recursive-wrapper';
import WithInnerBlockAttrs from 'src/js/editor/with-inner-block-attrs';
import WrapOnlyIfHasClass from 'src/js/editor/wrap-only-if-has-class';

/**
 * PURPOSE OF THIS HELPER BLOCK
 *
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
  attributes: {
    allowedBlocks: { type: 'array' },
    template: { type: 'array' },
    isLocked: { type: 'boolean', default: false },
    hideInEdit: { type: 'boolean', default: false },
    showWrapperInEdit: { type: 'boolean', default: false },
    // An array of objects that specify how to wrap the children blocks
    // see `recursive-wrapper` block for content item shape
    wrapper: { type: 'array', default: [] },
    // force all children (including nested children) of specific type to have
    // certain attribute values, see `with-inner-block-attrs` block
    forceAttributes: { type: 'object' },
  },
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
});
