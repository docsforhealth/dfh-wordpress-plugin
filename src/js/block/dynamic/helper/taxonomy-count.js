import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { TextControl, PanelBody } from '@wordpress/components';
import { withSelect } from '@wordpress/data';

import * as Constants from '../../../constants';
import { fetchTaxonomyDetails } from '../../../utils';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(`${Constants.NAMESPACE}/taxonomy-count`, {
  title: __('Taxonomy Count', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY_COMMON,
  icon: 'image-filter',
  description: __(
    'Count with quantifier for given taxonomy ID',
    Constants.TEXT_DOMAIN,
  ),
  // use the `withSelect` HOC for appropriate updating when selecting from Wordpress data stores
  // using `useSelect` in the `render` method returns a React error
  edit: withSelect((select, { attributes }) => {
    return {
      terms: select(Constants.STORE_CORE).getEntityRecords(
        'taxonomy',
        attributes.taxonomyId,
      ),
    };
  })(
    // `edit` just needs to return a React component, whether function or class
    // here we need to use a class component because we need to store internal `state`
    // see https://github.com/bigbite/gutenberg-postlist-demo/blob/master/src/block/block.js#L59
    class extends Component {
      constructor() {
        super(...arguments);
        this.state = { singularName: '', pluralName: '' };
      }
      render() {
        const { attributes, setAttributes, terms } = this.props;
        const { singularName, pluralName } = this.state;
        fetchTaxonomyDetails(attributes.taxonomyId).then(({ labels }) => {
          if (labels) {
            if (this.state.singularName !== labels.singular_name) {
              this.setState({ singularName: labels.singular_name });
            }
            if (this.state.pluralName !== labels.name) {
              this.setState({ pluralName: labels.name });
            }
          }
        });
        return (
          <Fragment>
            <InspectorControls>
              <PanelBody
                title={__('Taxonomy Count Settings', Constants.TEXT_DOMAIN)}
              >
                <TextControl
                  label={__('Taxonomy ID', Constants.TEXT_DOMAIN)}
                  help={__(
                    'ID of the taxonomy to display count for',
                    Constants.TEXT_DOMAIN,
                  )}
                  value={attributes.taxonomyId}
                  onChange={taxonomyId => setAttributes({ taxonomyId })}
                />
              </PanelBody>
            </InspectorControls>
            {buildQuantityString(terms, singularName, pluralName)}
          </Fragment>
        );
      }
    },
  ),
  save() {
    return null;
  },
});

function buildQuantityString(terms, singularName, pluralName) {
  if (terms && singularName && pluralName) {
    const quantifier = terms.length === 1 ? singularName : pluralName;
    return `${terms.length} ${quantifier.toLowerCase()}`;
  } else {
    return __('Loading...', Constants.TEXT_DOMAIN);
  }
}
