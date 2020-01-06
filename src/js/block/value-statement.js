import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { ToggleControl, PanelBody } from '@wordpress/components';

import * as Constants from '../constants';
import * as Heading from './heading';
import ImagePicker from '../editor/image-picker';
import placeholderImage from '../../../assets/images/placeholder-value.png';

const title = __('Value Statement', Constants.TEXT_DOMAIN);

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(`${Constants.NAMESPACE}/value-statement`, {
  title,
  category: Constants.CATEGORY_LANDING,
  icon: 'heart',
  description: __(
    'Statement accompanied by an illustration',
    Constants.TEXT_DOMAIN,
  ),
  attributes: {
    reverse: { type: 'boolean', default: false },
    valueImage: { type: 'string', default: placeholderImage },
    valueImageAlt: {
      type: 'string',
      default: __('Value illustration', Constants.TEXT_DOMAIN),
    },
  },
  edit({ attributes, setAttributes }) {
    return (
      <Fragment>
        <InspectorControls>
          <PanelBody
            title={__('Value Statement Settings', Constants.TEXT_DOMAIN)}
          >
            <ToggleControl
              label={__('Show image on left', Constants.TEXT_DOMAIN)}
              checked={attributes.reverse}
              onChange={reverse => setAttributes({ reverse })}
            />
          </PanelBody>
        </InspectorControls>
        <div className="dfh-editor-block-title">{title}</div>
        <div className={`landing-value ${buildClassName(attributes)}`}>
          <div className="landing-value__description">
            <InnerBlocks
              templateLock={Constants.INNER_BLOCKS_LOCKED}
              template={[
                [
                  Constants.BLOCK_TEXT_CONTAINER,
                  {
                    forceAttributes: {
                      [Constants.BLOCK_HEADING]: {
                        [Heading.ATTR_LEVEL]: Constants.HEADING_SIZE_LARGE,
                        [Heading.ATTR_OPTION_LEVEL]: false,
                      },
                    },
                  },
                ],
              ]}
            />
          </div>
          <div className="landing-value__image">
            <ImagePicker
              onSelect={({ url, alt }) =>
                setAttributes({ valueImage: url, valueImageAlt: alt })
              }
              url={attributes.valueImage}
              description={attributes.valueImageAlt}
            />
          </div>
        </div>
      </Fragment>
    );
  },
  save({ attributes }) {
    return (
      <div className={`landing-value ${buildClassName(attributes)}`}>
        <div className="landing-value__description">
          <InnerBlocks.Content />
        </div>
        <div className="landing-value__image">
          <ImagePicker.Content
            url={attributes.valueImage}
            description={attributes.valueImageAlt}
          />
        </div>
      </div>
    );
  },
});

function buildClassName(attributes) {
  return attributes.reverse ? 'landing-value--reversed' : '';
}
