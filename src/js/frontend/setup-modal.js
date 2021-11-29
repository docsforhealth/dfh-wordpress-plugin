import $ from 'jquery';
import 'lity';

$(function () {
  // see https://github.com/jsor/lity#events
  $(document).on('lity:ready lity:remove', function (event, instance) {
    const $triggerEl = instance.opener(),
      $lityEl = instance.element();
    if (event && event.target && $triggerEl) {
      const { lityOverrideModalClass, lityOverrideContainerClass } =
        $triggerEl.data();
      if (lityOverrideModalClass) {
        event.target.classList.toggle(lityOverrideModalClass);
      }
      if (lityOverrideContainerClass) {
        $lityEl.find('.lity-container').addClass(lityOverrideContainerClass);
      }
    }
  });
});
