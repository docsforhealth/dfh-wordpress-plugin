import PropTypes from 'prop-types';

/**
 * Wraps children in layers of `elements` with each layer having a class name tht corresponds
 * to the same index position in the corresponding `classNames` array.
 *
 * If both the `elements` and `classNames` arrays are specified, they must be of the exact same
 * length or else this component will throw an error
 */

export default function RecursiveWrapper({ skip, wrapper, children }) {
  if (skip || wrapper.length === 0) {
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
