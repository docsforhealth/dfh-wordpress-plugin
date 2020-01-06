import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { registerBlockType } from '@wordpress/blocks';
import { TextControl } from '@wordpress/components';

import * as Constants from '../../constants';

const title = __('Resource Overview', Constants.TEXT_DOMAIN);

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(`${Constants.NAMESPACE}/resource-overview`, {
  title,
  category: Constants.CATEGORY_LANDING,
  icon: 'index-card',
  description: __(
    'All resource categories with examples of each',
    Constants.TEXT_DOMAIN,
  ),
  supports: { multiple: false },
  edit({ attributes, setAttributes }) {
    return (
      <Fragment>
        <div className="dfh-editor-block-title">{title}</div>
        <TextControl
          label={__('All resources button label', Constants.TEXT_DOMAIN)}
          help={__(
            'Label for the button in each category to go to the resource overview page',
            Constants.TEXT_DOMAIN,
          )}
          value={attributes.allResourcesLabel}
          onChange={allResourcesLabel => setAttributes({ allResourcesLabel })}
        />
      </Fragment>
    );
  },
  save() {
    return null;
  },
});
