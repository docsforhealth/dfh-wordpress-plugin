import { Children, Component } from '@wordpress/element';
import _ from 'lodash';
import * as Constants from 'src/js/constants';
import getThumbnail from 'thumbnail-youtube-vimeo';

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
      // if `edit` property is function, then might be a function OR a class React component
      if (_.isFunction(blockInfo.edit)) {
        // TIP: if you want to distinguish between React functional vs class components,
        // you can use `!!blockInfo.edit.prototype?.isReactComponent` for React class components
        // see https://overreacted.io/how-does-react-tell-a-class-from-a-function/
        const EditComponent = blockInfo.edit;
        return <EditComponent {...this.props} />;
      } else {
        return null;
      }
    }
  };
  return newBlockInfo;
}
