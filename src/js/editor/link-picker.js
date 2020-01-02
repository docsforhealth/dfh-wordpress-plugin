import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { URLInputButton } from '@wordpress/block-editor';

import * as Constants from '../constants';

export default function LinkPicker({ onChange, url, title }) {
  const fallbackTitle = __('None', Constants.TEXT_DOMAIN);
  return (
    <div class="editor-link-picker">
      <div className="editor-link-picker__label text text--small text--light">
        <span className="text--bold">Target</span>:
        <span className="editor-link-picker__title">
          {title || fallbackTitle}
        </span>
      </div>
      <div className="editor-link-picker__control">
        <URLInputButton
          url={url}
          onChange={(url, result) =>
            onChange({
              url,
              title: result ? result.title : url ? url : fallbackTitle,
            })
          }
        />
      </div>
    </div>
  );
}
