import PropTypes from 'prop-types';
import { Fragment } from '@wordpress/element';

export default function RecursiveWrapper({ elements, classNames, children }) {
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
  elements: PropTypes.arrayOf(PropTypes.string).isRequired,
  classNames: PropTypes.arrayOf(PropTypes.string).isRequired,
};
