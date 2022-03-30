import $ from 'jquery';
import { idSelector } from 'src/js/frontend/helper/utils';

const ID_CONTROL = 'clearControlId',
  ID_PARENT = 'clearParentId';

$(function () {
  $('[data-clear-control-id]').each((index, buttonEl) => {
    const $button = $(buttonEl),
      $control = $(idSelector($button.data(ID_CONTROL))),
      $parent = $(idSelector($button.data(ID_PARENT)));
    // add the clear button if control has content
    $control.on('keyup change', function ({ target }) {
      if (target.value?.trim()) {
        $parent.addClass('form__clear-control form__clear-control--visible');
      } else {
        $parent.removeClass('form__clear-control--visible');
      }
    });
    // clicking on the clear button clears control content
    $button.on('click', function () {
      // must manually trigger `change` event, see https://api.jquery.com/val/#val
      $control.val('').trigger('change');
    });
  });
});
