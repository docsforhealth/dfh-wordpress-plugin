/**
 * JS libraries needed for the frontend too
 */
import $ from 'jquery';
import 'lity';
import 'slick-carousel';

$(function() {
  $('[data-slick]')
    .on('init reInit', ({ target }, { currentSlide }) => {
      setCategoryActive(target, currentSlide);
    })
    .on('beforeChange', ({ target }, slick, currentSlide, nextSlide) => {
      setCategoryActive(target, nextSlide);
    })
    .slick();

  $('[data-slick-nav-target-id][data-slick-nav-target-index]').on(
    'click',
    function() {
      const $this = $(this),
        targetSelector = `#${$this.data('slickNavTargetId')}`,
        targetIndex = $this.data('slickNavTargetIndex');
      $(targetSelector).slick('slickGoTo', targetIndex);
    },
  );
});

function setCategoryActive(sliderEl, index) {
  const activeClass = sliderEl.dataset.slickActiveClass;
  $(`[data-slick-nav-target-id=${sliderEl.id}]`)
    .removeClass(activeClass)
    .filter(`[data-slick-nav-target-index=${index}]`)
    .addClass(activeClass);
}
