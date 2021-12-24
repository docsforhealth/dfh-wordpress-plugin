import { useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import {
  SelectControl,
  __experimentalNumberControl as NumberControl,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import _ from 'lodash';
import * as Constants from 'src/js/constants';

/**
 * PURPOSE OF THIS BLOCK
 *
 * Display taxonomy values for user to multi-select, updates labels with info about number selected
 * if a label class name is provided
 */

// Define attributes in the corresponding PHP file in dynamic blocks as default attributes
// set in the JS file are not read -- to specify default values, you must use the
// `attributes` key in the PHP registration function

registerBlockType(Constants.BLOCK_PAGE_TAXONOMY_FILTER, {
  apiVersion: 2,
  title: __('Page Taxonomy Filter', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY_LAYOUT,
  icon: 'image-filter',
  description: __(
    'Displays terms from the selected taxonomy that modifies the associated ajaxloadmore instance',
    Constants.TEXT_DOMAIN,
  ),
  supports: { inserter: false },
  // for dynamic blocks, see attributes in corresponding PHP file
  // see reasoning in `page_taxonomy_filter.php`
  edit({ attributes, setAttributes }) {
    // TODO can filter returned taxonomies by selected content type???
    // best practices for `useSelect` https://jsnajdr.wordpress.com/2021/01/22/some-best-practices-for-using-useselect-from-wordpress-data/
    // TIP: to debug wp-data, you can call `wp.data.select` in the console
    const taxonomies = useSelect((select) =>
      _.map(select(Constants.STORE_CORE).getTaxonomies(), (taxonomy) => ({
        label: taxonomy.name,
        value: taxonomy.slug,
      })),
    );
    // TODO multi-select of categories to show vs specifying max number of items to show
    return (
      <div {...useBlockProps()}>
        <SelectControl
          label={__('Select taxonomy', Constants.TEXT_DOMAIN)}
          value={attributes.taxonomyId}
          options={[
            {
              label: __(
                'Select a taxonomy to filter by',
                Constants.TEXT_DOMAIN,
              ),
              value: null,
              disabled: true,
            },
            ...taxonomies,
          ]}
          onChange={(taxonomyId) => setAttributes({ taxonomyId })}
        />
        <NumberControl
          label={__(
            'Max number of items to show in filter',
            Constants.TEXT_DOMAIN,
          )}
          value={attributes.maxNumToShow}
          onChange={(maxNumToShow) => setAttributes({ maxNumToShow })}
          min={1}
          max={12}
        />
      </div>
    );
  },
  save({ attributes }) {
    return null;
  },
});
