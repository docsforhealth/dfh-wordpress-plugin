import { useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import * as Constants from 'src/js/constants';
import TaxonomySelector from 'src/js/editor/taxonomy-selector';

registerBlockType(Constants.BLOCK_PAGE_DOT_PHRASE_DETAIL_INFO, {
  apiVersion: 2,
  title: __('Dot Phrase Detail Info', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY_CUSTOM_DATA,
  icon: 'format-status',
  description: __(
    'Title and taxonomies for a specific dot phrase',
    Constants.TEXT_DOMAIN,
  ),
  supports: { inserter: false },
  // for dynamic blocks, see attributes in corresponding PHP file
  // see reasoning in `dot_phrase_detail.php`
  edit() {
    return (
      <div {...useBlockProps()}>
        <TaxonomySelector
          className="taxonomy-selector--bottom-border"
          taxonomySlug={Constants.TAXONOMY_DOT_PHRASE_CATEGORY}
          allowMultiple={true}
        />
      </div>
    );
  },
});
