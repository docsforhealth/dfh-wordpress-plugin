import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import * as Constants from 'src/js/constants';
import AutoLabelAppender from 'src/js/editor/auto-label-appender';

const title = __('Mission Statement', Constants.TEXT_DOMAIN);

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(`${Constants.NAMESPACE}/mission-statement`, {
  title,
  category: Constants.CATEGORY_LANDING,
  icon: 'lightbulb',
  description: __(
    'Statement with background graphic for emphasis',
    Constants.TEXT_DOMAIN,
  ),
  attributes: {
    hiddenTitle: {
      type: 'string',
      default: __('Our mission', Constants.TEXT_DOMAIN),
    },
  },
  edit({ attributes, setAttributes }) {
    return (
      <>
        <div className="dfh-editor-block-title">{title}</div>
        <div className="landing-mission">
          <TextControl
            label={__('Hidden title text', Constants.TEXT_DOMAIN)}
            help={__(
              'Title will only be visible to screen readers',
              Constants.TEXT_DOMAIN,
            )}
            value={attributes.hiddenTitle}
            onChange={(hiddenTitle) => setAttributes({ hiddenTitle })}
          />
          <InnerBlocks
            allowedBlocks={[Constants.BLOCK_TEXT]}
            template={[[Constants.BLOCK_TEXT]]}
            renderAppender={AutoLabelAppender}
          />
        </div>
      </>
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
