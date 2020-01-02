import { __ } from '@wordpress/i18n';
import { Fragment } from 'react';
import { registerBlockType } from '@wordpress/blocks';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { ToggleControl, PanelBody, RadioControl } from '@wordpress/components';

import * as Constants from '../constants';

export const ATTRIBUTE_LEVEL = 'level';
export const ATTRIBUTE_SHOW_LEVEL_OPTIONS = 'showLevelOptions';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_HEADING, {
  title: __('Heading', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY,
  // not listed in Dashicon page, but documented at https://iconify.design/icon-sets/dashicons/
  icon: 'heading',
  description: __('Titles of varying sizes', Constants.TEXT_DOMAIN),
  attributes: {
    mainTitle: { type: 'string' },
    preTitle: { type: 'string' },
    postTitle: { type: 'string' },
    className: { type: 'string', default: '' },
    [ATTRIBUTE_LEVEL]: {
      type: 'string',
      default: Constants.HEADING_SIZE_LARGE,
    },
    [ATTRIBUTE_SHOW_LEVEL_OPTIONS]: { type: 'boolean', default: true },
    showPreTitle: { type: 'boolean', default: true },
    showPostTitle: { type: 'boolean', default: true },
  },
  edit({ attributes, setAttributes }) {
    const TitleTag = `h${attributes[ATTRIBUTE_LEVEL]}`;
    return (
      <Fragment>
        <InspectorControls>
          <PanelBody title={__('Title Settings', Constants.TEXT_DOMAIN)}>
            {attributes[ATTRIBUTE_SHOW_LEVEL_OPTIONS] && (
              <RadioControl
                label={__('Size', Constants.TEXT_DOMAIN)}
                selected={attributes[ATTRIBUTE_LEVEL]}
                options={[
                  {
                    label: 'Extra large',
                    value: Constants.HEADING_SIZE_EXTRA_LARGE,
                  },
                  { label: 'Large', value: Constants.HEADING_SIZE_LARGE },
                  { label: 'Medium', value: Constants.HEADING_SIZE_MEDIUM },
                  { label: 'Small', value: Constants.HEADING_SIZE_SMALL },
                ]}
                onChange={level => setAttributes({ [ATTRIBUTE_LEVEL]: level })}
              />
            )}
            <ToggleControl
              label="Show pre-title"
              checked={attributes.showPreTitle}
              onChange={showPreTitle => setAttributes({ showPreTitle })}
            />
            <ToggleControl
              label="Show post-title"
              checked={attributes.showPostTitle}
              onChange={showPostTitle => setAttributes({ showPostTitle })}
            />
          </PanelBody>
        </InspectorControls>
        <TitleTag
          className={`${attributes.className} heading heading--${
            attributes[ATTRIBUTE_LEVEL]
          }`}
        >
          {attributes.showPreTitle && (
            <RichText
              tagName="span"
              className="heading__subtitle heading__subtitle--pre"
              placeholder={__('Enter pre-heading here', Constants.TEXT_DOMAIN)}
              value={attributes.preTitle}
              onChange={preTitle => setAttributes({ preTitle })}
            />
          )}
          <RichText
            tagName="span"
            className="heading__title"
            placeholder={__('Enter heading here', Constants.TEXT_DOMAIN)}
            value={attributes.mainTitle}
            onChange={mainTitle => setAttributes({ mainTitle })}
          />
          {attributes.showPostTitle && (
            <RichText
              tagName="span"
              className="heading__subtitle heading__subtitle--post"
              placeholder={__('Enter post-heading here', Constants.TEXT_DOMAIN)}
              value={attributes.postTitle}
              onChange={postTitle => setAttributes({ postTitle })}
            />
          )}
        </TitleTag>
      </Fragment>
    );
  },
  save({ attributes }) {
    const TitleTag = `h${attributes[ATTRIBUTE_LEVEL]}`;
    return (
      <TitleTag className={`heading heading--${attributes[ATTRIBUTE_LEVEL]}`}>
        {attributes.showPreTitle && (
          <RichText.Content
            tagName="span"
            className="heading__subtitle heading__subtitle--pre"
            value={attributes.preTitle}
          />
        )}
        <RichText.Content
          tagName="span"
          className="heading__title"
          value={attributes.mainTitle}
        />
        {attributes.showPostTitle && (
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
