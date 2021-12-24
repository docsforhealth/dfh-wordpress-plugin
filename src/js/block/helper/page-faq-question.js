import { useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import * as Constants from 'src/js/constants';

// TODO

registerBlockType(Constants.BLOCK_FAQ_QUESTION, {
  apiVersion: 2,
  title: __('Page FAQ Question', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY_LAYOUT,
  // icon: '', // TODO
  description: __('', Constants.TEXT_DOMAIN), // TODO
  edit({ attributes, setAttributes }) {
    return <div {...useBlockProps()}></div>;
  },
  save({ attributes }) {
    return <div {...useBlockProps.save()}></div>;
  },
});
