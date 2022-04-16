import { InnerBlocks } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import $ from 'jquery';
import PropTypes from 'prop-types';

/**
 * Custom appender for InnerBlocks
 *
 * If no label is specified, after rendering, this block will automatically generate a label
 * from the `aria-label` of the `ButtonBlockAppender`
 */

// https://kurtrank.me/gutenberg-custom-innerblocks-appender/
// https://github.com/WordPress/gutenberg/tree/trunk/packages/block-editor/src/components/inner-blocks#renderappender
export default function AutoLabelAppender({ className, label, deemphasized }) {
  useEffect(() => {
    // Wait for page to finish loading
    $(function () {
      // Find all instances of `data-auto-label-appender` currently on the page
      // Because React hooks are global by nature, no easy way to scope to only this block
      $('[data-auto-label-appender=true]').each(function () {
        const {
            autoLabelAppenderSourceSelector,
            autoLabelAppenderSourceAttribute,
            autoLabelAppenderTargetSelector,
          } = this.dataset,
          $el = $(this),
          label = $el
            .find(autoLabelAppenderSourceSelector)
            .attr(autoLabelAppenderSourceAttribute);
        if (label) {
          $el.find(autoLabelAppenderTargetSelector).text(label);
        }
      });
    });
  });

  return (
    <div
      className={`auto-label-appender ${className ?? ''} ${
        deemphasized ? 'auto-label-appender--deemphasized' : ''
      }`}
      data-auto-label-appender={!label} // will be `false` (disabled) if label specified
      data-auto-label-appender-source-selector=".block-editor-button-block-appender"
      data-auto-label-appender-source-attribute="aria-label"
      data-auto-label-appender-target-selector=".auto-label-appender__label"
    >
      <span className="auto-label-appender__label">{label ?? ''}</span>
      <InnerBlocks.ButtonBlockAppender />
    </div>
  );
}
AutoLabelAppender.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  deemphasized: PropTypes.bool,
};
