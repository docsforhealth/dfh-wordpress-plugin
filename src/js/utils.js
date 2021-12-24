import { Children, Component } from '@wordpress/element';
import _ from 'lodash';
import PropTypes from 'prop-types';
import * as Constants from 'src/js/constants';
import getThumbnail from 'thumbnail-youtube-vimeo';

/**
 * Helper function for the `innerBlockAttrs` attribute of the `WithInnerBlockAttrs` helper block,
 * which expects an object of nested objects that is used to force all specific attributes of
 * nested blocks of a certain type to have a specific value. Main purpose of this function is to
 * copy attributes specified in the special key `INNER_BLOCKS_FORCE_ATTRS_ALL` to all blocks.
 *
 * @param  {Object} forceAttrsObj     Object of registered block name to nested attribute key/name objects.
 *                                    This object can contain a special key `INNER_BLOCKS_FORCE_ATTRS_ALL`
 *                                    which maps onto a nested object of attribute names/values
 *                                    that you want to be copied to all block names. This allows for
 *                                    specifying attributes to force without having to manually
 *                                    repeat the specification for all blocks in the object.
 * @return {Object}                   Object with the same structure as the original passed-in `forceAttrsObj`
 *                                    with `INNER_BLOCKS_FORCE_ATTRS_ALL` copied over
 */
export function handleForceAllAttrs(forceAttrsObj) {
  // if no `forceAttrsObj` is specific OR no special apply-all key `INNER_BLOCKS_FORCE_ATTRS_ALL`
  // is specified, then we do not need to any processing in this function and can just return
  if (
    !forceAttrsObj ||
    !forceAttrsObj[Constants.INNER_BLOCKS_FORCE_ATTRS_ALL]
  ) {
    return forceAttrsObj;
  }
  const allAttrs = forceAttrsObj[Constants.INNER_BLOCKS_FORCE_ATTRS_ALL],
    newAttrsObj = {};
  // recreate the attrs object by `INNER_BLOCKS_FORCE_ATTRS_ALL` to all other keys then excluding
  // the INNER_BLOCKS_FORCE_ATTRS_ALL key
  Object.keys(forceAttrsObj).forEach((blockName) => {
    if (blockName !== Constants.INNER_BLOCKS_FORCE_ATTRS_ALL) {
      newAttrsObj[blockName] = _.assign({}, allAttrs, forceAttrsObj[blockName]);
    }
  });
  return newAttrsObj;
}

export function hasChildOfComponentType(children, type) {
  return Children.toArray(children).some((child) => child.type === type);
}

// NOTE only YouTube and Vimeo urls are supported
// see https://github.com/De-Luxis/thumbnail-youtube-vimeo#readme
export const fetchVideoThumbnail = _.memoize(function (videoUrl) {
  // `ytimg` to get 16:9 aspect ratio to avoid bars on top and bottom of image
  // see https://stackoverflow.com/a/18978874
  return getThumbnail(videoUrl, { ytimg: 'mqdefault' });
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

/**
 * Ensures that the passed in `template` only includes blocks specified in `allowedBlockNames`
 *
 * Current implementation only filters for the top-level of the passed-in template
 *
 * @param  {Array} allowedBlockNames Block names to allow
 * @param  {Array} template          InnerBlocks template
 * @return {Array}                   InnerBlocks template where the top-level only contains blocks
 *                                   specified in the `allowedBlockNames` array
 */
export function filterInnerBlockTemplate(allowedBlockNames, template) {
  return _.filter(template, (spec) => allowedBlockNames.includes(spec[0]));
}

/**
 * Adds a unique id attribute of the specific name to the passed in WP Gutenberg block definition
 * Note that we use a React class component in order to access lifecycle hooks as we are unable to
 * use the hooks-based approach of functional component as the stored value would not be stable
 * across browser reloads.
 *
 * One caveat of using a React class component is that the block definition MUST be API version 1.
 * This is because API version 2 requires the `edit` and `save` hooks to call the `useBlockProps` hook
 * and hooks are, by definition, not supported in class components.
 * See https://wordpress.stackexchange.com/q/398626
 *
 * @param  {String} idAttrName Name of the unique id attribute to add
 * @param  {Object} blockInfo  Original object passed into the `registerBlockType` function
 * @return {Object}            New object with new unique id attribute
 */
export function addUniqueIdInApiVersionOne(idAttrName, blockInfo) {
  if (!_.isObject(blockInfo)) {
    return blockInfo;
  }
  const newBlockInfo = {
    ...blockInfo,
    attributes: {
      ...blockInfo.attributes,
      // store unique id that is stable across browser reloads
      [idAttrName]: { type: 'string' },
    },
  };
  // force to be apiVersion 1 to allow for using class based Component in `edit` hook
  // as the new `useBlockprops` hook required in apiVersion 2 cannot be called in class-based components
  delete newBlockInfo.apiVersion;
  // set the unique ID attribute in a lifecycle hook to avoid triggering a React hook violation error
  // pass the `props` object to the existing `edit` hook to emulate default WP behavior
  // see https://dev.to/martinkr/create-a-wordpress-s-gutenberg-block-with-all-react-lifecycle-methods-in-5-minutes-213p
  newBlockInfo.edit = class extends Component {
    // use the `constructor` instead of `componentDidMount` in order to ensure that the uniqueId is
    // available even on the initial rendering of the component
    constructor(props) {
      const { clientId, attributes, setAttributes } = props;
      // `useRef` (https://stackoverflow.com/a/70039497) in a functional component does NOT work
      // because this value will not be stable across browser window reloads which will cause the
      // HTML string returned in the `save` hook to be falsely invalidated
      if (!attributes[idAttrName]) {
        // ANTI-PATTERN in React to modify instead of replace, but we need to make sure that the
        // unique ID is always accessible and not initially undefined before being set. This is because
        // if we're using `InnerBlocks` then the unique ID will always show up as undefined because
        // the InnerBlocks will not update with the new unique ID.
        props.attributes[idAttrName] = clientId;
        // Also call setAttributes to trigger a reload of the component to actually persist the
        // unique ID value so that it will remain consistent on future loads
        setAttributes({ [idAttrName]: clientId });
      }
      // call super AFTER we've modified the props as above
      super(props);
    }
    render() {
      return _.isFunction(blockInfo.edit)
        ? blockInfo.edit?.call(undefined, this.props)
        : null;
    }
  };
  return newBlockInfo;
}
