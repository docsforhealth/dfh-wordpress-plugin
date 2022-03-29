import { useBlockProps } from '@wordpress/block-editor';
import {
  createBlocksFromInnerBlocksTemplate,
  registerBlockType,
} from '@wordpress/blocks';
import { Placeholder } from '@wordpress/components';
import { useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { pages as PagesIcon } from '@wordpress/icons';
import * as Constants from 'src/js/constants';

registerBlockType(`${Constants.NAMESPACE}/new-page-placeholder`, {
  apiVersion: 2,
  title: __('New Page Placeholder', Constants.TEXT_DOMAIN),
  category: Constants.CATEGORY_COMMON,
  icon: 'media-document',
  description: __(
    'Provides options for selecting the initial layout of new pages',
    Constants.TEXT_DOMAIN,
  ),
  supports: { inserter: false },
  attributes: {
    // `options` = Takes an array of objects of the following shape
    //    {
    //      title: <string>,
    //      description: <string>
    //      template: <array>
    //    }
    // The template accepts an array in InnerBlocks template format. For more information on this
    // template format, see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-templates/
    options: { type: 'array', default: [] },
  },
  edit({ clientId, attributes }) {
    // see https://developer.wordpress.org/block-editor/reference-guides/data/data-core-block-editor/#replaceblock
    const { replaceBlock } = useDispatch(Constants.STORE_BLOCK_EDITOR);
    if (attributes.options?.length > 0) {
      return (
        <div {...useBlockProps()}>
          <Placeholder
            icon={PagesIcon}
            label={__('New Page', Constants.TEXT_DOMAIN)}
            instructions={__(
              'Select a template for this new page',
              Constants.TEXT_DOMAIN,
            )}
          >
            <ul className="new-page-placeholder">
              {attributes.options?.map((option, index) => (
                <li key={index}>
                  <button
                    className="new-page-placeholder__option"
                    type="button"
                    onClick={() =>
                      replaceBlock(
                        clientId,
                        createBlocksFromInnerBlocksTemplate(option.template),
                      )
                    }
                  >
                    <span className="new-page-placeholder__option__title">
                      {option.title}
                    </span>
                    <span className="new-page-placeholder__option__description">
                      {option.description}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </Placeholder>
        </div>
      );
    } else {
      return <div {...useBlockProps()}></div>;
    }
  },
});
