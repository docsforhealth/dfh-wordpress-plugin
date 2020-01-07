import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

import * as Constants from '../../constants';
import WithInnerBlockAttrs from '../../editor/with-inner-block-attrs';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_TOOLKIT_DETAIL_SECTION_CONTAINER, {
  title: __('Toolkit Sections', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY_TOOLKIT,
  // TODO icon and description
  supports: { inserter: false },
  attributes: {
    overallMarkupId: { type: 'string' },
  },
  edit({ attributes, clientId }) {
    return (
      <WithInnerBlockAttrs
        clientId={clientId}
        innerBlockAttrs={{
          [Constants.BLOCK_TOOLKIT_DETAIL_SECTION]: {
            parentClientId: clientId,
            overallMarkupId: attributes.overallMarkupId,
            // Because these attribute aren't used in THIS block's save hook, these can be passed
            // through to directly child blocks
            backButtonLabel: attributes.backButtonLabel,
            nextButtonLabel: attributes.nextButtonLabel,
          },
        }}
      >
        <InnerBlocks
          allowedBlocks={[Constants.BLOCK_TOOLKIT_DETAIL_SECTION]}
          template={[
            [Constants.BLOCK_TOOLKIT_DETAIL_SECTION],
            [Constants.BLOCK_TOOLKIT_DETAIL_SECTION],
            [Constants.BLOCK_TOOLKIT_DETAIL_SECTION],
          ]}
        />
      </WithInnerBlockAttrs>
    );
  },
  save({ attributes }) {
    return (
      <div
        id={attributes.overallMarkupId}
        className="toolkit-detail-container__item-container"
        data-slick-active-class="toolkit-topics__section--active"
        data-slick={JSON.stringify({
          adaptiveHeight: true,
          arrows: false,
        })}
      >
        <InnerBlocks.Content />
      </div>
    );
  },
});
