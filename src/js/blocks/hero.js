import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

import * as Constants from '../constants';
import ImagePicker from '../editor/image-picker';
import LinkPicker from '../editor/link-picker';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType('dfh/hero', {
  title: __('Hero', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY,
  attributes: {
    mainTitle: {
      type: 'string',
      source: 'html',
      selector: '.landing-header__container .heading',
    },
    mainSubtitle: {
      type: 'string',
      source: 'html',
      selector: '.landing-header__container .text',
    },
    videoTitle: {
      type: 'string',
      source: 'html',
      selector: '.landing-video__description .heading',
    },
    videoSubtitle: {
      type: 'string',
      source: 'html',
      selector: '.landing-video__description .text',
    },
    videoImage: {
      type: 'string',
      source: 'attribute',
      selector: '.landing-video__preview img',
      attribute: 'src',
    },
    videoImageAlt: {
      type: 'string',
      source: 'attribute',
      selector: '.landing-video__preview img',
      attribute: 'alt',
      default: 'Video thumbnail',
    },
    primaryActionUrl: { type: 'string' },
    primaryActionUrlTitle: { type: 'string' },
    primaryActionLabel: { type: 'string' },
    secondaryActionUrl: { type: 'string' },
    secondaryActionUrlTitle: { type: 'string' },
    secondaryActionLabel: { type: 'string' },
  },
  edit({ attributes, setAttributes }) {
    return (
      <div className="landing-hero">
        <header className="landing-header">
          <div className="landing-header__container">
            <RichText
              tagName="h1"
              className="heading heading--1"
              placeholder={__('Enter title here', Constants.TEXT_DOMAIN)}
              value={attributes.mainTitle}
              onChange={mainTitle => setAttributes({ mainTitle })}
            />
            <RichText
              tagName="p"
              className="text text--large margin-b-3"
              placeholder={__('Enter subtitle here', Constants.TEXT_DOMAIN)}
              value={attributes.mainSubtitle}
              onChange={mainSubtitle => setAttributes({ mainSubtitle })}
            />
            <div className="button-container">
              <RichText
                className="button-container__button button"
                placeholder={__(
                  'Enter primary action label here',
                  Constants.TEXT_DOMAIN,
                )}
                value={attributes.primaryActionLabel}
                onChange={primaryActionLabel =>
                  setAttributes({ primaryActionLabel })
                }
              />
              <LinkPicker
                url={attributes.primaryActionUrl}
                title={attributes.primaryActionUrlTitle}
                onChange={({ url, title }) =>
                  setAttributes({
                    primaryActionUrl: url,
                    primaryActionUrlTitle: title,
                  })
                }
              />
            </div>
            <div className="button-container">
              <RichText
                className="button-container__button button button--outline"
                placeholder={__(
                  'Enter secondary action label here',
                  Constants.TEXT_DOMAIN,
                )}
                value={attributes.secondaryActionLabel}
                onChange={secondaryActionLabel =>
                  setAttributes({ secondaryActionLabel })
                }
              />
              <LinkPicker
                url={attributes.secondaryActionUrl}
                title={attributes.secondaryActionUrlTitle}
                onChange={({ url, title }) =>
                  setAttributes({
                    secondaryActionUrl: url,
                    secondaryActionUrlTitle: title,
                  })
                }
              />
            </div>
          </div>
        </header>
        <section className="landing-video">
          <div className="landing-video__description">
            <RichText
              tagName="h2"
              className="heading heading--3"
              placeholder={__('Enter video title here', Constants.TEXT_DOMAIN)}
              value={attributes.videoTitle}
              onChange={videoTitle => setAttributes({ videoTitle })}
            />
            <RichText
              tagName="p"
              className="text"
              placeholder={__(
                'Enter video subtitle here',
                Constants.TEXT_DOMAIN,
              )}
              value={attributes.videoSubtitle}
              onChange={videoSubtitle => setAttributes({ videoSubtitle })}
            />
          </div>
          <ImagePicker
            onSelect={({ url, alt }) =>
              setAttributes({ videoImage: url, videoImageAlt: alt })
            }
            previewClassName="landing-video__preview"
            url={attributes.videoImage}
            description={attributes.videoImageAlt}
          />
          <button
            type="button"
            className="landing-video__button"
            aria-label="Play introductory video"
          />
        </section>
      </div>
    );
  },
  save({ attributes }) {
    return (
      <div className="landing-hero">
        <header className="landing-header">
          <div className="landing-header__container">
            <RichText.Content
              tagName="h1"
              className="heading heading--1"
              value={attributes.mainTitle}
            />
            <RichText.Content
              tagName="p"
              className="text text--large margin-b-3"
              value={attributes.mainSubtitle}
            />
            <div className="button-container">
              <a
                href={attributes.primaryActionUrl}
                className="button-container__button button"
              >
                {attributes.primaryActionLabel}
              </a>
              <a
                href={attributes.secondaryActionUrl}
                className="button-container__button button button--outline"
              >
                {attributes.secondaryActionLabel}
              </a>
            </div>
          </div>
        </header>
        <section className="landing-video">
          <div className="landing-video__description">
            <RichText.Content
              tagName="h2"
              className="heading heading--3"
              value={attributes.videoTitle}
            />
            <RichText.Content
              tagName="p"
              className="text"
              value={attributes.videoSubtitle}
            />
          </div>
          <img
            className="landing-video__preview"
            src={attributes.videoImage}
            alt={attributes.videoImageAlt}
          />
          <button
            type="button"
            className="landing-video__button"
            aria-label="Play introductory video"
          />
        </section>
      </div>
    );
  },
});
