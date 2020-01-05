import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { SelectControl } from '@wordpress/components';

import * as Constants from '../../../constants';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_RESOURCE_CATEGORY_FILTER, {
  title: __('Resource Category Filter', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY_RESOURCE,
  icon: 'filter',
  description: __(
    'Filter buttons for selecting which resource categories to show',
    Constants.TEXT_DOMAIN,
  ),
  supports: { inserter: false },
  edit({ attributes, setAttributes }) {
    const opts = _.range(1, 13).map(num => {
      return { value: String(num), label: String(num) };
    });
    return (
      <SelectControl
        label={__(
          'Max number of categories to show in filter',
          Constants.TEXT_DOMAIN,
        )}
        value={attributes.maxNumToShow}
        onChange={maxNumToShow => setAttributes({ maxNumToShow })}
        options={[
          {
            value: null,
            label: 'Select a max number of categories',
            disabled: true,
          },
          ...opts,
        ]}
      />
    );
  },
  save() {
    return null;
  },
});
