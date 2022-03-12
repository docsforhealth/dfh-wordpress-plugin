import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import * as Constants from 'src/js/constants';
import AutoLabelAppender from 'src/js/editor/auto-label-appender';

const title = __('Content Width Container', Constants.TEXT_DOMAIN);

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(`${Constants.NAMESPACE}/content-width-container`, {
  title,
  category: Constants.CATEGORY_LAYOUT,
  icon: 'grid-view',
  description: __(
    'Ensures appropriate horizontal spacing and width of content of any type',
    Constants.TEXT_DOMAIN,
  ),
  attributes: {
    isNarrow: { type: 'boolean', default: false },
  },
  edit({ attributes, setAttributes }) {
    // Do not apply `container` classes in the editor because of limited width
    return (
      <Fragment>
        <InspectorControls>
          <PanelBody
            title={__('Content Container Settings', Constants.TEXT_DOMAIN)}
          >
            <ToggleControl
              label={__('Is narrow width?', Constants.TEXT_DOMAIN)}
              checked={attributes.isNarrow}
              onChange={(isNarrow) => setAttributes({ isNarrow })}
            />
          </PanelBody>
        </InspectorControls>
        <div className="dfh-editor-block-title">{title}</div>
        <InnerBlocks
          templateLock={false}
          renderAppender={() => <AutoLabelAppender deemphasized={true} />}
        />
      </Fragment>
    );
  },
  save({ attributes }) {
    return (
      <div
        className={`container container--user-content ${buildClassName(
          attributes,
        )}`}
      >
        <InnerBlocks.Content />
      </div>
    );
  },
});

function buildClassName(attributes) {
  return attributes.isNarrow ? 'container--narrow' : '';
}
