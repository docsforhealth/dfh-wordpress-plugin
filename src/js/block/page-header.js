import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

import * as Constants from '../constants';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(`${Constants.NAMESPACE}/page-header`, {
  title: __('Page Header', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY_COMMON,
  icon: 'schedule',
  description: __(
    'Header for a page including title and right-aligned area for more content',
    Constants.TEXT_DOMAIN,
  ),
  edit() {
    return (
      <div class="page-header">
        <InnerBlocks
          templateLock={Constants.INNER_BLOCKS_LOCKED}
          template={[
            [
              Constants.BLOCK_INNER_BLOCK_WRAPPER,
              {
                wrapperElements: ['div', 'h1', 'span'],
                wrapperClassNames: [
                  'page-header__section',
                  'heading heading--2',
                  'heading__title',
                ],
                isLocked: true,
                template: [[Constants.BLOCK_PAGE_TITLE, {}]],
              },
            ],
            [
              Constants.BLOCK_INNER_BLOCK_WRAPPER,
              {
                wrapperClassNames: [
                  'page-header__section page-header__section--right',
                ],
              },
            ],
          ]}
        />
      </div>
    );
  },
  save() {
    return (
      <div className="page-header">
        <InnerBlocks.Content />
      </div>
    );
  },
});
