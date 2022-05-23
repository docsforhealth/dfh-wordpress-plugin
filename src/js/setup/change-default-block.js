import { dispatch } from '@wordpress/data';
import domReady from '@wordpress/dom-ready';
import * as Constants from 'src/js/constants';

/**
 * Sets the default block to be `dfh/text` instead of `core/paragraph`
 */

// 1. Need to wrap in `domReady` call to help with timing issues so that the call to set paragraph as
// the default does not override this code, see https://github.com/WordPress/gutenberg/issues/15730#issuecomment-617853036
// 2. `domReady` has some yet-unresolved timing issues
// see https://github.com/WordPress/gutenberg/issues/25330
domReady(function () {
  // Unfortunately, not always reliably overriding the default so need to add a `setTimeout` to defer
  // to the next event loop cycle, see https://eager.io/blog/how-to-decide-when-your-code-should-run/
  setTimeout(function () {
    // instead of using the `setDefaultBlockName` helper method from `@wordpress/blocks` we directly
    // dispatch to the blocks store, which is what the helper does
    // see https://developer.wordpress.org/block-editor/packages/packages-blocks/#setDefaultBlockName
    // source: https://github.com/WordPress/gutenberg/blob/trunk/packages/blocks/src/api/registration.js
    dispatch(Constants.STORE_BLOCKS).setDefaultBlockName(Constants.BLOCK_TEXT);
  });
});
