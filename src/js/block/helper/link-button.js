import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

import * as Constants from '../../constants';
import * as SharedButton from '../shared/button';
import LinkPicker from '../../editor/link-picker';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_LINK_BUTTON, {
  ...SharedButton.config,
  title: __('Link Button', Constants.TEXT_DOMAIN),
  icon: 'admin-links',
  description: __(
    'Button that points to a link, whether internal or external',
    Constants.TEXT_DOMAIN,
  ),
  edit(props) {
    return SharedButton.buildButtonEdit(props, LinkPicker);
  },
  save(props) {
    return SharedButton.buildButtonSave(props);
  },
});
