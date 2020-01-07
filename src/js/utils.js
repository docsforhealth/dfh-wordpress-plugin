import _ from 'lodash';
import apiFetch from '@wordpress/api-fetch';
import PropTypes from 'prop-types';
import { Children } from 'react';

import * as Constants from './constants';

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

export function filterInnerBlockTemplate(allowedBlockNames, template) {
  return _.filter(template, spec => allowedBlockNames.includes(spec[0]));
}
