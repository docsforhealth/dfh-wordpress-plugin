import PropTypes from 'prop-types';
import { Fragment } from '@wordpress/element';

export default function WrapOnlyIfHasClass({ className, children }) {
  return className ? (
    <div className={className}>{children}</div>
  ) : (
    <Fragment>{children}</Fragment>
  );
}
WrapOnlyIfHasClass.propTypes = {
  className: PropTypes.string,
};
