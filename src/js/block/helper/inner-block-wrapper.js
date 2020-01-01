import { __ } from '@wordpress/i18n';
import { Fragment } from 'react';
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

import * as Constants from '../../constants';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_INNER_BLOCK_WRAPPER, {
  title: __('Inner Block Wrapper', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY,
  supports: { inserter: false },
  attributes: {
    allowedBlocks: { type: 'array' },
    template: { type: 'array' },
    isLocked: { type: 'boolean', default: false },
    wrapperElement: { type: 'string' },
    wrapperClassName: { type: 'string', default: '' },
  },
  edit({ attributes }) {
    const Wrapper = attributes.wrapperElement
      ? attributes.wrapperElement
      : Fragment;
    return (
      <Wrapper className={attributes.wrapperClassName}>
        <InnerBlocks
          allowedBlocks={attributes.allowedBlocks}
          template={attributes.template}
          templateLock={
            attributes.isLocked
              ? Constants.INNER_BLOCKS_LOCKED
              : Constants.INNER_BLOCKS_UNLOCKED
          }
        />
      </Wrapper>
    );
  },
  save({ attributes }) {
    const Wrapper = attributes.wrapperElement
      ? attributes.wrapperElement
      : Fragment;
    return (
      <Wrapper className={attributes.wrapperClassName}>
        <InnerBlocks.Content />
      </Wrapper>
    );
  },
});
