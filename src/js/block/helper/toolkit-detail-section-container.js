import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

import * as Constants from '../../constants';
import * as Section from './toolkit-detail-section';
import WithInnerBlockAttrs from '../../editor/with-inner-block-attrs';

// This block exists to allow for a container where the only thing possible to add is a
// Section. Also, this block ensures that the index calculations in the Section block will
// always be correct because the only children that can be inserted are Section blocks

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_TOOLKIT_DETAIL_SECTION_CONTAINER, {
  title: __('Toolkit Sections', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY_TOOLKIT,
  // TODO icon and description
  supports: { inserter: false },
  attributes: {
    [Section.ATTR_OVERALL_MARKUP_ID]: { type: 'string' },
  },
  edit({ attributes, clientId }) {
    return (
      <WithInnerBlockAttrs
        clientId={clientId}
        innerBlockAttrs={{
          [Constants.BLOCK_TOOLKIT_DETAIL_SECTION]: {
            [Section.ATTR_OVERALL_MARKUP_ID]:
              attributes[Section.ATTR_OVERALL_MARKUP_ID],
            [Section.ATTR_PARENT_CLIENT_ID]: clientId,
            // Because these attribute aren't used in THIS block's save hook, these can be passed
            // through to directly child blocks
            [Section.ATTR_BACK_BUTTON_LABEL]:
              attributes[Section.ATTR_BACK_BUTTON_LABEL],
            [Section.ATTR_NEXT_BUTTON_LABEL]:
              attributes[Section.ATTR_NEXT_BUTTON_LABEL],
          },
        }}
      >
        <InnerBlocks
          allowedBlocks={[Constants.BLOCK_TOOLKIT_DETAIL_SECTION]}
          // If parent InnerBlocks is locked, then we explicitly need to unlock this
          templateLock={Constants.INNER_BLOCKS_UNLOCKED}
          template={[[Constants.BLOCK_TOOLKIT_DETAIL_SECTION]]}
        />
      </WithInnerBlockAttrs>
    );
  },
  save({ attributes }) {
    return (
      <div
        id={attributes[Section.ATTR_OVERALL_MARKUP_ID]}
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
