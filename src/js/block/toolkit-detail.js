import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

import * as Constants from '../constants';
import * as DetailList from './helper/toolkit-detail-list';
import * as Metadata from './helper/toolkit-detail-metadata';
import * as Section from './helper/toolkit-detail-section';
import WithInnerBlockAttrs from '../editor/with-inner-block-attrs';
import { withValidTemplate } from '../utils';

const title = __('Toolkit Detail', Constants.TEXT_DOMAIN);

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(`${Constants.NAMESPACE}/toolkit-detail`, {
  title,
  category: Constants.CATEGORY_TOOLKIT,
  icon: 'portfolio',
  description: __(
    'Video, text, and link resources that form a toolkit',
    Constants.TEXT_DOMAIN,
  ),
  edit: withValidTemplate(({ clientId }) => {
    return (
      <WithInnerBlockAttrs
        clientId={clientId}
        innerBlockAttrs={{
          [Constants.BLOCK_TOOLKIT_DETAIL_METADATA]: {
            [Metadata.ATTR_PARENT_CLIENT_ID]: clientId,
          },
          // Need to do this because we want to dynamically set the attributes to force via
          // the inner block wrapper every time because the clientId changes every time
          [Constants.BLOCK_INNER_BLOCK_WRAPPER]: {
            forceAttributes: {
              [Constants.BLOCK_TOOLKIT_DETAIL_LIST]: {
                [DetailList.ATTR_OVERALL_MARKUP_ID]: clientId,
                [DetailList.ATTR_PARENT_CLIENT_ID]: clientId,
              },
            },
          },
          [Constants.BLOCK_TOOLKIT_DETAIL_SECTION_CONTAINER]: {
            [Section.ATTR_OVERALL_MARKUP_ID]: clientId,
          },
        }}
      >
        <div className="dfh-editor-block-title">{title}</div>
        <InnerBlocks
          templateLock={Constants.INNER_BLOCKS_LOCKED}
          template={[
            [Constants.BLOCK_TOOLKIT_DETAIL_METADATA],
            [
              Constants.BLOCK_INNER_BLOCK_WRAPPER,
              {
                wrapperClassNames: ['toolkit-detail-container__list'],
                isLocked: true,
                template: [
                  [Constants.BLOCK_TOOLKIT_DETAIL_HEADER],
                  [Constants.BLOCK_TOOLKIT_DETAIL_LIST],
                ],
              },
            ],
            [Constants.BLOCK_TOOLKIT_DETAIL_SECTION_CONTAINER],
          ]}
        />
      </WithInnerBlockAttrs>
    );
  }),
  save() {
    return (
      <div className="toolkit-detail-container">
        <InnerBlocks.Content />
      </div>
    );
  },
});
