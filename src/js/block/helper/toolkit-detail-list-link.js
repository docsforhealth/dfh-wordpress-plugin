import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { registerBlockType } from '@wordpress/blocks';
import { TextControl, ToggleControl } from '@wordpress/components';

import * as Constants from '../../constants';
import LinkPicker from '../../editor/link-picker';

export const ATTR_TITLE = 'title';
export const ATTR_URL = 'url';
export const ATTR_SHOW_AT_END = 'showAtEnd';

export function buildSaveElement(title, url) {
  return (
    <li
      key={url}
      className="toolkit-topics__section toolkit-topics__section--unsequenced"
    >
      <a
        href={url}
        className="link toolkit-topics__section__control"
        rel="noopener noreferrer"
        target="_blank"
      >
        <p className="toolkit-topics__section__control__title">{title}</p>
      </a>
    </li>
  );
}

// see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType(Constants.BLOCK_TOOLKIT_DETAIL_LIST_LINK, {
  title: __('Toolkit Link', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY_TOOLKIT,
  icon: 'admin-links',
  description: __(
    'Relevant link for a specific toolkit',
    Constants.TEXT_DOMAIN,
  ),
  parent: [Constants.BLOCK_TOOLKIT_DETAIL_LIST],
  attributes: {
    [ATTR_TITLE]: { type: 'string' },
    [ATTR_URL]: { type: 'string' },
    urlTitle: { type: 'string' },
    [ATTR_SHOW_AT_END]: { type: 'boolean', default: false },
  },
  edit({ attributes, setAttributes }) {
    return (
      <Fragment>
        <TextControl
          label={__('Link title', Constants.TEXT_DOMAIN)}
          value={attributes[ATTR_TITLE]}
          onChange={title => setAttributes({ [ATTR_TITLE]: title })}
        />
        <ToggleControl
          label={__('Show after all sections?', Constants.TEXT_DOMAIN)}
          help={__(
            'Links are usually shown before toolkit sections but can also be shown after all sections',
            Constants.TEXT_DOMAIN,
          )}
          checked={attributes[ATTR_SHOW_AT_END]}
          onChange={showAtEnd =>
            setAttributes({ [ATTR_SHOW_AT_END]: showAtEnd })
          }
        />
        <LinkPicker
          url={attributes[ATTR_URL]}
          title={attributes.urlTitle}
          label={__('Link target', Constants.TEXT_DOMAIN)}
          onChange={({ url, title }) =>
            setAttributes({ [ATTR_URL]: url, urlTitle: title })
          }
        />
      </Fragment>
    );
  },
  save({ attributes }) {
    return buildSaveElement(attributes[ATTR_TITLE], attributes[ATTR_URL]);
  },
});
