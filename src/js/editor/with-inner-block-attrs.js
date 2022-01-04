import { InnerBlocks } from '@wordpress/block-editor';
import { dispatch, useSelect } from '@wordpress/data';
import _ from 'lodash';
import PropTypes from 'prop-types';
import * as Constants from 'src/js/constants';
import { hasChildOfComponentType } from 'src/js/utils';

/**
 * PURPOSE OF THIS HELPER BLOCK
 *
 * This is the actual implementation of forcing specific attributes on each type of nested child block
 * to have a certain attribute. This is accomplished by passing in the attribute `innerBlockAttrs`
 * which is an object where each key is the registered name of the child block and each value is
 * another object where each key is the attribute name and each value is the desired value to force
 *
 * We need this block because setting attributes on `InnerBlock`s related blocks only happens during
 * the INITIAL RENDER. Subsequent value updates need to manually propagated from parent to children.
 *
 * The `innerBlockAttrs` property takes objects where
 *     Key = name of a registered WP block
 *     Value = Object of attribute names and attribute values to manually set or "force"
 *
 * This `innerBlockAttrs` property also supports a special key `INNER_BLOCKS_FORCE_ATTRS_ALL`. The
 * attribute name/values are then set on ALL child elements. Note that the attributes defined here
 * have a lower precedence than the block-specific maps. This means that if an attribute is defined
 * within the `INNER_BLOCKS_FORCE_ATTRS_ALL` object and also within a block-specific object, then
 * the block-specific value will be used instead of the `INNER_BLOCKS_FORCE_ATTRS_ALL` value
 */

// see https://github.com/WordPress/gutenberg/blob/master/packages/components/src/higher-order/with-focus-outside/index.js#L130-L135

export default function WithInnerBlockAttrs({
  clientId,
  innerBlockAttrs,
  children,
}) {
  // Don't need to try to override inner block attributes if none are specified
  if (!innerBlockAttrs) {
    return children;
  }
  // newer preferred style to use `useSelect` instead of `withSelect` HOC
  const foundBlocks = useSelect((select) =>
      select(Constants.STORE_BLOCK_EDITOR).getBlocksByClientId(clientId),
    ),
    updateHandler = _.debounce(
      () => updateInnerBlocks(foundBlocks, innerBlockAttrs),
      500,
    );
  // ensure attributes are applied on initial render even if this block does not receive focus
  updateHandler();
  // check that one top-level child is an `InnerBlocks`
  if (!hasChildOfComponentType(children, InnerBlocks)) {
    throw new Error(
      '`WithInnerBlockAttrs` requires one top-level child to be an `InnerBlocks` component',
    );
  }
  return (
    <div onFocus={updateHandler} onBlur={updateHandler}>
      {children}
    </div>
  );
}
WithInnerBlockAttrs.propTypes = {
  clientId: PropTypes.string.isRequired,
  innerBlockAttrs: PropTypes.object,
};

function updateInnerBlocks(blocks, blockForceAttrs) {
  // TIP: if wanted to iterate over `blockForceAttrs`, NOTE that plain objects NOT iterable by default,
  // need to convert using `Object.entries`, see https://stackoverflow.com/a/29891072
  if (blocks?.length && blockForceAttrs) {
    const forceAttrsForAllBlocks =
      blockForceAttrs[Constants.INNER_BLOCKS_FORCE_ATTRS_ALL];
    blocks.forEach((block) => {
      const forceAttrsForThisBlock = blockForceAttrs[block.name];
      if (forceAttrsForAllBlocks || forceAttrsForThisBlock) {
        // see https://github.com/WordPress/gutenberg/issues/15759#issuecomment-497359154
        dispatch(Constants.STORE_BLOCK_EDITOR).updateBlockAttributes(
          block.clientId,
          {
            ...forceAttrsForAllBlocks,
            // Block-specific forced attrs OVERRIDE force all attributes
            ...forceAttrsForThisBlock,
          },
        );
      }
      if (block.innerBlocks?.length) {
        updateInnerBlocks(block.innerBlocks, blockForceAttrs);
      }
    });
  }
}
