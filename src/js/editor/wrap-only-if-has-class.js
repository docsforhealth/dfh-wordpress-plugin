import PropTypes from 'prop-types';

/**
 * If a class name is specified, then wraps children with a `div` with
 * the specified class name.
 *
 * if no class name is specified, then simply returns the children unchanged
 */

export default function WrapOnlyIfHasClass({ className, children }) {
  return className ? (
    <div className={className}>{children}</div>
  ) : (
    <>{children}</>
  );
}
WrapOnlyIfHasClass.propTypes = {
  className: PropTypes.string,
};
