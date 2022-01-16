import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import * as Heading from 'src/js/block/heading';
import * as ListOverride from 'src/js/block/override/list';
import * as Constants from 'src/js/constants';

const title = __('Dot Phrase Detail', Constants.TEXT_DOMAIN);

registerBlockType(`${Constants.NAMESPACE}/dot-phrase-detail`, {
  apiVersion: 2,
  title,
  category: Constants.CATEGORY_DOT_PHRASE,
  icon: 'format-status',
  description: __(
    'Detailed information for a specific dot phrase',
    Constants.TEXT_DOMAIN,
  ),
  edit({ attributes, setAttributes }) {
    return (
      <div {...useBlockProps()}>
        <div className="dfh-editor-block-title">{title}</div>
        <InnerBlocks
          templateLock={Constants.INNER_BLOCKS_LOCKED}
          template={[
            [Constants.BLOCK_PAGE_DOT_PHRASE_DETAIL_INFO],
            [
              Constants.BLOCK_CONTENT_CONTAINER,
              {
                noHeadings: true,
                template: [
                  [
                    Constants.BLOCK_TEXT,
                    {
                      placeholder: __(
                        'Enter dot phrase rationale here...',
                        Constants.TEXT_DOMAIN,
                      ),
                    },
                  ],
                ],
              },
            ],
            [
              Constants.BLOCK_CONTENT_COPY_AREA,
              {
                editorContentsLabel: __('Dot phrase', Constants.TEXT_DOMAIN),
                editorContentsPlaceholder: __(
                  'Enter dot phrase here...',
                  Constants.TEXT_DOMAIN,
                ),
              },
            ],
            [
              Constants.BLOCK_CONTENT_CONTAINER,
              {
                forceAttributes: {
                  [Constants.CORE_BLOCK_LIST]: {
                    [ListOverride.ATTR_HANGING_INDENT]: true,
                  }
                },
                template: [
                  [
                    Constants.BLOCK_HEADING,
                    {
                      mainTitle: __('Sources', Constants.TEXT_DOMAIN),
                      [Heading.ATTR_LEVEL]: Constants.HEADING_SIZE_MEDIUM,
                      [Heading.ATTR_OPTION_LEVEL]: false,
                      [Heading.ATTR_SHOW_PRE_TITLE]: false,
                      [Heading.ATTR_SHOW_POST_TITLE]: false,
                    },
                  ],
                  [
                    Constants.CORE_BLOCK_LIST,
                    {
                      [ListOverride.ATTR_HANGING_INDENT]: true,
                      placeholder: __(
                        'Enter dot phrase reference here...',
                        Constants.TEXT_DOMAIN,
                      ),
                    },
                  ],
                ],
              },
            ],
          ]}
        />
      </div>
    );
  },
  save({ attributes }) {
    return (
      <div
        {...useBlockProps.save({
          className: 'dot-phrase-detail',
        })}
      >
        <InnerBlocks.Content />
      </div>
    );
  },
});
