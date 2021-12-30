import { InspectorControls, RichText } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import {
  PanelBody,
  RadioControl,
  TextControl,
  ToggleControl,
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import * as Constants from 'src/js/constants';

export const ATTR_LEVEL = 'level';
export const ATTR_SHOW_PRE_TITLE = 'showPreTitle';
export const ATTR_SHOW_POST_TITLE = 'showPostTitle';
export const ATTR_HIGHLIGHT_MAIN_TITLE = 'highlightMainTitle';

export const ATTR_OPTION_LEVEL = 'showOptionLevel';
export const ATTR_OPTION_SHOW_PRE_TITLE = 'showOptionShowPreTitle';
export const ATTR_OPTION_SHOW_POST_TITLE = 'showOptionShowPostTitle';
export const ATTR_OPTION_HIGHLIGHT_MAIN_TITLE = 'showOptionHighlightMainTitle';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_HEADING, {
  title: __('Heading', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY_COMMON,
  // not listed in Dashicon page, but documented at https://iconify.design/icon-sets/dashicons/
  icon: 'heading',
  description: __('Titles of varying sizes', Constants.TEXT_DOMAIN),
  attributes: {
    mainTitle: { type: 'string' },
    preTitle: { type: 'string' },
    postTitle: { type: 'string' },
    className: { type: 'string', default: '' },
    customId: { type: 'string' },

    [ATTR_LEVEL]: {
      type: 'string',
      default: Constants.HEADING_SIZE_LARGE,
    },
    [ATTR_SHOW_PRE_TITLE]: { type: 'boolean', default: true },
    [ATTR_SHOW_POST_TITLE]: { type: 'boolean', default: true },
    [ATTR_HIGHLIGHT_MAIN_TITLE]: { type: 'boolean', default: true },

    [ATTR_OPTION_LEVEL]: { type: 'boolean', default: true },
    [ATTR_OPTION_SHOW_PRE_TITLE]: { type: 'boolean', default: true },
    [ATTR_OPTION_SHOW_POST_TITLE]: { type: 'boolean', default: true },
    [ATTR_OPTION_HIGHLIGHT_MAIN_TITLE]: { type: 'boolean', default: true },
  },
  edit({ attributes, setAttributes }) {
    const TitleTag = `h${attributes[ATTR_LEVEL]}`;
    return (
      <Fragment>
        <InspectorControls>
          <PanelBody title={__('Heading Settings', Constants.TEXT_DOMAIN)}>
            {attributes[ATTR_OPTION_LEVEL] && (
              <RadioControl
                label={__('Size', Constants.TEXT_DOMAIN)}
                selected={attributes[ATTR_LEVEL]}
                options={[
                  {
                    label: __('Extra large', Constants.TEXT_DOMAIN),
                    value: Constants.HEADING_SIZE_XLARGE,
                  },
                  {
                    label: __('Large', Constants.TEXT_DOMAIN),
                    value: Constants.HEADING_SIZE_LARGE,
                  },
                  {
                    label: __('Medium', Constants.TEXT_DOMAIN),
                    value: Constants.HEADING_SIZE_MEDIUM,
                  },
                  {
                    label: __('Small', Constants.TEXT_DOMAIN),
                    value: Constants.HEADING_SIZE_SMALL,
                  },
                ]}
                onChange={(level) => setAttributes({ [ATTR_LEVEL]: level })}
              />
            )}
            {attributes[ATTR_OPTION_SHOW_PRE_TITLE] && (
              <ToggleControl
                label={__('Show pre-title?', Constants.TEXT_DOMAIN)}
                checked={attributes[ATTR_SHOW_PRE_TITLE]}
                onChange={(showPreTitle) =>
                  setAttributes({ [ATTR_SHOW_PRE_TITLE]: showPreTitle })
                }
              />
            )}
            {attributes[ATTR_OPTION_SHOW_POST_TITLE] && (
              <ToggleControl
                label={__('Show post-title?', Constants.TEXT_DOMAIN)}
                checked={attributes[ATTR_SHOW_POST_TITLE]}
                onChange={(showPostTitle) =>
                  setAttributes({ [ATTR_SHOW_POST_TITLE]: showPostTitle })
                }
              />
            )}
            {attributes[ATTR_OPTION_HIGHLIGHT_MAIN_TITLE] && (
              <ToggleControl
                label={__('Highlight main title?', Constants.TEXT_DOMAIN)}
                checked={attributes[ATTR_HIGHLIGHT_MAIN_TITLE]}
                onChange={(highlightMainTitle) =>
                  setAttributes({
                    [ATTR_HIGHLIGHT_MAIN_TITLE]: highlightMainTitle,
                  })
                }
              />
            )}
            <TextControl
              label={__('HTML anchor', Constants.TEXT_DOMAIN)}
              help={__(
                'Anchors let you link directly to this heading on the page',
                Constants.TEXT_DOMAIN,
              )}
              value={attributes.customId}
              onChange={(customId) => setAttributes({ customId })}
            />
          </PanelBody>
        </InspectorControls>
        <TitleTag
          className={`${attributes.className} heading heading--${attributes[ATTR_LEVEL]}`}
        >
          {attributes[ATTR_SHOW_PRE_TITLE] && (
            <RichText
              tagName="span"
              className="heading__subtitle heading__subtitle--pre"
              placeholder={__('Enter pre-title here', Constants.TEXT_DOMAIN)}
              value={attributes.preTitle}
              onChange={(preTitle) => setAttributes({ preTitle })}
            />
          )}
          <RichText
            tagName="span"
            className={buildMainTitleClassName(attributes)}
            placeholder={__('Enter main title here', Constants.TEXT_DOMAIN)}
            value={attributes.mainTitle}
            onChange={(mainTitle) => setAttributes({ mainTitle })}
          />
          {attributes[ATTR_SHOW_POST_TITLE] && (
            <RichText
              tagName="span"
              className="heading__subtitle heading__subtitle--post"
              placeholder={__('Enter post-title here', Constants.TEXT_DOMAIN)}
              value={attributes.postTitle}
              onChange={(postTitle) => setAttributes({ postTitle })}
            />
          )}
        </TitleTag>
      </Fragment>
    );
  },
  save({ attributes }) {
    const TitleTag = `h${attributes[ATTR_LEVEL]}`;
    return (
      <TitleTag className={`heading heading--${attributes[ATTR_LEVEL]}`}>
        <span id={attributes.customId} className="heading__scroll-anchor" />
        {attributes[ATTR_SHOW_PRE_TITLE] && (
          <RichText.Content
            tagName="span"
            className="heading__subtitle heading__subtitle--pre"
            value={attributes.preTitle}
          />
        )}
        <RichText.Content
          tagName="span"
          className={buildMainTitleClassName(attributes)}
          value={attributes.mainTitle}
        />
        {attributes[ATTR_SHOW_POST_TITLE] && (
          <RichText.Content
            tagName="span"
            className="heading__subtitle heading__subtitle--post"
            value={attributes.postTitle}
          />
        )}
      </TitleTag>
    );
  },
});

function buildMainTitleClassName(attributes) {
  return attributes[ATTR_HIGHLIGHT_MAIN_TITLE] ? 'heading__title' : '';
}
