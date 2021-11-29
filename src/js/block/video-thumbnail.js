import { registerBlockType } from '@wordpress/blocks';
import { TextControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import _ from 'lodash';
import * as Constants from 'src/js/constants';
import { fetchVideoThumbnail } from 'src/js/utils';

const wrappedUpdateThumbnail = _.debounce(updateThumbnail, 200);

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_VIDEO_THUMBNAIL, {
  title: __('Video Thumbnail', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY_MEDIA,
  icon: 'format-video',
  description: __(
    'Thumnail preview of a video that opens into a pop-up video',
    Constants.TEXT_DOMAIN,
  ),
  attributes: {
    label: { type: 'string', default: __('Play', Constants.TEXT_DOMAIN) },
    videoUrl: { type: 'string' },
    thumbnailUrl: { type: 'string' },
  },
  edit({ attributes, setAttributes }) {
    return (
      <Fragment>
        <TextControl
          label={__('Video URL', Constants.TEXT_DOMAIN)}
          help={__(
            'Only YouTube and Vimeo links are supported',
            Constants.TEXT_DOMAIN,
          )}
          value={attributes.videoUrl}
          onChange={(videoUrl) => {
            setAttributes({ videoUrl });
            wrappedUpdateThumbnail(videoUrl, setAttributes);
          }}
        />
        <TextControl
          label={__('Hover button label', Constants.TEXT_DOMAIN)}
          help={__(
            'Button shows up when hovering over thumbnail',
            Constants.TEXT_DOMAIN,
          )}
          value={attributes.label}
          onChange={(label) => setAttributes({ label })}
        />
        {attributes.thumbnailUrl && (
          <img
            className="dfh-editor-rounded-corners"
            src={attributes.thumbnailUrl}
            alt="Video thumbnail"
          />
        )}
      </Fragment>
    );
  },
  save({ attributes }) {
    return attributes.thumbnailUrl ? (
      <a href={attributes.videoUrl} className="video-thumbnail" data-lity>
        <img
          className="video-thumbnail__image"
          src={attributes.thumbnailUrl}
          alt="Video thumbnail"
        />
        <button type="button" className="video-thumbnail__control">
          {attributes.label}
        </button>
      </a>
    ) : null;
  },
});

function updateThumbnail(videoUrl, setAttributes) {
  fetchVideoThumbnail(videoUrl).then(
    (thumbnailUrl) => setAttributes({ thumbnailUrl }),
    () => setAttributes({ thumbnailUrl: null }),
  );
}
