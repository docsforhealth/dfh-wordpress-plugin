import { __ } from '@wordpress/i18n';
import { Button, Placeholder } from '@wordpress/components';
import { Fragment } from 'react';
import { MediaUpload } from '@wordpress/block-editor';

import * as Constants from '../constants';

export default function ImagePicker({
  onSelect,
  url,
  description,
  previewClassName = '',
}) {
  return (
    <div className="editor-image-picker">
      {buildImagePreview(url, description, previewClassName)}
      <div className="editor-image-picker__control">
        <MediaUpload
          onSelect={onSelect}
          type="image"
          value={url}
          render={({ open }) => (
            <Button
              className="button button--outline button--small"
              onClick={open}
            >
              {__('Select image', Constants.TEXT_DOMAIN)}
            </Button>
          )}
        />
      </div>
    </div>
  );
}

function buildImagePreview(src, alt, className) {
  return src ? (
    <img className={className} src={src} alt={alt} />
  ) : (
    <Placeholder icon="format-image" label="No image selected" />
  );
}
