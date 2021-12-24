import { registerBlockType } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import * as Constants from 'src/js/constants';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_PAGE_TITLE, {
  title: __('Page Title', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY_COMMON,
  icon: 'format-aside',
  description: __('Title for the current page', Constants.TEXT_DOMAIN),
  supports: { inserter: false },
  // for dynamic blocks, see attributes in corresponding PHP file
  // see reasoning in `page_taxonomy_filter.php`
  edit() {
    const currentPost = useSelect((select) =>
      select(Constants.STORE_EDITOR).getCurrentPost(),
    );
    return currentPost
      ? currentPost.title
      : __('Loading...', Constants.TEXT_DOMAIN);
  },
  save() {
    return null;
  },
});
