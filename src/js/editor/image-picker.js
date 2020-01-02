import { __ } from '@wordpress/i18n';
import { Button, Placeholder } from '@wordpress/components';
import { Fragment } from 'react';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';

import * as Constants from '../constants';

const ALLOWED_MEDIA_TYPES = ['image'];

export default function ImagePicker({
  onSelect,
  url,
  description,
  previewClassName = '',
}) {
  return (
    <div className="editor-image-picker">
      {buildImagePreview(url, description, previewClassName)}
      <MediaUploadCheck>
        <div className="editor-image-picker__control">
          <MediaUpload
            onSelect={onSelect}
            allowedTypes={ALLOWED_MEDIA_TYPES}
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
      </MediaUploadCheck>
    </div>
  );
}

ImagePicker.Content = function({ url, description, className = '' }) {
  return <img className={className} src={url} alt={description} />;
};

function buildImagePreview(src, alt, className) {
  return src ? (
    <img className={className} src={src} alt={alt} />
  ) : (
    <Placeholder icon="format-image" label="No image selected" />
  );
}
