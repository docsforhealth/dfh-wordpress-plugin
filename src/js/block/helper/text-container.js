import _ from 'lodash';
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

import * as Constants from '../../constants';
import WithInnerBlockAttrs from '../../editor/with-inner-block-attrs';
import { handleForceAllAttrs } from '../../utils';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_TEXT_CONTAINER, {
  title: __('Text Container', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY,
  icon: 'media-text',
  description: __(
    'Allows adding of various text-based blocks',
    Constants.TEXT_DOMAIN,
  ),
  supports: { inserter: false },
  attributes: {
    template: {
      type: 'array',
      default: [[Constants.BLOCK_HEADING, {}], [Constants.BLOCK_TEXT, {}]],
    },
    isLocked: { type: 'boolean', default: false },
    onlyText: { type: 'boolean', default: false },
    forceAttributes: { type: 'object' },
  },
  edit({ attributes, clientId }) {
    const allowedBlockNames = attributes.onlyText
      ? [Constants.BLOCK_TEXT]
      : [Constants.BLOCK_HEADING, Constants.BLOCK_TEXT];
    return (
      <WithInnerBlockAttrs
        clientId={clientId}
        innerBlockAttrs={handleForceAllAttrs(
          allowedBlockNames,
          attributes.forceAttributes,
        )}
      >
        <InnerBlocks
          allowedBlocks={allowedBlockNames}
          template={filterTemplateIfOnlyText(attributes)}
          templateLock={
            attributes.isLocked
              ? Constants.INNER_BLOCKS_LOCKED
              : Constants.INNER_BLOCKS_UNLOCKED
          }
        />
      </WithInnerBlockAttrs>
    );
  },
  save() {
    return <InnerBlocks.Content />;
  },
});

function filterTemplateIfOnlyText(attributes) {
  return attributes.onlyText
    ? _.filter(attributes.template, spec => spec[0] == Constants.BLOCK_TEXT)
    : attributes.template;
}
