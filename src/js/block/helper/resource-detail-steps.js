import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import * as Heading from 'src/js/block/heading';
import * as Constants from 'src/js/constants';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_RESOURCE_DETAIL_STEPS, {
  title: __('Resource Detail Steps', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY_RESOURCE,
  icon: 'excerpt-view',
  description: __('Next steps for a specific resource', Constants.TEXT_DOMAIN),
  supports: { inserter: false },
  edit() {
    return (
      <Fragment>
        <div className="dfh-editor-block-title dfh-editor-block-title--nested">
          {__('Documents & Steps', Constants.TEXT_DOMAIN)}
        </div>
        <InnerBlocks
          templateLock={Constants.INNER_BLOCKS_LOCKED}
          template={[
            [
              Constants.BLOCK_HEADING,
              {
                mainTitle: __('Documents', Constants.TEXT_DOMAIN),
                [Heading.ATTR_LEVEL]: Constants.HEADING_SIZE_MEDIUM,
                [Heading.ATTR_OPTION_LEVEL]: false,
                [Heading.ATTR_SHOW_PRE_TITLE]: false,
                [Heading.ATTR_SHOW_POST_TITLE]: false,
              },
            ],
            [
              Constants.BLOCK_INNER_BLOCK_WRAPPER,
              {
                wrapper: [{ tagName: 'ol', classNames: ['resource-steps'] }],
                showWrapperInEdit: true,
                allowedBlocks: [Constants.BLOCK_RESOURCE_DETAIL_STEPS_STEP],
                template: [[Constants.BLOCK_RESOURCE_DETAIL_STEPS_STEP]],
              },
            ],
            [
              Constants.BLOCK_HEADING,
              {
                mainTitle: __('Next steps', Constants.TEXT_DOMAIN),
                [Heading.ATTR_LEVEL]: Constants.HEADING_SIZE_MEDIUM,
                [Heading.ATTR_OPTION_LEVEL]: false,
                [Heading.ATTR_SHOW_PRE_TITLE]: false,
                [Heading.ATTR_SHOW_POST_TITLE]: false,
              },
            ],
            [Constants.BLOCK_CONTENT_CONTAINER, { noHeadings: true }],
          ]}
        />
      </Fragment>
    );
  },
  save() {
    return (
      <div className="resource-detail__steps">
        <InnerBlocks.Content />
      </div>
    );
  },
});
