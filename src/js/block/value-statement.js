import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import placeholderImage from 'assets/images/placeholder-value.png';
import * as Heading from 'src/js/block/heading';
import * as Constants from 'src/js/constants';
import ImagePicker from 'src/js/editor/image-picker';

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
    const Description = (
        <div className="landing-value__description">
          <InnerBlocks
            templateLock={Constants.INNER_BLOCKS_LOCKED}
            template={[
              [
                Constants.BLOCK_CONTENT_CONTAINER,
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
      ),
      Image = (
        <div className="landing-value__image">
          <ImagePicker
            onSelect={({ url, alt }) =>
              setAttributes({ valueImage: url, valueImageAlt: alt })
            }
            url={attributes.valueImage}
            description={attributes.valueImageAlt}
          />
        </div>
      );
    return (
      <Fragment>
        <InspectorControls>
          <PanelBody
            title={__('Value Statement Settings', Constants.TEXT_DOMAIN)}
          >
            <ToggleControl
              label={__('Show image on left', Constants.TEXT_DOMAIN)}
              checked={attributes.reverse}
              onChange={(reverse) => setAttributes({ reverse })}
            />
          </PanelBody>
        </InspectorControls>
        <div className="dfh-editor-block-title">{title}</div>
        <div className={`landing-value ${buildClassName(attributes)}`}>
          {attributes.reverse ? (
            <Fragment>
              {Image}
              {Description}
            </Fragment>
          ) : (
            <Fragment>
              {Description}
              {Image}
            </Fragment>
          )}
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
