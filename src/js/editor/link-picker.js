import _ from 'lodash';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { URLInputButton } from '@wordpress/block-editor';

import * as Constants from '../constants';

export default function LinkPicker({ onChange, url, title, label }) {
  const fallbackTitle = __('None', Constants.TEXT_DOMAIN),
    fallbackLabel = __('Target', Constants.TEXT_DOMAIN),
    inputId = _.uniqueId();
  return (
    <div className="dfh-editor-link-picker">
      <div className="dfh-editor-link-picker__title-container text text--small text--light">
        <label className="dfh-editor-link-picker__label" htmlFor={inputId}>
          {label || fallbackLabel}
        </label>
        <span className="dfh-editor-link-picker__title">
          {title || fallbackTitle}
        </span>
      </div>
      <div className="dfh-editor-link-picker__control">
        <URLInputButton
          id={inputId}
          url={url}
          onChange={(url, result) =>
            onChange({
              url,
              title: result ? result.title : url ? url : fallbackTitle,
            })
          }
        />
      </div>
    </div>
  );
}
LinkPicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  url: PropTypes.string,
  title: PropTypes.string,
  label: PropTypes.string,
};
