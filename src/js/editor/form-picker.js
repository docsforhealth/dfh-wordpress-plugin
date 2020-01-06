import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { TextControl } from '@wordpress/components';

import * as Constants from '../constants';

export default function FormPicker({ value, onChange }) {
  return (
    <TextControl
      label={__('Contact Form 7 ID', Constants.TEXT_DOMAIN)}
      help={__(
        'Find the ID of the form you wish to display from the Contact page of the admin dashboard',
        Constants.TEXT_DOMAIN,
      )}
      placeholder={__(
        'Enter the form ID for the Contact Form 7 form',
        Constants.TEXT_DOMAIN,
      )}
      value={value}
      onChange={onChange}
    />
  );
}
FormPicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

FormPicker.Content = function({ value, className = '' }) {
  return (
    <Fragment>
      {value &&
        `[contact-form-7 id="${value}" html_class="form ${className}" ]`}
    </Fragment>
  );
};
FormPicker.Content.propTypes = {
  value: PropTypes.string,
  className: PropTypes.string,
};
