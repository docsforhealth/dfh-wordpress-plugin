import 'lity';
import _ from 'lodash';

import LinkPicker from './link-picker';

export default function PopupPicker({ target, onChange }) {
  return (
    <LinkPicker
      url={target}
      title={target}
      onChange={({ url }) =>
        _.isFunction(onChange) && onChange({ target: url })
      }
    />
  );
}

PopupPicker.Content = function({ className = '', target, children }) {
  return (
    <a href={target} className={className} data-lity>
      {children}
    </a>
  );
};
