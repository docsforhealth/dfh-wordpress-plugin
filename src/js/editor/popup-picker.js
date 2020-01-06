import 'lity';
import _ from 'lodash';
import PropTypes from 'prop-types';

import LinkPicker from './link-picker';

export default function PopupPicker({ target, onChange, label }) {
  return (
    <LinkPicker
      url={target}
      title={target}
      label={label}
      onChange={({ url }) =>
        _.isFunction(onChange) && onChange({ target: url })
      }
    />
  );
}
PopupPicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  target: PropTypes.string,
};

PopupPicker.Content = function({ className = '', target, children }) {
  return (
    <a href={target} className={className} data-lity>
      {children}
    </a>
  );
};
PopupPicker.Content.propTypes = {
  className: PropTypes.string,
  target: PropTypes.string,
  label: PropTypes.string,
};
