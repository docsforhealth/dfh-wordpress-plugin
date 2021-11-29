import { InnerBlocks } from '@wordpress/block-editor';
import { dispatch, withSelect } from '@wordpress/data';
import _ from 'lodash';
import PropTypes from 'prop-types';
import * as Constants from 'src/js/constants';
import { hasChildOfComponentType } from 'src/js/utils';

// see https://github.com/WordPress/gutenberg/blob/master/packages/components/src/higher-order/with-focus-outside/index.js#L130-L135

export default withSelect((select, { clientId }) => {
  return {
    foundBlocks: select(Constants.STORE_BLOCK_EDITOR).getBlocksByClientId(
      clientId,
    ),
  };
})(WithInnerBlockAttrs);

function WithInnerBlockAttrs({ foundBlocks, innerBlockAttrs, children }) {
  // Don't need to try to override inner block attributes if none are specified
  if (!innerBlockAttrs) {
    return children;
  }
  // Only try to update inner blocks if `innerBlockAttrs` is specified
  const updateHandler = _.debounce(
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

  // Provided by `withSelect`, not by user
  foundBlocks: PropTypes.array.isRequired,
};

function updateInnerBlocks(foundBlocks, innerBlockAttrs) {
  if (foundBlocks && foundBlocks[0] && innerBlockAttrs) {
    // plain objects not iterable by default, need to convert using `Object.entries`
    // see https://stackoverflow.com/a/29891072
    for (const [blockName, attrs] of Object.entries(innerBlockAttrs)) {
      // from https://github.com/WordPress/gutenberg/issues/15759#issuecomment-497359154
      foundBlocks[0].innerBlocks.forEach((block) => {
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
