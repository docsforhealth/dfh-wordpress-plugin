import _ from 'lodash';
import { Children } from 'react';
import { select, dispatch } from '@wordpress/data';

import * as Constants from './constants';

const STORE_BLOCK_EDITOR = 'core/block-editor';

export function handleForceAllAttrs(allowedBlockNames, forceAttrsObj) {
  if (
    !forceAttrsObj ||
    !forceAttrsObj[Constants.INNER_BLOCKS_FORCE_ATTRS_ALL]
  ) {
    return forceAttrsObj;
  }
  const allAttrs = forceAttrsObj[Constants.INNER_BLOCKS_FORCE_ATTRS_ALL],
    newAttrsObj = {};
  allowedBlockNames.forEach(blockName => {
    newAttrsObj[blockName] = _.assign({}, allAttrs, forceAttrsObj[blockName]);
  });
  return newAttrsObj;
}

export function hasChildOfComponentType(children, type) {
  return Children.toArray(children).some(child => child.type === type);
}

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
