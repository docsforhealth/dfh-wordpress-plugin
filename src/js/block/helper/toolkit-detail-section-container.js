import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import * as Section from 'src/js/block/helper/toolkit-detail-section';
import * as Constants from 'src/js/constants';
import WithInnerBlockAttrs from 'src/js/editor/with-inner-block-attrs';

// This block exists to allow for a container where the only thing possible to add is a
// Section. Also, this block ensures that the index calculations in the Section block will
// always be correct because the only children that can be inserted are Section blocks

const title = __('Toolkit Sections', Constants.TEXT_DOMAIN);

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_TOOLKIT_DETAIL_SECTION_CONTAINER, {
  title,
  category: Constants.CATEGORY_TOOLKIT,
  icon: 'book-alt',
  description: __(
    'The sections that form the heart of this toolkit',
    Constants.TEXT_DOMAIN,
  ),
  supports: { inserter: false },
  attributes: {
    [Section.ATTR_OVERALL_MARKUP_ID]: { type: 'string' },
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
          [Constants.BLOCK_TOOLKIT_DETAIL_SECTION]: {
            [Section.ATTR_OVERALL_MARKUP_ID]:
              attributes[Section.ATTR_OVERALL_MARKUP_ID],
            [Section.ATTR_PARENT_CLIENT_ID]: clientId,
            [Section.ATTR_BACK_BUTTON_LABEL]: attributes.backButtonLabel,
            [Section.ATTR_NEXT_BUTTON_LABEL]: attributes.nextButtonLabel,
          },
        }}
      >
        <div className="dfh-editor-block-title dfh-editor-block-title--nested">
          {title}
        </div>
        <TextControl
          label={__('Previous section button label', Constants.TEXT_DOMAIN)}
          help={__(
            'Navigation buttons only shown on mobile devices',
            Constants.TEXT_DOMAIN,
          )}
          value={attributes.backButtonLabel}
          onChange={(backButtonLabel) => setAttributes({ backButtonLabel })}
        />
        <TextControl
          label={__('Next section button label', Constants.TEXT_DOMAIN)}
          help={__(
            'Navigation buttons only shown on mobile devices',
            Constants.TEXT_DOMAIN,
          )}
          value={attributes.nextButtonLabel}
          onChange={(nextButtonLabel) => setAttributes({ nextButtonLabel })}
        />
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
