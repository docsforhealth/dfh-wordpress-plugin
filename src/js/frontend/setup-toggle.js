import $ from 'jquery';
import { classSelector } from 'src/js/frontend/helpers/utils';

$(function () {
  // to support async content loaded via ajax
  $(document).on('click', '[data-toggle-container-class]', function () {
    if (this.dataset) {
      const $this = $(this),
        {
          toggleContainerClass,
          toggleContainerOpenClass,
          toggleOpenWord,
          toggleCloseWord,
        } = this.dataset;
      if (toggleContainerClass && toggleContainerOpenClass) {
        $this
          .parents(classSelector(toggleContainerClass))
          .toggleClass(toggleContainerOpenClass);
      }
      if (toggleOpenWord && toggleCloseWord) {
        const oldMarkup = $this.html(),
          newMarkup = oldMarkup.includes(toggleOpenWord)
            ? oldMarkup.replace(toggleOpenWord, toggleCloseWord)
            : oldMarkup.replace(toggleCloseWord, toggleOpenWord);
        $this.html(newMarkup);
      }
    }
  });
  // open initial specified number of children toggles on initial page load
  $('[data-toggle-parent]').each((index, toggleParent) =>
    openTogglesOnInitialLoad($(toggleParent)),
  );
});

function openTogglesOnInitialLoad($toggleParent) {
  const {
    toggleParentChildClass,
    toggleParentNumInitialOpen,
    toggleParentChildOpenClass,
  } = $toggleParent.data();
  if (
    toggleParentChildClass &&
    toggleParentNumInitialOpen &&
    toggleParentChildOpenClass
  ) {
    // slice first arg is starting index, and second arg is ending index (excludes ending index)
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
    $toggleParent
      .find(classSelector(toggleParentChildClass))
      .slice(0, toggleParentNumInitialOpen)
      .addClass(toggleParentChildOpenClass);
  }
}
