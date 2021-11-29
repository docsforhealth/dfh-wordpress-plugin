import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button, Placeholder } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import * as Constants from 'src/js/constants';

const ALLOWED_MEDIA_TYPES = ['image'];

export default function ImagePicker({
  onSelect,
  url,
  description,
  label,
  previewClassName = '',
}) {
  return (
    <div className="dfh-editor-image-picker">
      {buildImagePreview(url, description, previewClassName)}
      <MediaUploadCheck>
        <div className="dfh-editor-image-picker__control">
          <MediaUpload
            onSelect={onSelect}
            allowedTypes={ALLOWED_MEDIA_TYPES}
            value={url}
            render={({ open }) => (
              <Button
                className="button button--secondary button--small"
                onClick={open}
              >
                {label || __('Select image', Constants.TEXT_DOMAIN)}
              </Button>
            )}
          />
        </div>
      </MediaUploadCheck>
    </div>
  );
}
ImagePicker.propTypes = {
  onSelect: PropTypes.func.isRequired,
  url: PropTypes.string,
  description: PropTypes.string,
  label: PropTypes.string,
  previewClassName: PropTypes.string,
};

ImagePicker.Content = function ({ url, description, className = '' }) {
  return <img className={className} src={url} alt={description} />;
};
ImagePicker.Content.propTypes = {
  url: PropTypes.string,
  description: PropTypes.string,
  className: PropTypes.string,
};

function buildImagePreview(src, alt, className) {
  return src ? (
    <img className={className} src={src} alt={alt} />
  ) : (
    <Placeholder icon="format-image" label="No image selected" />
  );
}
