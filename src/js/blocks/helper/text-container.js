import { __ } from '@wordpress/i18n';
import { Fragment } from 'react';
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

import * as Constants from '../../constants';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_TEXT_CONTAINER, {
  title: __('Text Container', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY,
  supports: { inserter: false },
  attributes: {
    template: {
      type: 'array',
      default: [[Constants.BLOCK_TITLE, {}], [Constants.BLOCK_TEXT, {}]],
    },
    isLocked: { type: 'boolean', default: false },
    wrapperElement: { type: 'string' },
    wrapperClassName: { type: 'string' },
  },
  edit({ attributes }) {
    const Wrapper = attributes.wrapperElement
      ? attributes.wrapperElement
      : Fragment;
    return (
      <Wrapper className={attributes.wrapperClassName}>
        <InnerBlocks
          allowedBlocks={[Constants.BLOCK_TITLE, Constants.BLOCK_TEXT]}
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
