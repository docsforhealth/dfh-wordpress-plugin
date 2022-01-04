import { useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import {
  SelectControl,
  __experimentalNumberControl as NumberControl,
} from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import _ from 'lodash';
import * as Constants from 'src/js/constants';

/**
 * PURPOSE OF THIS BLOCK
 *
 * Display taxonomy values for user to multi-select, updates labels with info about number selected
 * if a label class name is provided
 */

// NOTE: attributes are in the corresponding PHP file in dynamic blocks as default attributes
// set in the JS file are not read -- to specify default values, you must use the
// `attributes` key in the PHP registration function

export const CONTEXT_CONTENT_TYPE_INFO = `${Constants.BLOCK_PAGE_TAXONOMY_FILTER}/contentTypeInfo`;

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
  usesContext: [CONTEXT_CONTENT_TYPE_INFO],
  // for dynamic blocks, see attributes in corresponding PHP file
  // see reasoning in `page_taxonomy_filter.php`
  edit(props) {
    console.log(
      'props.attributes.shouldUseContext',
      props.attributes.shouldUseContext,
    );
    if (props.attributes.shouldUseContext) {
      return <EditWithContext {...props} />;
    } else {
      return <EditNoContext {...props} />;
    }
  },
  save({ attributes }) {
    return null;
  },
});

const EditNoContext = function ({ attributes, setAttributes }) {
  return (
    <div {...useBlockProps()}>
      {attributes.taxonomyId && (
        <NumberControl
          label={__(
            'Max number of taxonomy items to show in filter',
            Constants.TEXT_DOMAIN,
          )}
          value={attributes.maxNumToShow}
          onChange={(maxNumToShow) => setAttributes({ maxNumToShow })}
          min={1}
          max={20}
        />
      )}
    </div>
  );
};

const EditWithContext = function ({ context, attributes, setAttributes }) {
  const info = context[CONTEXT_CONTENT_TYPE_INFO],
    hasAvailableTaxonomies = !_.isEmpty(info?.availableTaxonomies);
  // NOTE: we should be accessing the context directly from the PHP as documented in
  // https://developer.wordpress.org/block-editor/reference-guides/block-api/block-context/#php
  // BUT the context is never populated in the PHP render_callback as of WordPress 5.8.2
  useEffect(() => {
    if (!hasAvailableTaxonomies && attributes.taxonomyId) {
      setAttributes({ taxonomyId: '' });
    }
  });
  // NOTE: do NOT return null, must return SOMETHING from this edit hook
  return (
    <div {...useBlockProps()}>
      {hasAvailableTaxonomies && (
        <SelectControl
          label={__('Select a taxonomy to filter by', Constants.TEXT_DOMAIN)}
          value={attributes.taxonomyId}
          options={[
            {
              label: __('Do not show taxonomy filter', Constants.TEXT_DOMAIN),
              value: '',
              disabled: false, // also provide option to not have taxonomy filter too!
            },
            ..._.map(info.availableTaxonomies, (taxonomy) => ({
              label: taxonomy.name,
              value: taxonomy.slug,
            })),
          ]}
          onChange={(taxonomyId) => setAttributes({ taxonomyId })}
        />
      )}
      {hasAvailableTaxonomies && attributes.taxonomyId && (
        <NumberControl
          label={__(
            'Max number of taxonomy items to show in filter',
            Constants.TEXT_DOMAIN,
          )}
          value={attributes.maxNumToShow}
          onChange={(maxNumToShow) => setAttributes({ maxNumToShow })}
          min={1}
          max={20}
        />
      )}
    </div>
  );
};
