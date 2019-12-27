import * as Constants from '../constants';
import headshotUrl from '../../../assets/images/picture-megan.png';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType('dfh/hero', {
  title: __('Hero', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY,

  // see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-edit-save/
  edit() {
    return (
      <div className="landing-hero">
        <header className="landing-header">
          <div className="landing-header__container">
            <h1 className="heading heading--1">
              {__(
                'Provider resources for the determinants of health',
                Constants.TEXT_DOMAIN,
              )}
            </h1>
            <p className="text text--large margin-b-3">
              {__(
                'Helping healthcare providers create a system that truly supports our vulnerable patients',
                Constants.TEXT_DOMAIN,
              )}
            </p>
            <div className="button-container">
              <a href="/resources.html" className="button-container__button button">
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
            <h2 className="heading heading--3">
              {__('Why Docs for Health?', Constants.TEXT_DOMAIN)}
            </h2>
            <p className="text">
              {__(
                'Ask Megan, an outreach program manager who helped put together Docs for Health',
                Constants.TEXT_DOMAIN,
              )}
            </p>
          </div>
          <img
            className="landing-video__preview"
            src={headshotUrl}
            alt="Megan Smith headshot"
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
  save() {
    return (
      <div className="landing-hero">
        <header className="landing-header">
          <div className="landing-header__container">
            <h1 className="heading heading--1">
              {__(
                'Provider resources for the determinants of health',
                Constants.TEXT_DOMAIN,
              )}
            </h1>
            <p className="text text--large margin-b-3">
              {__(
                'Helping healthcare providers create a system that truly supports our vulnerable patients',
                Constants.TEXT_DOMAIN,
              )}
            </p>
            <div className="button-container">
              <a href="/resources.html" className="button-container__button button">
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
            <h2 className="heading heading--3">
              {__('Why Docs for Health?', Constants.TEXT_DOMAIN)}
            </h2>
            <p className="text">
              {__(
                'Ask Megan, an outreach program manager who helped put together Docs for Health',
                Constants.TEXT_DOMAIN,
              )}
            </p>
          </div>
          <img
            className="landing-video__preview"
            src={headshotUrl}
            alt="Megan Smith headshot"
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
