import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';

import * as Constants from '../constants';

export default function FilePicker({ onChange, url, title }) {
  const fallbackTitle = __('None', Constants.TEXT_DOMAIN);
  return (
    <MediaUploadCheck>
      <div className="editor-link-picker">
        <div className="editor-link-picker__label text text--small text--light">
          <span className="text--bold">Target</span>:
          <span className="editor-link-picker__title">
            {title || fallbackTitle}
          </span>
        </div>
        <MediaUpload
          onSelect={onChange}
          value={url}
          render={({ open }) => (
            <Button className="link editor-link-picker__control" onClick={open}>
              {__('Select file', Constants.TEXT_DOMAIN)}
            </Button>
          )}
        />
      </div>
    </MediaUploadCheck>
  );
}
