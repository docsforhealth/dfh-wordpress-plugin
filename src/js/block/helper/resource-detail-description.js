import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { TextareaControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import * as Constants from '../../constants';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_RESOURCE_DETAIL_DESCRIPTION, {
  title: __('Resource Detail Description', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY_CUSTOM_DATA,
  icon: 'networking',
  description: __(
    'Title, category, and description of a specific resource',
    Constants.TEXT_DOMAIN,
  ),
  supports: { inserter: false },
  attributes: {
    description: { type: 'string' },
  },
  edit({ attributes, setAttributes }) {
    return (
      <>
        <TextareaControl
          label={__('Resource summary', Constants.TEXT_DOMAIN)}
          help={__(
            'This short description is used when displaying this resource in other parts of the site',
            Constants.TEXT_DOMAIN,
          )}
          value={attributes.description}
          onChange={(description) => setAttributes({ description })}
        />
        <InnerBlocks
          templateLock={Constants.INNER_BLOCKS_LOCKED}
          template={[
            [Constants.BLOCK_RESOURCE_DETAIL_INFO],
            [
              Constants.BLOCK_CONTENT_CONTAINER,
              {
                noHeadings: true,
                title: __('Resource Description', Constants.TEXT_DOMAIN),
              },
            ],
          ]}
        />
      </>
    );
  },
  save() {
    return (
      <div className="resource-detail__info">
        <InnerBlocks.Content />
      </div>
    );
  },
});
