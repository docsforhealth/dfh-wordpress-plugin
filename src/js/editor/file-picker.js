import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';

import * as Constants from '../constants';

export default function FilePicker({ onChange, url, title }) {
  const fallbackTitle = __('None', Constants.TEXT_DOMAIN);
  return (
    <MediaUploadCheck>
      <div className="dfh-editor-link-picker">
        <div className="dfh-editor-link-picker__label text text--small text--light">
          <span className="text--bold">Target</span>:
          <span className="dfh-editor-link-picker__title">
            {title || fallbackTitle}
          </span>
        </div>
        <MediaUpload
          onSelect={onChange}
          value={url}
          render={({ open }) => (
            <Button className="link dfh-editor-link-picker__control" onClick={open}>
              {__('Select file', Constants.TEXT_DOMAIN)}
            </Button>
          )}
        />
      </div>
    </MediaUploadCheck>
  );
}
FilePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  url: PropTypes.string,
  title: PropTypes.string,
};
