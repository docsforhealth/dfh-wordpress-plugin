import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import * as Constants from 'src/js/constants';

registerBlockType(Constants.BLOCK_PAGE_CATEGORIES_SEARCH_HEADER, {
  apiVersion: 2,
  title: __('Page Categories & Search', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY_LAYOUT,
  icon: 'search',
  description: __(
    'Nested right-aligned section within a page header that displays a search bar and, if label class specified, a label area to show messages',
    Constants.TEXT_DOMAIN,
  ),
  supports: { inserter: false },
  attributes: {
    className: { type: 'string', default: '' },
    updateLabelClassName: { type: 'string', default: '' },
    searchClassName: { type: 'string', default: '' },
  },
  edit({ attributes, setAttributes }) {
    return (
      <div {...useBlockProps()}>
        <InnerBlocks
          templateLock={Constants.INNER_BLOCKS_LOCKED}
          template={[
            [
              Constants.BLOCK_SEARCH_INPUT,
              {
                wrapperClassName: 'form form--inline page-header__form',
                inputClassName: attributes.searchClassName,
              },
            ],
          ]}
        />
      </div>
    );
  },
  save({ attributes }) {
    return (
      <div {...useBlockProps.save({ className: attributes.className })}>
        {attributes.updateLabelClassName && (
          <span
            className={`page-header__metadata ${attributes.updateLabelClassName}`}
          ></span>
        )}
        <InnerBlocks.Content />
      </div>
    );
  },
});
