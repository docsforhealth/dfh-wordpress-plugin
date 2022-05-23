import { useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import merge from 'lodash.merge';
import { Edit, Save, SHARED_CONFIG } from 'src/js/block/shared/button';
import * as Constants from 'src/js/constants';
import FilePicker from 'src/js/editor/file-picker';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(
  Constants.BLOCK_FILE_BUTTON,
  merge({}, SHARED_CONFIG, {
    apiVersion: 2,
    title: __('File Button', Constants.TEXT_DOMAIN),
    icon: 'category',
    description: __('Button that points to a file', Constants.TEXT_DOMAIN),
    edit({ attributes, setAttributes }) {
      return (
        <Edit
          {...useBlockProps()}
          attributes={attributes}
          setAttributes={setAttributes}
        >
          {(props) => <FilePicker {...props} />}
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
