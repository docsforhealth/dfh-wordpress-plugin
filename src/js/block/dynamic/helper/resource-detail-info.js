import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import * as Constants from 'src/js/constants';
import TaxonomySelector from 'src/js/editor/taxonomy-selector';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_RESOURCE_DETAIL_INFO, {
  title: __('Resource Detail Info', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY_CUSTOM_DATA,
  icon: 'networking',
  description: __(
    'Title and category of a specific resource',
    Constants.TEXT_DOMAIN,
  ),
  supports: { inserter: false },
  // for dynamic blocks, see attributes in corresponding PHP file
  // see reasoning in `resource_detail_info.php`
  edit({ attributes, setAttributes }) {
    // Remove ability for users to change the label because we always want to be the default
    // "All resource" label
    return (
      <>
        <TaxonomySelector
          taxonomySlug={Constants.TAXONOMY_RESOURCE}
          allowMultiple={true}
        />
        <TaxonomySelector
          taxonomySlug={Constants.TAXONOMY_RESOURCE_TYPE}
          allowMultiple={true}
        />
      </>
    );
  },
  save() {
    return null;
  },
});
