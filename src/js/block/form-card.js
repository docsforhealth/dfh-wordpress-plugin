import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

import * as Constants from '../constants';
import * as Heading from './heading';
import FormPicker from '../editor/form-picker';

const title = __('Form Card', Constants.TEXT_DOMAIN);

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(`${Constants.NAMESPACE}/form-card`, {
  title,
  category: Constants.CATEGORY_COMMON,
  icon: 'format-status',
  description: __(
    'Card that displays a message and a form',
    Constants.TEXT_DOMAIN,
  ),
  attributes: {
    formId: { type: 'string' },
  },
  edit({ attributes, setAttributes }) {
    return (
      <Fragment>
        <div className="dfh-editor-block-title">{title}</div>
        <div className="feedback-card">
          <div className="feedback-card__info">
            <InnerBlocks
              templateLock={Constants.INNER_BLOCKS_LOCKED}
              template={[
                [
                  Constants.BLOCK_CONTENT_CONTAINER,
                  {
                    forceAttributes: {
                      [Constants.BLOCK_HEADING]: {
                        [Heading.ATTR_LEVEL]: Constants.HEADING_SIZE_MEDIUM,
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
        </div>
      </Fragment>
    );
  },
  save({ attributes }) {
    return (
      <div className="feedback-card">
        <div className="feedback-card__info">
          <InnerBlocks.Content />
        </div>
        <FormPicker.Content value={attributes.formId} />
      </div>
    );
  },
});
