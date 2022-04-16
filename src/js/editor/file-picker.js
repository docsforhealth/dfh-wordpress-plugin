import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import _ from 'lodash';
import PropTypes from 'prop-types';
import * as Constants from 'src/js/constants';

export default function FilePicker({ onChange, url, title, label }) {
  const fallbackTitle = __('None', Constants.TEXT_DOMAIN),
    fallbackLabel = __('Target', Constants.TEXT_DOMAIN),
    [inputId] = useState(_.uniqueId());
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
      <MediaUploadCheck>
        <MediaUpload
          onSelect={onChange}
          value={url}
          render={({ open }) => (
            <Button
              className="link dfh-editor-link-picker__control"
              onClick={open}
            >
              {__('Select file', Constants.TEXT_DOMAIN)}
            </Button>
          )}
        />
      </MediaUploadCheck>
    </div>
  );
}
FilePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  url: PropTypes.string,
  title: PropTypes.string,
  label: PropTypes.string,
};
