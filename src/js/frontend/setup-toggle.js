import $ from 'jquery';
import { classSelector } from 'src/js/frontend/helpers/utils'

$(function () {
  $('[data-toggle-container-class]').on('click', function () {
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
});
