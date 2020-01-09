import $ from 'jquery';

import * as Utils from './helpers/utils';

$(function() {
  // For the shape of this data, see the `ul` tag in `resource_category_filter.php`
  const resourceData = Utils.getResourceOverviewData(),
    $search = $('.page-header__form input');
  // Set up resource category filter toggle buttons
  if (resourceData) {
    $('.' + resourceData.itemClass).on('click', function({ currentTarget }) {
      // Note that `currentTarget` is the element the event listener is attached to
      $(currentTarget).toggleClass(resourceData.activeClass);
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
