import PropTypes from 'prop-types';
import { dispatch, withSelect } from '@wordpress/data';
import { InnerBlocks } from '@wordpress/block-editor';

import * as Constants from '../constants';
import { hasChildOfComponentType } from '../utils';

// see https://github.com/WordPress/gutenberg/blob/master/packages/components/src/higher-order/with-focus-outside/index.js#L130-L135

export default withSelect((select, { clientId }) => {
  return {
    foundBlocks: select(Constants.STORE_BLOCK_EDITOR).getBlocksByClientId(
      clientId,
    ),
  };
})(WithInnerBlockAttrs);

function WithInnerBlockAttrs({ foundBlocks, innerBlockAttrs, children }) {
  const updateHandler = () => updateInnerBlocks(foundBlocks, innerBlockAttrs);
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
  foundBlocks: PropTypes.array.isRequired,
  innerBlockAttrs: PropTypes.object,
};

function updateInnerBlocks(foundBlocks, innerBlockAttrs) {
  if (foundBlocks && foundBlocks[0] && innerBlockAttrs) {
    // plain objects not iterable by default, need to convert using `Object.entries`
    // see https://stackoverflow.com/a/29891072
    for (const [blockName, attrs] of Object.entries(innerBlockAttrs)) {
      // from https://github.com/WordPress/gutenberg/issues/15759#issuecomment-497359154
      foundBlocks[0].innerBlocks.forEach(block => {
        if (block.name === blockName) {
          dispatch(Constants.STORE_BLOCK_EDITOR).updateBlockAttributes(
            block.clientId,
            attrs,
          );
        }
      });
    }
  }
}
