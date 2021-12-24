import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import * as Constants from 'src/js/constants';
import RecursiveWrapper from 'src/js/editor/recursive-wrapper';
import WithInnerBlockAttrs from 'src/js/editor/with-inner-block-attrs';
import WrapOnlyIfHasClass from 'src/js/editor/wrap-only-if-has-class';
import { withPropTypes } from 'src/js/utils';

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
    skipWrapperInEdit: { type: 'boolean', default: true },
    wrapperElements: { type: 'array', default: [] },
    wrapperClassNames: { type: 'array', default: [] },
    forceAttributes: { type: 'object' },
  },
  edit: withPropTypes(
    {
      allowedBlocks: PropTypes.arrayOf(PropTypes.string),
      template: PropTypes.arrayOf(PropTypes.array),
      isLocked: PropTypes.bool,
      hideInEdit: PropTypes.bool,
      skipWrapperInEdit: PropTypes.bool,
      wrapperElements: PropTypes.arrayOf(PropTypes.string),
      wrapperClassNames: PropTypes.arrayOf(PropTypes.string),
      forceAttributes: PropTypes.objectOf(PropTypes.object),
    },
    ({ clientId, attributes }) => {
      return (
        <WrapOnlyIfHasClass
          className={attributes.hideInEdit ? 'dfh-editor-hide' : ''}
        >
          <RecursiveWrapper
            skip={attributes.skipWrapperInEdit}
            elements={attributes.wrapperElements}
            classNames={attributes.wrapperClassNames}
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
  ),
  save({ attributes }) {
    return (
      <RecursiveWrapper
        elements={attributes.wrapperElements}
        classNames={attributes.wrapperClassNames}
      >
        <InnerBlocks.Content />
      </RecursiveWrapper>
    );
  },
});
