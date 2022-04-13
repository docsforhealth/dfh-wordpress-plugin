import _ from 'lodash';
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { TextareaControl } from '@wordpress/components';
import { withSelect } from '@wordpress/data';

import * as Constants from '../../constants';
import { fetchVideoThumbnail } from '../../utils';

// This block exists to aggregate metadata in one place for the theme's PHP Ajax Load More
// repeater template to have a single place to pull data for rendering from

export const ATTR_PARENT_CLIENT_ID = 'parentClientId';

const debouncedTryUpdateMediaCounts = _.debounce(tryUpdateMediaCounts, 200),
  debouncedTryUpdateVideoPreview = _.debounce(tryUpdateVideoPreview, 200);

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_TOOLKIT_DETAIL_METADATA, {
  title: __('Toolkit Detail Metadata', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY_CUSTOM_DATA,
  icon: 'portfolio',
  description: __(
    'Metadata information describing a toolkit',
    Constants.TEXT_DOMAIN,
  ),
  supports: { inserter: false },
  attributes: {
    // NOTE do not need to save `ATTR_PARENT_CLIENT_ID` because this changes with every page load
    // [ATTR_PARENT_CLIENT_ID]: { type: 'string' },
    description: { type: 'string' },
    previewVideoUrl: { type: 'string' },
    previewImageUrl: { type: 'string' },
    numAudio: { type: 'integer' },
    numDocuments: { type: 'integer' },
    numImages: { type: 'integer' },
    numPolls: { type: 'integer' },
    numSlideshows: { type: 'integer' },
    numVideos: { type: 'integer' },
  },
  edit: withSelect((select, { attributes }) => {
    const store = select(Constants.STORE_BLOCK_EDITOR),
      descendentIds = store.getClientIdsOfDescendants([
        attributes[ATTR_PARENT_CLIENT_ID],
      ]);
    return {
      innerBlockObjs: store.getBlocksByClientId(descendentIds),
    };
  })(({ innerBlockObjs, attributes, setAttributes }) => {
    debouncedTryUpdateMediaCounts(innerBlockObjs, attributes, setAttributes);
    debouncedTryUpdateVideoPreview(innerBlockObjs, attributes, setAttributes);
    return (
      <TextareaControl
        label={__('Toolkit summary', Constants.TEXT_DOMAIN)}
        help={__(
          'This short description is used when displaying this toolkit in other parts of the site',
          Constants.TEXT_DOMAIN,
        )}
        value={attributes.description}
        onChange={description => setAttributes({ description })}
      />
    );
  }),
  save() {
    return null;
  },
});

function tryUpdateMediaCounts(innerBlockData, attributes, setAttributes) {
  let numAudio = 0,
    numDocuments = 0,
    numImages = 0,
    numPolls = 0,
    numSlideshows = 0,
    numVideos = 0;
  innerBlockData.forEach(({ name, attributes }) => {
    if (Constants.CORE_EMBED_BLOCKS.includes(name)) {
      if (Constants.CORE_EMBED_AUDIO_BLOCKS.includes(name)) {
        numAudio++;
      } else if (Constants.CORE_EMBED_DOCUMENT_BLOCKS.includes(name)) {
        numDocuments++;
      } else if (Constants.CORE_EMBED_IMAGE_BLOCKS.includes(name)) {
        numImages++;
      } else if (Constants.CORE_EMBED_POLL_BLOCKS.includes(name)) {
        numPolls++;
      } else if (Constants.CORE_EMBED_SLIDESHOW_BLOCKS.includes(name)) {
        numSlideshows++;
      } else if (Constants.CORE_EMBED_VIDEO_BLOCKS.includes(name)) {
        numVideos++;
      }
    }
  });
  if (
    !_.isEqual(numAudio, attributes.numAudio) ||
    !_.isEqual(numDocuments, attributes.numDocuments) ||
    !_.isEqual(numImages, attributes.numImages) ||
    !_.isEqual(numPolls, attributes.numPolls) ||
    !_.isEqual(numSlideshows, attributes.numSlideshows) ||
    !_.isEqual(numVideos, attributes.numVideos)
  ) {
    setAttributes({
      numAudio,
      numDocuments,
      numImages,
      numPolls,
      numSlideshows,
      numVideos,
    });
  }
}

function tryUpdateVideoPreview(innerBlockData, attributes, setAttributes) {
  let previewVideoUrl;
  innerBlockData.forEach(({ name, attributes }) => {
    // extract the first videoURL that video thumbnail supports
    if (
      !previewVideoUrl &&
      Constants.VIDEO_THUMBNAIL_SUPPORTED_BLOCKS.includes(name)
    ) {
      // see https://github.com/WordPress/gutenberg/blob/master/packages/block-library/src/embed/util.js#L77
      previewVideoUrl = attributes.url;
    }
  });
  if (!_.isEqual(previewVideoUrl, attributes.previewVideoUrl)) {
    fetchVideoThumbnail(previewVideoUrl).then(
      previewImageUrl => setAttributes({ previewVideoUrl, previewImageUrl }),
      () => setAttributes({ previewVideoUrl: null, previewImageUrl: null }),
    );
  }
}
