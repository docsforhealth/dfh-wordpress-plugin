import { __ } from '@wordpress/i18n';
import { Fragment } from 'react';
import { registerBlockType } from '@wordpress/blocks';
import { RichText } from '@wordpress/block-editor';

import * as Constants from '../../constants';
import LinkPicker from '../../editor/link-picker';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_RESOURCE_DETAIL_INFO, {
  title: __('Resource Detail Info', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY,
  supports: { inserter: false },
  edit({ attributes, setAttributes }) {
    return (
      <Fragment>
        <RichText
          tagName="a"
          className="link editor-is-clickable"
          value={attributes.allResourcesLabel}
          placeholder={__(
            'Enter all resources label here',
            Constants.TEXT_DOMAIN,
          )}
          onChange={allResourcesLabel => setAttributes({ allResourcesLabel })}
          multiline={false}
          withoutInteractiveFormatting={true}
        />
        <LinkPicker
          url={attributes.allResourcesUrl}
          title={attributes.allResourcesTitle}
          onChange={({ url, title }) =>
            setAttributes({ allResourcesUrl: url, allResourcesTitle: title })
          }
        />
      </Fragment>
    );
  },
  save() {
    return null;
  },
});
