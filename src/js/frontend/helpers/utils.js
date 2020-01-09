import $ from 'jquery';
import _ from 'lodash';

import * as Constants from '../../constants';

// For the shape of this data, see the `ul` tag in `resource_category_filter.php`
export function getResourceOverviewData() {
  const $categories = $('.resource-categories__list');
  return $categories.data();
}

export const updateResourceStatusLabel = _.debounce((data = null) => {
  if (!data) {
    return;
  }
  const { itemClass, activeClass, singularName, name } = data,
    $items = $('.' + itemClass),
    numTotal = $items.length,
    numActive = $items.filter('.' + activeClass).length;
  if (numTotal) {
    $('.' + Constants.CLASS_RESOURCE_MESSAGE_AREA).text(
      `Showing ${numActive} of ${numTotal} ${
        numTotal === 1 ? singularName : name
      }`,
    );
  }
});

export const searchWithParams = _.debounce((newVal, data = null) => {
  if (ajaxloadmore) {
    ajaxloadmore.filter('fade', 100, {
      ...tryBuildResourceTaxonomySearchParams(data),
      search: _.trim(newVal),
    });
  }
}, 250);

// Helpers
// -------

function tryBuildResourceTaxonomySearchParams(data = null) {
  if (data) {
    const { taxonomy, activeClass } = data;
    return {
      taxonomy,
      taxonomyTerms: $('.' + activeClass)
        .map(function() {
          return this.dataset.taxonomySlug;
        })
        .get()
        .join(),
    };
  } else {
    return {};
  }
}
