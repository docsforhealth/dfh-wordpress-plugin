import $ from 'jquery';
import tippy from 'tippy.js';

$(function () {
  // programmatically add tabindex as can't currently set default values via format definition
  $('[data-more-info-description]').attr('tabindex', '0');

  // see https://atomiks.github.io/tippyjs/v6/all-props/
  tippy('[data-more-info-description]', {
    trigger: 'click focus',
    interactive: true,
    maxWidth: 500,
    theme: 'dfh',
    // Not great accessibility but can't really customize custom format markup currently to add another
    // wrapper `span` tag, see https://atomiks.github.io/tippyjs/v6/accessibility/#interactivity
    appendTo: 'parent',
    content: (el) => {
      const { moreInfoDescription, moreInfoUrl } = el.dataset,
        $content = $('<div></div>', { class: 'more-info-popover' });
      // add description, which is required and guaranteed to exist by the selector
      $content.append(
        $('<div></div>', {
          class: 'more-info-popover__description',
          text: moreInfoDescription,
        }),
      );
      // add optional read more link, if present
      if (moreInfoUrl) {
        $content.append(
          $('<a></a>', {
            class: 'more-info-popover__link',
            text: 'Read More',
            href: moreInfoUrl,
            target: '_blank',
            rel: 'noopen noreferrer',
          }),
        );
      }
      return $content[0];
    },
    // see https://atomiks.github.io/tippyjs/v6/all-props/#popperoptions
    popperOptions: {
      modifiers: [
        // Prevents the popover from overflow out of the screen on mobile
        {
          name: 'preventOverflow',
          options: {
            altAxis: true,
            tether: false,
          },
        },
      ],
    },
  });
});
