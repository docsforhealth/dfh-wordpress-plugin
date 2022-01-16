import PropTypes from 'prop-types';

/**
 * Wraps children in layers of `elements` with each layer having a class name tht corresponds
 * to the same index position in the corresponding `classNames` array.
 *
 * If both the `elements` and `classNames` arrays are specified, they must be of the exact same
 * length or else this component will throw an error
 */

export default function RecursiveWrapper({ skip, wrapper, children }) {
  if (skip || !wrapper || wrapper.length === 0) {
    return children;
  } else {
    const WrapperElement = wrapper[0]?.tagName ?? 'div';
    return (
      <WrapperElement className={wrapper[0]?.classNames?.join(' ')}>
        <RecursiveWrapper wrapper={wrapper.slice(1)}>
          {children}
        </RecursiveWrapper>
      </WrapperElement>
    );
  }
}
RecursiveWrapper.propTypes = {
  skip: PropTypes.bool,
  wrapper: PropTypes.arrayOf(
    PropTypes.shape({
      tagName: PropTypes.string, // defaults to 'div' if not given
      classNames: PropTypes.arrayOf(PropTypes.string),
    }),
  ),
};

/**
 * DEPRECATED
 *
 * This deprecated version is preserved solely for enabling the block migration in `inner-block-wrapper`
 *
 * See https://developer.wordpress.org/block-editor/reference-guides/block-api/block-deprecation/
 */

export function V1RecursiveWrapper({ elements, classNames, children }) {
  if (elements.length !== classNames.length) {
    throw new Error(
      'Wrapper elements and wrapper class names must be arrays of the same length',
    );
  }
  if (elements.length === 0) {
    return children;
  } else {
    const Wrapper = elements[0] ? elements[0] : Fragment;
    return (
      <Wrapper className={classNames[0]}>
        <V1RecursiveWrapper
          elements={elements.slice(1)}
          classNames={classNames.slice(1)}
        >
          {children}
        </V1RecursiveWrapper>
      </Wrapper>
    );
  }
}
V1RecursiveWrapper.propTypes = {
  elements: PropTypes.arrayOf(PropTypes.string).isRequired,
  classNames: PropTypes.arrayOf(PropTypes.string).isRequired,
};
