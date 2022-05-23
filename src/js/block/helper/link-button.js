import { useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import merge from 'lodash.merge';
import { Edit, Save, SHARED_CONFIG } from 'src/js/block/shared/button';
import * as Constants from 'src/js/constants';
import LinkPicker from 'src/js/editor/link-picker';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(
  Constants.BLOCK_LINK_BUTTON,
  merge({}, SHARED_CONFIG, {
    apiVersion: 2,
    title: __('Link Button', Constants.TEXT_DOMAIN),
    icon: 'admin-links',
    description: __(
      'Button that points to a link, whether internal or external',
      Constants.TEXT_DOMAIN,
    ),
    edit({ attributes, setAttributes }) {
      return (
        <Edit
          {...useBlockProps()}
          attributes={attributes}
          setAttributes={setAttributes}
        >
          {(props) => <LinkPicker {...props} />}
        </Edit>
      );
    },
    save({ attributes }) {
      return (
        <Save {...useBlockProps.save()} attributes={attributes} openInNewTab />
      );
    },
  }),
);
