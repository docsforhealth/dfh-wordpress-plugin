import { __ } from '@wordpress/i18n';
import { Fragment } from 'react';
import { registerBlockType } from '@wordpress/blocks';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { ToggleControl, PanelBody, RadioControl } from '@wordpress/components';

import * as Constants from '../constants';

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_TITLE, {
  title: __('Title', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY,
  attributes: {
    mainTitle: {
      type: 'string',
      source: 'html',
      selector: '.heading__title',
    },
    preTitle: {
      type: 'string',
      source: 'html',
      selector: '.heading__subtitle--pre',
    },
    postTitle: {
      type: 'string',
      source: 'html',
      selector: '.heading__subtitle--post',
    },
    className: { type: 'string', default: ''},
    level: { type: 'string', default: '2' },
    showPreTitle: { type: 'boolean', default: true },
    showPostTitle: { type: 'boolean', default: true },
  },
  edit({ attributes, setAttributes }) {
    const TitleTag = `h${attributes.level}`;
    return (
      <Fragment>
        <InspectorControls>
          <PanelBody title={__('Title Settings', Constants.TEXT_DOMAIN)}>
            <RadioControl
              label={__('Size', Constants.TEXT_DOMAIN)}
              selected={attributes.level}
              options={[
                { label: 'Extra large', value: '1' },
                { label: 'Large', value: '2' },
                { label: 'Medium', value: '3' },
                { label: 'Small', value: '4' },
              ]}
              onChange={level => setAttributes({ level })}
            />
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
        <TitleTag className={`${attributes.className} heading heading--${attributes.level}`}>
          {attributes.showPreTitle && (
            <RichText
              tagName="span"
              className="heading__subtitle heading__subtitle--pre"
              placeholder={__(
                'Enter pre-heading here',
                Constants.TEXT_DOMAIN,
              )}
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
              placeholder={__(
                'Enter post-heading here',
                Constants.TEXT_DOMAIN,
              )}
              value={attributes.postTitle}
              onChange={postTitle => setAttributes({ postTitle })}
            />
          )}
        </TitleTag>
      </Fragment>
    );
  },
  save({ attributes }) {
    const TitleTag = `h${attributes.level}`;
    return (
      <TitleTag className={`heading heading--${attributes.level}`}>
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
