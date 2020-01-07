import $ from 'jquery';
import 'slick-carousel';

$(function() {
  // Setup slick
  $('[data-slick]')
    .on('init reInit', ({ target }, { currentSlide }) => {
      setCategoryActive(target, currentSlide);
    })
    .on('beforeChange', ({ target }, slick, currentSlide, nextSlide) => {
      setCategoryActive(target, nextSlide);
    })
    .slick();

  // Jump to a particular index
  $('[data-slick-nav-target-id][data-slick-nav-target-index]').on(
    'click',
    function() {
      const $this = $(this),
        targetSelector = `#${$this.data('slickNavTargetId')}`,
        targetIndex = $this.data('slickNavTargetIndex');
      $(targetSelector).slick('slickGoTo', targetIndex);
    },
  );

  // Trigger given method on the slick object
  $('[data-slick-nav-target-id][data-slick-nav-method]').on(
    'click',
    function() {
      const $this = $(this),
        targetSelector = `#${$this.data('slickNavTargetId')}`,
        targetMethod = $this.data('slickNavMethod');
      $(targetSelector).slick(targetMethod);
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
