import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import _ from 'lodash';
import * as Constants from 'src/js/constants';

/**
 * PURPOSE OF THIS BLOCK
 *
 * Page header for use on all pages, including a nested variant.
 */

const title = __('Page Header', Constants.TEXT_DOMAIN);

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_PAGE_HEADER, {
  title,
  category: Constants.CATEGORY_LAYOUT,
  icon: 'schedule',
  description: __(
    'Header for a page including title and support for additional content',
    Constants.TEXT_DOMAIN,
  ),
  attributes: {
    template: { type: 'array' },
    isLocked: { type: 'boolean', default: false },
    hideBlockTitleInEdit: { type: 'boolean', default: false },
    hideInnerBlocksInEdit: { type: 'boolean', default: false },
    includePageTitle: { type: 'boolean', default: true },
    isNested: { type: 'boolean', default: false },
  },
  edit({ attributes }) {
    const headerTemplate = attributes.includePageTitle
      ? [
          Constants.BLOCK_INNER_BLOCK_WRAPPER,
          {
            wrapperElements: ['div', 'h1', 'span'],
            wrapperClassNames: [
              'page-header__section',
              'heading heading--2',
              'heading__title',
            ],
            isLocked: true,
            template: [[Constants.BLOCK_PAGE_TITLE]],
          },
        ]
      : [];
    // template for additional content in the page header. Most often used for secondary
    // right-aligned content area; when used in this way, the template must define the proper
    // nesting classes: "page-header__section page-header__section--right"
    if (_.isArray(attributes.template)) {
      headerTemplate.push(...attributes.template);
    }
    return (
      <Fragment>
        {!attributes.hideBlockTitleInEdit && (
          <div className="dfh-editor-block-title">{title}</div>
        )}
        <div className={buildWrapperClass(attributes.isNested)}>
          <InnerBlocks
            templateLock={Constants.INNER_BLOCKS_LOCKED}
            template={headerTemplate}
          />
        </div>
      </Fragment>
    );
  },
  save({ attributes }) {
    return (
      <div className={buildWrapperClass(attributes.isNested)}>
        <InnerBlocks.Content />
      </div>
    );
  },
});

function buildWrapperClass(isNested) {
  return isNested ? 'page-header page-header--nested' : 'page-header';
}
