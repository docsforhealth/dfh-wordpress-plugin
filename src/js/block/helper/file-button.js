import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

import * as Constants from '../../constants';
import * as SharedButton from '../shared/button';
import FilePicker from '../../editor/file-picker';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_FILE_BUTTON, {
  ...SharedButton.config,
  title: __('File Button', Constants.TEXT_DOMAIN),
  edit(props) {
    return SharedButton.buildButtonEdit(props, FilePicker);
  },
  save(props) {
    return SharedButton.buildButtonSave(props, { openInNewTab: true });
  },
});
