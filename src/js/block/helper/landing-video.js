import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

import * as Constants from '../../constants';
import * as Heading from '../heading';
import * as Text from '../text';
import ImagePicker from '../../editor/image-picker';
import placeholderImage from '../../../../assets/images/placeholder-headshot.png';
import PopupPicker from '../../editor/popup-picker';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_LANDING_VIDEO, {
  title: __('Landing Video', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY,
  icon: 'video-alt2',
  description: __('Overview video on the landing page', Constants.TEXT_DOMAIN),
  supports: { inserter: false },
  attributes: {
    videoImageUrl: { type: 'string', default: placeholderImage },
    videoImageAlt: {
      type: 'string',
      default: __('Video thumbnail', Constants.TEXT_DOMAIN),
    },
    videoUrl: { type: 'string' },
  },
  edit({ attributes, setAttributes }) {
    return (
      <section className="landing-video">
        <div className="landing-video__description">
          <InnerBlocks
            allowedBlocks={[Constants.BLOCK_TEXT_CONTAINER]}
            templateLock={Constants.INNER_BLOCKS_LOCKED}
            template={[
              [
                Constants.BLOCK_TEXT_CONTAINER,
                {
                  forceAttributes: {
                    [Constants.BLOCK_HEADING]: {
                      [Heading.ATTR_LEVEL]: Constants.HEADING_SIZE_MEDIUM,
                      [Heading.ATTR_SHOW_PRE_TITLE]: false,
                      [Heading.ATTR_SHOW_POST_TITLE]: false,
                      [Heading.ATTR_HIGHLIGHT_MAIN_TITLE]: false,

                      [Heading.ATTR_OPTION_LEVEL]: false,
                      [Heading.ATTR_OPTION_SHOW_PRE_TITLE]: false,
                      [Heading.ATTR_OPTION_SHOW_POST_TITLE]: false,
                      [Heading.ATTR_OPTION_HIGHLIGHT_MAIN_TITLE]: false,
                    },
                    [Constants.BLOCK_TEXT]: {
                      [Text.ATTR_SIZE]: Constants.TEXT_SIZE_DEFAULT,
                      [Text.ATTR_OPTION_SIZE]: false,
                    },
                  },
                },
              ],
            ]}
          />
        </div>
        <ImagePicker
          onSelect={({ url, alt }) =>
            setAttributes({ videoImageUrl: url, videoImageAlt: alt })
          }
          previewClassName="landing-video__preview"
          url={attributes.videoImageUrl}
          description={attributes.videoImageAlt}
        />
        <PopupPicker
          target={attributes.videoUrl}
          onChange={({ target }) => setAttributes({ videoUrl: target })}
        />
      </section>
    );
  },
  save({ attributes }) {
    return (
      <section className="landing-video">
        <div className="landing-video__description">
          <InnerBlocks.Content />
        </div>
        <ImagePicker.Content
          className="landing-video__preview"
          url={attributes.videoImageUrl}
          description={attributes.videoImageAlt}
        />
        <PopupPicker.Content
          className="landing-video__button"
          target={attributes.videoUrl}
        >
          <span class="sr-only">Play introductory video</span>
        </PopupPicker.Content>
      </section>
    );
  },
});
