import $ from 'jquery';
import _ from 'lodash';

import * as Constants from '../constants';

$(function() {
  const $categories = $('.resource-categories__list');
  const data = $categories.data();
  // no resource previews to set up if relevant data is not loaded
  if (!data) {
    return;
  }
  // For the shape of this data, see the `ul` tag in `resource_category_filter.php`
  const debouncedSearchWithParams = _.debounce(searchWithParams, 250),
    debouncedUpdateStatusLabel = _.debounce(updateStatusLabel, 250);
  // First populate the category labels
  updateStatusLabel(data);
  // Category filter toggle buttons
  $('.' + data.itemClass).on('click', function({ currentTarget }) {
    // Note that `currentTarget` is the element the event listener is attached to
    $(currentTarget).toggleClass(data.activeClass);
    debouncedSearchWithParams(data);
    debouncedUpdateStatusLabel(data);
  });
  // Search field
  $('.page-header__form input').on('change', () =>
    debouncedSearchWithParams(data),
  );
});

// Helpers
// -------

function searchWithParams({ taxonomy, activeClass }) {
  const search = _.trim($('.page-header__form input').val()),
    taxonomyTerms = $('.' + activeClass)
      .map(function() {
        return this.dataset.taxonomySlug;
      })
      .get()
      .join();
  ajaxloadmore.filter('fade', 100, { taxonomy, taxonomyTerms, search });
}

function updateStatusLabel({ itemClass, activeClass, singularName, name }) {
  const $items = $('.' + itemClass),
    numTotal = $items.length,
    numActive = $items.filter('.' + activeClass).length;
  if (numTotal) {
    $('.' + Constants.CLASS_RESOURCE_MESSAGE_AREA).text(
      `Showing ${numActive} of ${numTotal} ${
        numTotal === 1 ? singularName : name
      }`,
    );
  }
}
