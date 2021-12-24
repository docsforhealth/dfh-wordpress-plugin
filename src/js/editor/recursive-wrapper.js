import { Fragment } from '@wordpress/element';
import PropTypes from 'prop-types';

/**
 * PURPOSE OF THIS HELPER BLOCK
 *
 * Wraps children in layers of `elements` with each layer having a class name tht corresponds
 * to the same index position in the corresponding `classNames` array.
 *
 * If both the `elements` and `classNames` arrays are specified, they must be of the exact same
 * length or else this component will throw an error
 */

export default function RecursiveWrapper({
  skip,
  elements,
  classNames,
  children,
}) {
  if (elements.length !== classNames.length) {
    throw new Error(
      'Wrapper elements and wrapper class names must be arrays of the same length',
    );
  }
  if (elements.length === 0 || skip) {
    return children;
  } else {
    const Wrapper = elements[0] ? elements[0] : Fragment;
    return (
      <Wrapper className={classNames[0]}>
        <RecursiveWrapper
          elements={elements.slice(1)}
          classNames={classNames.slice(1)}
        >
          {children}
        </RecursiveWrapper>
      </Wrapper>
    );
  }
}
RecursiveWrapper.propTypes = {
  skip: PropTypes.bool,
  elements: PropTypes.arrayOf(PropTypes.string).isRequired,
  classNames: PropTypes.arrayOf(PropTypes.string).isRequired,
};
