import * as Constants from '../constants';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType('dfh/contact', {
  title: __('Contact', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY,

  // see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-edit-save/
  edit() {
    return (
      <section className="landing-contact">
        <div className="landing-contact__form">
          <h3 className="heading heading--2">
            <span className="heading__title">Get in touch</span>
          </h3>
          <p className="text margin-b-2">
            Feedback on our resources? Thoughts on how to create a system that
            is sustainable and empowering both for our patients and for us as
            providers? Send us a message.
          </p>
          <form className="form margin-b-2" action="">
            <div className="form__item form__item--half">
              <label className="form__text" for="contact-name">
                Your name
              </label>
              <input
                className="form__control"
                id="contact-name"
                type="text"
                placeholder="What is your name?"
                required
              />
            </div>
            <div className="form__item form__item--half">
              <label className="form__text" for="contact-email">
                Your email
              </label>
              <input
                className="form__control"
                id="contact-email"
                type="text"
                placeholder="How can we get back to you?"
                required
              />
            </div>
            <div className="form__item">
              <label className="form__text" for="contact-message">
                Your message
              </label>
              <textarea
                className="form__control"
                id="contact-message"
                cols="30"
                rows="10"
                placeholder="What comments, suggestions, or feedback do you have?"
                required
              />
            </div>
          </form>
          <p className="text text-center">
            Or email us directly at
            <br />
            <a className="link" href="mailto:community@docsforhealth.org">
              community@docsforhealth.org
            </a>
          </p>
        </div>
      </section>
    );
  },
  save() {
    return (
      <section className="landing-contact">
        <div className="landing-contact__form">
          <h3 className="heading heading--2">
            <span className="heading__title">Get in touch</span>
          </h3>
          <p className="text margin-b-2">
            Feedback on our resources? Thoughts on how to create a system that
            is sustainable and empowering both for our patients and for us as
            providers? Send us a message.
          </p>
          <form className="form margin-b-2" action="">
            <div className="form__item form__item--half">
              <label className="form__text" for="contact-name">
                Your name
              </label>
              <input
                className="form__control"
                id="contact-name"
                type="text"
                placeholder="What is your name?"
                required
              />
            </div>
            <div className="form__item form__item--half">
              <label className="form__text" for="contact-email">
                Your email
              </label>
              <input
                className="form__control"
                id="contact-email"
                type="text"
                placeholder="How can we get back to you?"
                required
              />
            </div>
            <div className="form__item">
              <label className="form__text" for="contact-message">
                Your message
              </label>
              <textarea
                className="form__control"
                id="contact-message"
                cols="30"
                rows="10"
                placeholder="What comments, suggestions, or feedback do you have?"
                required
              />
            </div>
          </form>
          <p className="text text-center">
            Or email us directly at
            <br />
            <a className="link" href="mailto:community@docsforhealth.org">
              community@docsforhealth.org
            </a>
          </p>
        </div>
      </section>
    );
  },
});
