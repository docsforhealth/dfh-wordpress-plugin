import { InnerBlocks } from '@wordpress/block-editor';
import { dispatch, useSelect } from '@wordpress/data';
import _ from 'lodash';
import PropTypes from 'prop-types';
import * as Constants from 'src/js/constants';
import { handleForceAllAttrs, hasChildOfComponentType } from 'src/js/utils';

/**
 * PURPOSE OF THIS HELPER BLOCK
 *
 * This is the actual implementation of forcing specific attributes on each type of nested child block
 * to have a certain attribute. This is accomplished by passing in the attribute `innerBlockAttrs`
 * which is an object where each key is the registered name of the child block and each value is
 * another object where each key is the attribute name and each value is the desired value to force
 *
 * When using this helper block, you can also use the `handleForceAllAttrs` utility function which
 * filters the keys to only preserve the specified allowed blocks and support specifying attribute
 * name/values that should be forced upon all allowed blocks via `INNER_BLOCKS_FORCE_ATTRS_ALL`
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
  );
  // if `INNER_BLOCKS_FORCE_ATTRS_ALL` is present, `handleForceAllAttrs` copies to attributes
  // defined in this special key to the attrs of all other block keys in this attr object
  const newInnerBlockAttrs = handleForceAllAttrs(innerBlockAttrs);
  // Only try to update inner blocks if `innerBlockAttrs` is specified
  const updateHandler = _.debounce(
    () => updateInnerBlocks(foundBlocks, newInnerBlockAttrs),
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
  // if wanted to iterate over `blockForceAttrs`, NOTE that plain objects NOT iterable by default,
  // need to convert using `Object.entries`, see https://stackoverflow.com/a/29891072
  if (blocks.length && blockForceAttrs) {
    blocks.forEach((block) => {
      const forceAttrs = blockForceAttrs[block.name];
      if (forceAttrs) {
        // see https://github.com/WordPress/gutenberg/issues/15759#issuecomment-497359154
        dispatch(Constants.STORE_BLOCK_EDITOR).updateBlockAttributes(
          block.clientId,
          forceAttrs,
        );
      }
      if (block.innerBlocks?.length) {
        updateInnerBlocks(block.innerBlocks, blockForceAttrs);
      }
    });
  }
}
