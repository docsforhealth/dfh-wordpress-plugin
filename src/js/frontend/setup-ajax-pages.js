import $ from 'jquery';

import * as Utils from './helpers/utils';

$(function() {
  // For the shape of this data, see the `ul` tag in `resource_category_filter.php`
  const resourceData = Utils.getResourceOverviewData(),
    $search = $('.page-header__form input');
  // Set up resource category filter toggle buttons
  if (resourceData) {
    const { itemClass, activeClass } = resourceData;
    $('.' + itemClass).on('click', function({ currentTarget }) {
      // Note that `currentTarget` is the element the event listener is attached to
      const $current = $(currentTarget),
        isCurrentActive = $current.hasClass(activeClass),
        { $items, numTotal, numActive } = Utils.getResourceCategoryStatuses(
          resourceData,
        );
      // if all categories are selected, then select only this category
      if (numActive === numTotal) {
        $items.not($current).removeClass(activeClass);
      }
      // if only this current category is selected, then select all categories
      else if (numActive === 1 && isCurrentActive) {
        $items.addClass(activeClass);
      }
      // otherwise, just toggle class
      else {
        $current.toggleClass(activeClass);
      }
      // Once resource category statuses are updated, then attempt to search and update label
      Utils.searchWithParams($search.val(), resourceData);
      Utils.updateResourceStatusLabel(resourceData);
    });
  }
  // If on resource overview page and has data, try to populate the status labels
  Utils.updateResourceStatusLabel(resourceData);
  // Search works for both resource overview AND toolkit overview
  $search.on('change', event =>
    Utils.searchWithParams(event.target.value, resourceData),
  );
});
