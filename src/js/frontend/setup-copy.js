import $ from 'jquery';

// Supports copying functionality via DOM data attributes
// `data-copy-selector` = CSS selector of element to copy text for
// `data-copy-active-class` = active class to add when copying, will be removed after delay
// `data-copy-class-remove-delay` = delay before removing active class, default: 1000ms
// `data-copy-done-class` = class to add after copied one, will not be removed
// `data-copy-done-text` = text for control after done

$(function () {
  // to support async content loaded via ajax
  $(document).on('click', '[data-copy-selector]', function () {
    const element = this,
      textToCopy = $(element.dataset.copySelector)?.text()?.trim(),
      activeClass = element.dataset.copyActiveClass,
      doneClass = element.dataset.copyDoneClass,
      doneText = element.dataset.copyDoneText;
    if (textToCopy) {
      if (activeClass) {
        element.classList.add(activeClass);
        setTimeout(
          () => element.classList.remove(activeClass),
          element.dataset.copyClassRemoveDelay ?? 1000,
        );
      }
      if (doneClass) {
        element.classList.add(doneClass);
      }
      if (doneText) {
        element.textContent = doneText;
      }
      // see https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText
      navigator.clipboard.writeText(textToCopy);
    }
  });
});
