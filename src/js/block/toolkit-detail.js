import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { TextControl } from '@wordpress/components';

import * as Constants from '../constants';
import WithInnerBlockAttrs from '../editor/with-inner-block-attrs';

const title = __('Toolkit Detail', Constants.TEXT_DOMAIN);

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(`${Constants.NAMESPACE}/toolkit-detail`, {
  title,
  category: Constants.CATEGORY_TOOLKIT,
  // TODO icon and description
  attributes: {
    backButtonLabel: {
      type: 'string',
      default: __('Back', Constants.TEXT_DOMAIN),
    },
    nextButtonLabel: {
      type: 'string',
      default: __('Next', Constants.TEXT_DOMAIN),
    },
  },
  edit({ clientId, attributes, setAttributes }) {
    return (
      <WithInnerBlockAttrs
        clientId={clientId}
        innerBlockAttrs={{
          [Constants.BLOCK_TOOLKIT_DETAIL_LIST]: {
            overallMarkupId: clientId,
            parentClientId: clientId,
          },
          [Constants.BLOCK_TOOLKIT_DETAIL_SECTION_CONTAINER]: {
            overallMarkupId: clientId,
            backButtonLabel: attributes.backButtonLabel,
            nextButtonLabel: attributes.nextButtonLabel,
          },
        }}
      >
        <div className="dfh-editor-block-title">{title}</div>
        <TextControl
          label={__('Previous section button label', Constants.TEXT_DOMAIN)}
          help={__(
            'Navigation buttons only shown on mobile devices',
            Constants.TEXT_DOMAIN,
          )}
          value={attributes.backButtonLabel}
          onChange={backButtonLabel => setAttributes({ backButtonLabel })}
        />
        <TextControl
          label={__('Next section button label', Constants.TEXT_DOMAIN)}
          help={__(
            'Navigation buttons only shown on mobile devices',
            Constants.TEXT_DOMAIN,
          )}
          value={attributes.nextButtonLabel}
          onChange={nextButtonLabel => setAttributes({ nextButtonLabel })}
        />
        <InnerBlocks
          isLocked={true}
          template={[
            [Constants.BLOCK_TOOLKIT_DETAIL_LIST],
            [Constants.BLOCK_TOOLKIT_DETAIL_SECTION_CONTAINER],
          ]}
        />
      </WithInnerBlockAttrs>
    );
  },
  save({ clientId }) {
    return (
      <div className="toolkit-detail-container">
        <InnerBlocks.Content />
      </div>
    );
  },
});
