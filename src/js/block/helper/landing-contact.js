import { __ } from '@wordpress/i18n';
import { InnerBlocks, RichText } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

import * as Constants from '../../constants';
import FormPicker from '../../editor/form-picker';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_LANDING_CONTACT, {
  title: __('Landing Contact', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY,
  icon: 'admin-users',
  description: __('Contact form on the landing page', Constants.TEXT_DOMAIN),
  supports: { inserter: false },
  attributes: {
    formId: { type: 'string' },
    email: { type: 'string' },
  },
  edit({ attributes, setAttributes }) {
    return (
      <section className="landing-contact">
        <div className="landing-contact__form">
          <div className="margin-b-2">
            <InnerBlocks
              allowedBlocks={[Constants.BLOCK_TEXT_CONTAINER]}
              templateLock={Constants.INNER_BLOCKS_LOCKED}
              template={[
                [
                  Constants.BLOCK_TEXT_CONTAINER,
                  { forceHeadingLevel: Constants.HEADING_SIZE_LARGE },
                ],
              ]}
            />
          </div>
          <FormPicker
            value={attributes.formId}
            onChange={formId => setAttributes({ formId })}
          />
          <p className="text text-center">
            Or email us directly at
            <br />
            <RichText
              tagName="a"
              className="link editor-is-clickable"
              value={attributes.email}
              placeholder={__(
                'Enter email address here',
                Constants.TEXT_DOMAIN,
              )}
              onChange={email => setAttributes({ email })}
              multiline={false}
              withoutInteractiveFormatting={true}
            />
          </p>
        </div>
      </section>
    );
  },
  save({ attributes }) {
    return (
      <section className="landing-contact">
        <div className="landing-contact__form">
          <div className="margin-b-2">
            <InnerBlocks.Content />
          </div>
          <FormPicker.Content
            value={attributes.formId}
            className="margin-b-2"
          />
          {attributes.email && (
            <p className="text text-center">
              Or email us directly at
              <br />
              <a className="link" href={`mailto:${attributes.email}`}>
                {attributes.email}
              </a>
            </p>
          )}
        </div>
      </section>
    );
  },
});
