import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { TextControl } from '@wordpress/components';

import * as Constants from '../../constants';
import * as Heading from '../heading';
import FormPicker from '../../editor/form-picker';

const title = __('Landing Contact Form', Constants.TEXT_DOMAIN);

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_LANDING_CONTACT, {
  title,
  category: Constants.CATEGORY_LANDING,
  icon: 'admin-users',
  description: __('Contact form on the landing page', Constants.TEXT_DOMAIN),
  supports: { inserter: false },
  attributes: {
    formId: { type: 'string' },
    email: { type: 'string' },
    emailInvite: {
      type: 'string',
      default: __('Or email us directly at', Constants.TEXT_DOMAIN),
    },
  },
  edit({ attributes, setAttributes }) {
    return (
      <Fragment>
        <div className="dfh-editor-block-title dfh-editor-block-title--nested">
          {title}
        </div>
        <section className="landing-contact">
          <div className="landing-contact__form">
            <div className="margin-b-2">
              <InnerBlocks
                templateLock={Constants.INNER_BLOCKS_LOCKED}
                template={[
                  [
                    Constants.BLOCK_CONTENT_CONTAINER,
                    {
                      forceAttributes: {
                        [Constants.BLOCK_HEADING]: {
                          [Heading.ATTR_LEVEL]: Constants.HEADING_SIZE_LARGE,
                          [Heading.ATTR_OPTION_LEVEL]: false,
                        },
                      },
                    },
                  ],
                ]}
              />
            </div>
            <FormPicker
              value={attributes.formId}
              onChange={formId => setAttributes({ formId })}
            />
            <TextControl
              label={__('Email address invitation', Constants.TEXT_DOMAIN)}
              help={__(
                'Provide context about the purpose of the email address',
                Constants.TEXT_DOMAIN,
              )}
              value={attributes.emailInvite}
              onChange={emailInvite => setAttributes({ emailInvite })}
            />
            <TextControl
              label={__('Alternate email address', Constants.TEXT_DOMAIN)}
              placeholder={__(
                'Enter email address here',
                Constants.TEXT_DOMAIN,
              )}
              value={attributes.email}
              onChange={email => setAttributes({ email })}
            />
          </div>
        </section>
      </Fragment>
    );
  },
  save({ attributes }) {
    return (
      <section className="landing-contact">
        <div className="landing-contact__form">
          <div className="margin-b-2">
            <InnerBlocks.Content />
          </div>
          <FormPicker.Content value={attributes.formId} />
          {attributes.emailInvite && attributes.email && (
            <div className="margin-t-2">
              <p className="text text-center">
                {attributes.emailInvite}
                <br />
                <a className="link" href={`mailto:${attributes.email}`}>
                  {attributes.email}
                </a>
              </p>
            </div>
          )}
        </div>
      </section>
    );
  },
});
