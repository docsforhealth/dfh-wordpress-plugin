import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { MediaUpload, RichText } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

import * as Constants from '../constants';
import placeholderUrl from '../../../assets/images/picture-megan.png';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType('dfh/hero', {
  title: __('Hero', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY,
  attributes: {
    mainTitle: {
      type: 'string',
      source:'html',
      selector: '.landing-header__container .heading',
    },
    mainSubtitle: {
      type: 'string',
      source:'html',
      selector: '.landing-header__container .text',
    },
    videoTitle: {
      type: 'string',
      source:'html',
      selector: '.landing-video__description .heading',
    },
    videoSubtitle: {
      type: 'string',
      source:'html',
      selector: '.landing-video__description .text',
    },
    videoImage: {
      type: 'string',
      source: 'attribute',
      selector: '.landing-video__preview img',
      attribute: 'src',
      default: placeholderUrl,
    },
    videoImageAlt: {
      type: 'string',
      source: 'attribute',
      selector: '.landing-video__preview img',
      attribute: 'alt',
      default: 'Video thumbnail',
    },
  },
  edit({ attributes, setAttributes }) {
    return (
      <div className="landing-hero">
        <header className="landing-header">
          <div className="landing-header__container">
            <RichText
              tagName="h1"
              className="heading heading--1"
              placeholder={__('Enter your title here', Constants.TEXT_DOMAIN)}
              value={attributes.mainTitle}
              onChange={mainTitle => setAttributes({ mainTitle })}
            />
            <RichText
              tagName="p"
              className="text text--large margin-b-3"
              placeholder={__(
                'Enter your subtitle here',
                Constants.TEXT_DOMAIN,
              )}
              value={attributes.mainSubtitle}
              onChange={mainSubtitle => setAttributes({ mainSubtitle })}
            />
            <div className="button-container">
              <a
                href="/resources.html"
                className="button-container__button button"
              >
                {__('Show me the resources', Constants.TEXT_DOMAIN)}
              </a>
              <button
                type="button"
                className="button-container__button button button--outline"
              >
                {__('Get in touch', Constants.TEXT_DOMAIN)}
              </button>
            </div>
          </div>
        </header>
        <section className="landing-video">
          <div className="landing-video__description">
            <RichText
              tagName="h2"
              className="heading heading--3"
              placeholder={__(
                'Enter your video title here',
                Constants.TEXT_DOMAIN,
              )}
              value={attributes.videoTitle}
              onChange={videoTitle => setAttributes({ videoTitle })}
            />
            <RichText
              tagName="p"
              className="text"
              placeholder={__(
                'Enter your video subtitle here',
                Constants.TEXT_DOMAIN,
              )}
              value={attributes.videoSubtitle}
              onChange={videoSubtitle => setAttributes({ videoSubtitle })}
            />
          </div>
          <img
            className="landing-video__preview"
            src={attributes.videoImage}
            alt={attributes.videoImageAlt}
          />
          <MediaUpload
            onSelect={({ url, alt }) =>
              setAttributes({ videoImage: url, videoImageAlt: alt })
            }
            type="image"
            value={attributes.videoImage}
            render={({ open }) => (
              <div className="editor-uploader">
                <Button className="editor-uploader__button" onClick={open}>
                  {__('Select image', Constants.TEXT_DOMAIN)}
                </Button>
              </div>
            )}
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
                href="/resources.html"
                className="button-container__button button"
              >
                {__('Show me the resources', Constants.TEXT_DOMAIN)}
              </a>
              <button
                type="button"
                className="button-container__button button button--outline"
              >
                {__('Get in touch', Constants.TEXT_DOMAIN)}
              </button>
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
