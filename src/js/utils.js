import _ from 'lodash';
import apiFetch from '@wordpress/api-fetch';
import getThumbnail from 'thumbnail-youtube-vimeo';
import PropTypes from 'prop-types';
import { Children } from 'react';
import { withDispatch } from '@wordpress/data';

import * as Constants from './constants';

export function handleForceAllAttrs(forceAttrsObj, allowedBlockNames = null) {
  if (
    !forceAttrsObj ||
    !forceAttrsObj[Constants.INNER_BLOCKS_FORCE_ATTRS_ALL]
  ) {
    return forceAttrsObj;
  }
  const allAttrs = forceAttrsObj[Constants.INNER_BLOCKS_FORCE_ATTRS_ALL],
    newAttrsObj = {};
  // If not `allowedBlockNames` are specified, then we just copy all attribute in the force all
  // object to the keys that are currently in the object
  (allowedBlockNames || Object.keys(forceAttrsObj)).forEach(blockName => {
    if (blockName !== Constants.INNER_BLOCKS_FORCE_ATTRS_ALL) {
      newAttrsObj[blockName] = _.assign({}, allAttrs, forceAttrsObj[blockName]);
    }
  });
  return newAttrsObj;
}

export function hasChildOfComponentType(children, type) {
  return Children.toArray(children).some(child => child.type === type);
}

// NOTE only YouTube and Vimeo urls are supported
// see https://github.com/De-Luxis/thumbnail-youtube-vimeo#readme
export const fetchVideoThumbnail = _.memoize(function(videoUrl) {
  // `ytimg` to get 16:9 aspect ratio to avoid bars on top and bottom of image
  // see https://stackoverflow.com/a/18978874
  return getThumbnail(videoUrl, { ytimg: 'mqdefault' });
});

// Need to write this because `getEntity` in `core-data` uses the `view` context which does not
// include labels. See https://developer.wordpress.org/rest-api/reference/taxonomies/#schema
export const fetchTaxonomyDetails = _.memoize(function(taxonomyId) {
  return apiFetch({ path: `wp/v2/taxonomies/${taxonomyId}?context=edit` });
});

// Note that `SCRIPT_DEBUG` in `wp-config.php` needs to be set to `true` in order for
// non-production script assets to be loaded. PropType checks only happen in React development builds
// see https://wordpress.org/support/article/debugging-in-wordpress/#script_debug
export function withPropTypes(propTypes, wpComponent) {
  wpComponent.propTypes = {
    attributes: PropTypes.shape(propTypes),
  };
  return wpComponent;
}

// [FUTURE] This hack forces the template to appear valid when locking template containing InnerBlocks
// See https://github.com/WordPress/gutenberg/issues/11681
export function withValidTemplate(component) {
  return withDispatch(dispatch => {
    // set a timeout because block editor sometimes takes longer to load when creating new entity
    setTimeout(() =>
      dispatch(Constants.STORE_BLOCK_EDITOR).setTemplateValidity(true),
    );
  })(component);
}

export function filterInnerBlockTemplate(allowedBlockNames, template) {
  return _.filter(template, spec => allowedBlockNames.includes(spec[0]));
}
