import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import * as Constants from 'src/js/constants';
import AutoLabelAppender from 'src/js/editor/auto-label-appender';
import WithInnerBlockAttrs from 'src/js/editor/with-inner-block-attrs';
import { filterInnerBlockTemplate } from 'src/js/utils';

/**
 * To be used as part of the template attribute of InnerBlocks in order to specify a container in
 * which users are only able to insert text and media content and not other arbitrary blocks.
 * Because ths blocks restricts users to only inserting "content" -- that is text and media -- this
 * bock is called a "Content Container."
 *
 * Also supports the ability to force the nested child blocks to have certain attributes
 */

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_CONTENT_CONTAINER, {
  title: __('Content Container', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY_COMMON,
  icon: 'media-document',
  description: __(
    'Allows adding of various text and media content blocks',
    Constants.TEXT_DOMAIN,
  ),
  supports: { inserter: false },
  attributes: {
    title: { type: 'string' },
    template: {
      type: 'array',
      default: [[Constants.BLOCK_HEADING], [Constants.BLOCK_TEXT]],
    },
    isLocked: { type: 'boolean', default: false },
    // If `true` then users will not be able to insert in Heading blocks and can only insert
    // text and media.
    noHeadings: { type: 'boolean', default: false },
    forceAttributes: { type: 'object' },
  },
  edit({ attributes, clientId }) {
    // For allowed core blocks, see `src/js/allow-only-custom-blocks.js`
    const alwaysAllowed = [
      Constants.BLOCK_TEXT,
      Constants.BLOCK_VIDEO_THUMBNAIL,

      Constants.CORE_BLOCK_LIST,
      Constants.CORE_BLOCK_QUOTE,

      Constants.CORE_BLOCK_COLUMNS,
      Constants.CORE_BLOCK_SEPARATOR,
      Constants.CORE_BLOCK_TABLE,

      // NOTE Wordpress 5.2 bug prevents core/video block from working if isLocked
      // see https://github.com/WordPress/gutenberg/issues/19311#issue-541875999
      Constants.CORE_BLOCK_AUDIO,
      Constants.CORE_BLOCK_EMBED,
      Constants.CORE_BLOCK_GALLERY,
      Constants.CORE_BLOCK_IMAGE,
      Constants.CORE_BLOCK_VIDEO,

      // NOTE core media blocks will transform into `core/embed` block after processing
      ...Constants.CORE_EMBED_BLOCKS,
    ];
    const allowedBlockNames = attributes.noHeadings
      ? alwaysAllowed
      : [...alwaysAllowed, Constants.BLOCK_HEADING];
    return (
      <WithInnerBlockAttrs
        clientId={clientId}
        innerBlockAttrs={attributes.forceAttributes}
      >
        {attributes.title && (
          <div className="dfh-editor-block-title dfh-editor-block-title--nested">
            {attributes.title}
          </div>
        )}
        <InnerBlocks
          allowedBlocks={allowedBlockNames}
          template={filterInnerBlockTemplate(
            allowedBlockNames,
            attributes.template,
          )}
          templateLock={
            attributes.isLocked
              ? Constants.INNER_BLOCKS_LOCKED
              : Constants.INNER_BLOCKS_UNLOCKED
          }
          renderAppender={() => (
            <AutoLabelAppender
              deemphasized={true}
              label={__('Add more content', Constants.TEXT_DOMAIN)}
            />
          )}
        />
      </WithInnerBlockAttrs>
    );
  },
  save() {
    return <InnerBlocks.Content />;
  },
});
