import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import _ from 'lodash';
import * as Constants from 'src/js/constants';

// An overview of how to override a block using filters
//    see https://css-tricks.com/a-crash-course-in-wordpress-block-filters/
// WP list block: https://github.com/WordPress/gutenberg/tree/trunk/packages/block-library/src/list

const OVERRIDE_BLOCK_NAME = Constants.CORE_BLOCK_LIST;

export const ATTR_HANGING_INDENT = 'hasHangingIndent';

// 1. Add reference list prop to attributes
addFilter(
  'blocks.registerBlockType',
  `${Constants.NAMESPACE}/block-core-list/add-reference-mode-attribute`,
  (settings, name) => {
    if (name !== OVERRIDE_BLOCK_NAME) {
      return settings;
    }
    return _.assign({}, settings, {
      attributes: _.assign({}, settings.attributes, {
        [ATTR_HANGING_INDENT]: {
          type: 'boolean',
          default: false,
        },
      }),
    });
  },
);

// 2. Add inspector toolbar button
addFilter(
  'editor.BlockEdit',
  `${Constants.NAMESPACE}/block-core-list/add-block-toolbar-button`,
  createHigherOrderComponent((BlockEdit) => {
    return (props) => {
      const { name, attributes, setAttributes } = props;
      if (name !== OVERRIDE_BLOCK_NAME) {
        return <BlockEdit {...props} />;
      }
      return (
        <>
          <BlockEdit {...props} />
          <InspectorControls>
            <PanelBody
              title={__('Indentation Settings', Constants.TEXT_DOMAIN)}
            >
              <ToggleControl
                label={__('Enable hanging indent?', Constants.TEXT_DOMAIN)}
                checked={attributes[ATTR_HANGING_INDENT]}
                onChange={(isIndented) =>
                  setAttributes({ [ATTR_HANGING_INDENT]: isIndented })
                }
              />
            </PanelBody>
          </InspectorControls>
        </>
      );
    };
  }, 'withReferenceBlockToolbar'),
);

// 3. Add class to block wrapper in edit more
addFilter(
  'editor.BlockListBlock',
  `${Constants.NAMESPACE}/block-core-list/add-edit-mode-class`,
  createHigherOrderComponent((BlockListBlock) => {
    return (props) => {
      const { name, attributes, className = '' } = props;
      if (name !== OVERRIDE_BLOCK_NAME) {
        return <BlockListBlock {...props} />;
      }
      return (
        <BlockListBlock
          {...props}
          className={`${className} ${buildAdditionalClasses(
            attributes[ATTR_HANGING_INDENT],
          )}`}
        />
      );
    };
  }, 'withReferenceClass'),
);

// 4. Add class to block wrapper in save mode
addFilter(
  'blocks.getSaveContent.extraProps',
  `${Constants.NAMESPACE}/block-core-list/add-save-mode-class`,
  (props, block, attributes) => {
    if (block.name !== OVERRIDE_BLOCK_NAME) {
      return props;
    }
    return _.assign({}, props, {
      className: `${props.className ?? ''} ${buildAdditionalClasses(
        attributes[ATTR_HANGING_INDENT],
      )}`,
    });
  },
);

// Helpers
// -------

function buildAdditionalClasses(isHanging) {
  return `list ${isHanging ? 'list--hanging-indent' : ''}`;
}
