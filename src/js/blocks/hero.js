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
      <div>
        <header class="landing-header">
          <div class="landing-header__container">
            <h1 class="heading heading--1">
              {__(
                'Provider resources for the determinants of health',
                Constants.TEXT_DOMAIN,
              )}
            </h1>
            <p class="text text--large margin-b-3">
              {__(
                'Helping healthcare providers create a system that truly supports our vulnerable patients',
                Constants.TEXT_DOMAIN,
              )}
            </p>
            <div class="button-container">
              <a href="/resources.html" class="button-container__button button">
                {__('Show me the resources', Constants.TEXT_DOMAIN)}
              </a>
              <button
                type="button"
                class="button-container__button button button--outline"
              >
                {__('Get in touch', Constants.TEXT_DOMAIN)}
              </button>
            </div>
          </div>
        </header>
        <section class="landing-video">
          <div class="landing-video__description">
            <h2 class="heading heading--3">
              {__('Why Docs for Health?', Constants.TEXT_DOMAIN)}
            </h2>
            <p class="text">
              {__(
                'Ask Megan, an outreach program manager who helped put together Docs for Health',
                Constants.TEXT_DOMAIN,
              )}
            </p>
          </div>
          <img
            class="landing-video__preview"
            src={headshotUrl}
            alt="Megan Smith headshot"
          />
          <button
            type="button"
            class="landing-video__button"
            aria-label="Play introductory video"
          />
        </section>
      </div>
    );
  },
  save() {
    return (
      <div>
        <header class="landing-header">
          <div class="landing-header__container">
            <h1 class="heading heading--1">
              {__(
                'Provider resources for the determinants of health',
                Constants.TEXT_DOMAIN,
              )}
            </h1>
            <p class="text text--large margin-b-3">
              {__(
                'Helping healthcare providers create a system that truly supports our vulnerable patients',
                Constants.TEXT_DOMAIN,
              )}
            </p>
            <div class="button-container">
              <a href="/resources.html" class="button-container__button button">
                {__('Show me the resources', Constants.TEXT_DOMAIN)}
              </a>
              <button
                type="button"
                class="button-container__button button button--outline"
              >
                {__('Get in touch', Constants.TEXT_DOMAIN)}
              </button>
            </div>
          </div>
        </header>
        <section class="landing-video">
          <div class="landing-video__description">
            <h2 class="heading heading--3">
              {__('Why Docs for Health?', Constants.TEXT_DOMAIN)}
            </h2>
            <p class="text">
              {__(
                'Ask Megan, an outreach program manager who helped put together Docs for Health',
                Constants.TEXT_DOMAIN,
              )}
            </p>
          </div>
          <img
            class="landing-video__preview"
            src={headshotUrl}
            alt="Megan Smith headshot"
          />
          <button
            type="button"
            class="landing-video__button"
            aria-label="Play introductory video"
          />
        </section>
      </div>
    );
  },
});
