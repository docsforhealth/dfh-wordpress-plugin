import { Children, Component } from '@wordpress/element';
import _ from 'lodash';
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
 * The `edit` property of `blockInfo` can be one of the following:
 *   1. Functional React component
 *   2. Class-based React component
 *   3. Object of individual class-based React lifecycle methods.
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
    // For class lifecycle methods, see https://reactjs.org/docs/react-component.html
    // called on initial render, NOT subsequent renders
    componentDidMount() {
      if (
        !_.isFunction(blockInfo.edit) &&
        _.isObject(blockInfo.edit) &&
        _.isFunction(blockInfo.edit.componentDidMount)
      ) {
        blockInfo.edit.componentDidMount(this.props);
      }
    }
    // called on subsequent renders, NOT initial render
    // explanation of snapshot vs prevProps, see https://stackoverflow.com/q/64963205
    componentDidUpdate(prevProps, prevState, snapshot) {
      if (
        !_.isFunction(blockInfo.edit) &&
        _.isObject(blockInfo.edit) &&
        _.isFunction(blockInfo.edit.componentDidUpdate)
      ) {
        // note that we pass current props ahead of default arguments
        blockInfo.edit.componentDidUpdate(
          this.props,
          prevProps,
          prevState,
          snapshot,
        );
      }
    }
    render() {
      let EditComponent;
      // if `edit` property is function, then might be a function OR a class React component
      if (_.isFunction(blockInfo.edit)) {
        // TIP: if you want to distinguish between React functional vs class components,
        // you can use `!!blockInfo.edit.prototype?.isReactComponent` for React class components
        // see https://overreacted.io/how-does-react-tell-a-class-from-a-function/
        EditComponent = blockInfo.edit;
      } else if (
        _.isObject(blockInfo.edit) &&
        _.isFunction(blockInfo.edit.render)
      ) {
        EditComponent = blockInfo.edit.render;
      }
      // if has edit component then call and return
      // use JSX because it has built in handling for function vs class React components
      if (EditComponent) {
        return <EditComponent {...this.props} />;
      }
    }
  };
  return newBlockInfo;
}

export function syncAttrFromContextIfDefined(
  { context, attributes, setAttributes },
  contextKey,
  attrKey,
) {
  if (!_.isString(contextKey) || !_.isString(attrKey)) {
    return;
  }
  if (
    _.isObject(context) &&
    !_.isEmpty(context) &&
    context.hasOwnProperty(contextKey)
  ) {
    if (context[contextKey] !== attributes[attrKey]) {
      setAttributes({ [attrKey]: context[contextKey] });
    }
  }
}
