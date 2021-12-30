import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import placeholderImage from 'assets/images/placeholder-headshot.png';
import * as Heading from 'src/js/block/heading';
import * as Text from 'src/js/block/text';
import * as Constants from 'src/js/constants';
import ImagePicker from 'src/js/editor/image-picker';
import PopupPicker from 'src/js/editor/popup-picker';

const title = __('Landing Video', Constants.TEXT_DOMAIN);

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_LANDING_VIDEO, {
  title,
  category: Constants.CATEGORY_LANDING,
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
      <Fragment>
        <div className="dfh-editor-block-title dfh-editor-block-title--nested">
          {title}
        </div>
        <section className="landing-video">
          <div className="landing-video__description">
            <InnerBlocks
              templateLock={Constants.INNER_BLOCKS_LOCKED}
              template={[
                [
                  Constants.BLOCK_CONTENT_CONTAINER,
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
            label={__('Select landing video preview', Constants.TEXT_DOMAIN)}
            onSelect={({ url, alt }) =>
              setAttributes({ videoImageUrl: url, videoImageAlt: alt })
            }
            previewClassName="landing-video__preview"
            url={attributes.videoImageUrl}
            description={attributes.videoImageAlt}
          />
          <PopupPicker
            label={__('Landing video URL', Constants.TEXT_DOMAIN)}
            target={attributes.videoUrl}
            onChange={({ target }) => setAttributes({ videoUrl: target })}
          />
        </section>
      </Fragment>
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
        {attributes.videoUrl && (
          <PopupPicker.Content
            className="landing-video__button"
            target={attributes.videoUrl}
          >
            <span className="sr-only">Play introductory video</span>
          </PopupPicker.Content>
        )}
      </section>
    );
  },
});
