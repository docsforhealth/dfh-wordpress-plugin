import _ from 'lodash';
import { InnerBlocks } from '@wordpress/block-editor';

import * as Constants from '../constants';
import { setAttributesOnInnerBlocks, hasChildOfComponentType } from '../utils';

// see https://github.com/WordPress/gutenberg/blob/master/packages/components/src/higher-order/with-focus-outside/index.js#L130-L135

export default function WithInnerBlockAttrs({
  clientId,
  innerBlockAttrs,
  children,
}) {
  const updateHandler = () => updateInnerBlocks(clientId, innerBlockAttrs);
  // ensure that attributes are applied on initial render even if this block does not
  // receive focus. `setTimeout` to ensure that these attributes will be set last
  setTimeout(updateHandler);
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

function updateInnerBlocks(clientId, innerBlockAttrs) {
  if (innerBlockAttrs) {
    _.forEach(innerBlockAttrs, (attrs, blockName) => {
      setAttributesOnInnerBlocks(
        clientId,
        attrs,
        block => block.name === blockName,
      );
    });
  }
}
