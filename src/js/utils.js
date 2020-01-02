import _ from 'lodash';
import { select, dispatch } from '@wordpress/data';

const STORE_BLOCK_EDITOR = 'core/block-editor';

// from https://github.com/WordPress/gutenberg/issues/15759#issuecomment-497359154
export function setAttributesOnInnerBlocks(
  clientId,
  newAttributes,
  filterFn = null,
) {
  const thisBlock = select(STORE_BLOCK_EDITOR).getBlocksByClientId(clientId);
  if (thisBlock) {
    thisBlock[0].innerBlocks.forEach(block => {
      if (!_.isFunction(filterFn) || filterFn(block)) {
        dispatch(STORE_BLOCK_EDITOR).updateBlockAttributes(
          block.clientId,
          newAttributes,
        );
      }
    });
  }
}
