import { __ } from '@wordpress/i18n';
import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { TextControl, PanelBody } from '@wordpress/components';

import * as Constants from '../constants';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(`${Constants.NAMESPACE}/mission-statement`, {
  title: __('Mission Statement', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY,
  attributes: {
    hiddenTitle: {
      type: 'string',
      default: __('Our mission', Constants.TEXT_DOMAIN),
    },
  },
  edit({ attributes, setAttributes }) {
    return (
      <div className="landing-mission">
        <InspectorControls>
          <PanelBody
            title={__('Mission Statement Settings', Constants.TEXT_DOMAIN)}
          >
            <TextControl
              label={__('Hidden title text', Constants.TEXT_DOMAIN)}
              help={__(
                'Title will only be visible to screen readers',
                Constants.TEXT_DOMAIN,
              )}
              value={attributes.hiddenTitle}
              onChange={hiddenTitle => setAttributes({ hiddenTitle })}
            />
          </PanelBody>
        </InspectorControls>
        <InnerBlocks
          allowedBlocks={[Constants.BLOCK_TEXT]}
          template={[[Constants.BLOCK_TEXT, {}]]}
        />
      </div>
    );
  },
  save({ attributes }) {
    return (
      <div className="landing-mission">
        <h2 className="landing-mission__title">{attributes.hiddenTitle}</h2>
        <InnerBlocks.Content />
      </div>
    );
  },
});
