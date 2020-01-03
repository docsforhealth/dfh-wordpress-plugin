import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { select } from '@wordpress/data';

import * as Constants from '../../../constants';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_PAGE_TITLE, {
  title: __('Page Title', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY,
  icon: 'format-aside',
  description: __('Title for the current page', Constants.TEXT_DOMAIN),
  supports: { inserter: false },
  edit() {
    const currentPost = select(Constants.STORE_EDITOR).getCurrentPost();
    return currentPost ? currentPost.title : '';
  },
  save() {
    return null;
  },
});
