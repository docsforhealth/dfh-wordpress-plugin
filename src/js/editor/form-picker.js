import _ from 'lodash';
import { __ } from '@wordpress/i18n';
import { Fragment } from 'react';
import { PlainText } from '@wordpress/block-editor';

import * as Constants from '../constants';

export default function FormPicker({ value, onChange }) {
  const inputId = _.uniqueId();
  return (
    <div class="components-placeholder">
      <label for={inputId} class="components-placeholder__label">
        {__('Contact Form 7 ID', Constants.TEXT_DOMAIN)}
      </label>
      <span className="components-placeholder__instructions">
        {__(
          'Find the ID of the form you wish to display from the Contact page of the admin dashboard',
          Constants.TEXT_DOMAIN,
        )}
      </span>
      <PlainText
        id={inputId}
        className="editor-plain-text block-editor-plain-text input-control"
        placeholder={__(
          'Enter the form ID for the Contact Form 7 form',
          Constants.TEXT_DOMAIN,
        )}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

FormPicker.Content = function({ value, className = '' }) {
  return (
    <Fragment>
      {value &&
        `[contact-form-7 id="${value}" html_class="form ${className}" ]`}
    </Fragment>
  );
};
