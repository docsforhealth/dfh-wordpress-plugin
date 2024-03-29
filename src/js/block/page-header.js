import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import _ from 'lodash';
import * as Constants from 'src/js/constants';
import { classNameAttribute } from 'src/js/utils';

/**
 * Page header for use on all pages, including a nested variant.
 */

const title = __('Page Header', Constants.TEXT_DOMAIN);

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_PAGE_HEADER, {
  apiVersion: 2,
  title,
  category: Constants.CATEGORY_LAYOUT,
  icon: 'schedule',
  description: __(
    'Header for a page including title and support for additional content',
    Constants.TEXT_DOMAIN,
  ),
  attributes: {
    className: { type: 'string' },
    template: { type: 'array' },
    hidePageTitleInEdit: { type: 'boolean', default: false },
    includePageTitle: { type: 'boolean', default: true },
    isNested: { type: 'boolean', default: false },
  },
  edit({ attributes }) {
    const headerTemplate = [];
    if (attributes.includePageTitle) {
      headerTemplate.push([
        Constants.BLOCK_INNER_BLOCK_WRAPPER,
        {
          wrapper: [
            { tagName: 'div', classNames: ['page-header__section'] },
            { tagName: 'h1', classNames: ['heading', 'heading--2'] },
            { tagName: 'span', classNames: ['heading__title'] },
          ],
          hideInEdit: attributes.hidePageTitleInEdit,
          showWrapperInEdit: true, // if showing in edit, need to show full preview
          isLocked: true,
          template: [[Constants.BLOCK_PAGE_TITLE]],
        },
      ]);
    }
    // template for additional content in the page header. Most often used for secondary
    // right-aligned content area; when used in this way, the template must define the proper
    // nesting classes: "page-header__section page-header__section--right"
    if (_.isArray(attributes.template)) {
      headerTemplate.push(...attributes.template);
    }
    return (
      <div {...useBlockProps({ className: wrapperClassName(attributes) })}>
        <InnerBlocks
          templateLock={Constants.INNER_BLOCKS_LOCKED}
          template={headerTemplate}
        />
      </div>
    );
  },
  save({ attributes }) {
    return (
      <div
        {...useBlockProps.save({
          className: wrapperClassName(attributes),
        })}
      >
        <InnerBlocks.Content />
      </div>
    );
  },
});

function wrapperClassName(attributes) {
  return classNameAttribute(
    'page-header',
    attributes.isNested ? 'page-header--nested' : '',
    attributes.className,
  );
}
