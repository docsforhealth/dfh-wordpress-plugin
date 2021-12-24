import $ from 'jquery';
import _ from 'lodash';
import { classSelector } from 'src/js/frontend/helpers/utils';

const CLASS_ITEM = 'taxonomyItemClass',
  CLASS_ITEM_ACTIVE = 'taxonomyActiveClass',
  CLASS_SEARCH_INPUT = 'taxonomySearchInputClass',
  CLASS_UPDATE_LABEL = 'taxonomyUpdateLabelClass',
  ID_TAXONOMY = 'taxonomyId',
  NAME_PLURAL = 'taxonomyPluralName',
  NAME_SINGULAR = 'taxonomySingularName',
  ITEM_TERM_SLUG = 'taxonomyTermSlug';

$(function () {
  $('[data-taxonomy-id]').each((index, taxonomyEl) =>
    handleTaxonomy($(taxonomyEl)),
  );
});

function handleTaxonomy($taxonomy) {
  // initialize labels
  updateLabels($taxonomy);
  // handle search input
  get$Search($taxonomy).on('change', buildSearchHandler($taxonomy));
  // handle category selectors
  $taxonomy.on(
    'click',
    classSelector($taxonomy.data(CLASS_ITEM)),
    buildTaxonomyHandler($taxonomy),
  );
}

// Building event handlers
// -----------------------

function buildSearchHandler($taxonomy) {
  return function ({ target: { value } }) {
    reloadAjaxItems($taxonomy, value);
  };
}

function buildTaxonomyHandler($taxonomy) {
  // target vs currentTarget see https://stackoverflow.com/a/10086501
  return function ({ target: currentItem }) {
    const activeClass = $taxonomy.data(CLASS_ITEM_ACTIVE),
      { $items, numTotal, numActive } = getItemsAndCounts($taxonomy);
    // if all categories are selected, then select only this category
    if (numActive === numTotal) {
      $items.not(currentItem).removeClass(activeClass);
    }
    // if only this current category is selected, then select all categories
    else if (numActive === 1 && currentItem.classList.contains(activeClass)) {
      $items.addClass(activeClass);
    }
    // otherwise, just toggle class
    else {
      currentItem.classList.toggle(activeClass);
    }
    updateLabels($taxonomy);
    reloadAjaxItems($taxonomy, get$Search($taxonomy).val());
  };
}

// Helpers
// -------

function get$Search($taxonomy) {
  return $(classSelector($taxonomy.data(CLASS_SEARCH_INPUT)));
}

const updateLabels = _.debounce(($taxonomy) => {
  const { numActive, numTotal } = getItemsAndCounts($taxonomy);
  if (numTotal) {
    const singularName = $taxonomy.data(NAME_SINGULAR),
      pluralName = $taxonomy.data(NAME_PLURAL),
      labelClass = $taxonomy.data(CLASS_UPDATE_LABEL);
    // don't need to iterate because of "implicit iteration"
    $(classSelector(labelClass)).text(
      `Showing ${numActive} of ${numTotal} ${
        numTotal === 1 ? singularName : pluralName
      }`,
    );
  }
});

const reloadAjaxItems = _.debounce(($taxonomy, searchVal = '') => {
  const { $activeItems } = getItemsAndCounts($taxonomy);
  window.ajaxloadmore?.filter('fade', 50, {
    search: searchVal?.trim(),
    taxonomy: $taxonomy.data(ID_TAXONOMY),
    taxonomyTerms: $activeItems
      .map((index, item) => item.dataset[ITEM_TERM_SLUG])
      .get()
      .join(), // default join is ','
  });
}, 250);

function getItemsAndCounts($taxonomy) {
  if ($taxonomy) {
    const itemClass = $taxonomy.data(CLASS_ITEM),
      activeClass = $taxonomy.data(CLASS_ITEM_ACTIVE),
      // returns the actual `button`s within the `li`s that contain the taxonomy slug and classes
      $items = $taxonomy.find(classSelector(itemClass)),
      $activeItems = $items.filter(classSelector(activeClass));
    return {
      $items,
      $activeItems,
      numTotal: $items.length,
      numActive: $activeItems.length,
    };
  } else {
    return Object.create(null);
  }
}
