import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import * as Constants from 'src/js/constants';
import { addUniqueIdInApiVersionOne } from 'src/js/utils';

const ATTR_UNIQUE_ID = '_uniqueId';

registerBlockType(
  Constants.BLOCK_FAQ_HEADER,
  addUniqueIdInApiVersionOne(ATTR_UNIQUE_ID, {
    title: __('Page FAQ Header', Constants.TEXT_DOMAIN),
    category: Constants.CATEGORY_LAYOUT,
    icon: 'schedule',
    description: __(
      'Nested header within a page FAQ layout',
      Constants.TEXT_DOMAIN,
    ),
    supports: { inserter: false },
    edit({ clientId, attributes, setAttributes }) {
      const updateLabelClassName = `label-${attributes[ATTR_UNIQUE_ID]}`,
        searchClassName = `search-${attributes[ATTR_UNIQUE_ID]}`;
      return (
        <InnerBlocks
          templateLock={Constants.INNER_BLOCKS_LOCKED}
          template={[
            [
              Constants.BLOCK_PAGE_HEADER,
              {
                isLocked: true,
                hideBlockTitleInEdit: true,
                hideInnerBlocksInEdit: true,
                includePageTitle: false,
                isNested: true,
                template: [
                  [
                    Constants.BLOCK_PAGE_CATEGORIES_SEARCH_HEADER,
                    {
                      className:
                        'page-header__section page-header__section--right',
                      updateLabelClassName,
                      searchClassName,
                    },
                  ],
                ],
              },
            ],
            [
              Constants.BLOCK_PAGE_TAXONOMY_FILTER,
              {
                updateLabelClassName,
                searchClassName,
              },
            ],
          ]}
        />
      );
    },
    save({ attributes }) {
      return <InnerBlocks.Content />;
    },
  }),
);
