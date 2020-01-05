import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

import * as Constants from '../../constants';
import RecursiveWrapper from '../../editor/recursive-wrapper';
import WrapOnlyIfHasClass from '../../editor/wrap-only-if-has-class';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_INNER_BLOCK_WRAPPER, {
  title: __('Inner Block Wrapper', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY_COMMON,
  icon: 'grid-view',
  description: __(
    'Enables wrapping other blocks in custom elements',
    Constants.TEXT_DOMAIN,
  ),
  supports: { inserter: false },
  attributes: {
    allowedBlocks: { type: 'array' },
    template: { type: 'array' },
    isLocked: { type: 'boolean', default: false },
    hideInEdit: { type: 'boolean', default: false },
    wrapperElements: { type: 'array', default: ['div'] },
    wrapperClassNames: { type: 'array', default: [''] },
  },
  edit({ attributes }) {
    return (
      <WrapOnlyIfHasClass
        className={attributes.hideInEdit ? 'dfh-editor-hide' : ''}
      >
        <RecursiveWrapper
          elements={attributes.wrapperElements}
          classNames={attributes.wrapperClassNames}
        >
          <InnerBlocks
            allowedBlocks={attributes.allowedBlocks}
            template={attributes.template}
            templateLock={
              attributes.isLocked
                ? Constants.INNER_BLOCKS_LOCKED
                : Constants.INNER_BLOCKS_UNLOCKED
            }
          />
        </RecursiveWrapper>
      </WrapOnlyIfHasClass>
    );
  },
  save({ attributes }) {
    return (
      <RecursiveWrapper
        elements={attributes.wrapperElements}
        classNames={attributes.wrapperClassNames}
      >
        <InnerBlocks.Content />
      </RecursiveWrapper>
    );
  },
});
