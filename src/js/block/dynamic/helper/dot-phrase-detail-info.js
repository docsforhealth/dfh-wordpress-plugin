import { useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import * as Constants from 'src/js/constants';

registerBlockType(Constants.BLOCK_PAGE_DOT_PHRASE_DETAIL_INFO, {
  apiVersion: 2,
  title: __('Dot Phrase Detail Info', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY_DOT_PHRASE,
  icon: 'format-status',
  description: __(
    'Title and taxonomies for a specific dot phrase',
    Constants.TEXT_DOMAIN,
  ),
  supports: { inserter: false },
  // for dynamic blocks, see attributes in corresponding PHP file
  // see reasoning in `dot_phrase_detail.php`
  edit() {
    return <div {...useBlockProps()}></div>;
  },
  save() {
    return null;
  },
});
