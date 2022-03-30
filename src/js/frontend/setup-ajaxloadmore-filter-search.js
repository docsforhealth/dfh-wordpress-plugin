import $ from 'jquery';
import _ from 'lodash';
import { classSelector, idSelector } from 'src/js/frontend/helper/utils';

// starting point for the script
// on a data `span` adjacent to the ajaxloadmore element, see `ajax-load-more` block
const CLASS_SEARCH_INPUT = 'ajaxSearchInputClass',
  HTML_ID_TAXONOMY_FILTER = 'ajaxTaxonomyFilterId';

// on the taxonomy filter object, see `page-taxonomy-filter` block
const CLASS_ITEM = 'taxonomyItemClass',
  CLASS_ITEM_ACTIVE = 'taxonomyActiveClass',
  CLASS_UPDATE_LABEL = 'taxonomyUpdateLabelClass',
  ID_TAXONOMY = 'taxonomyId',
  NAME_PLURAL = 'taxonomyPluralName',
  NAME_SINGULAR = 'taxonomySingularName',
  ITEM_TERM_SLUG = 'taxonomyTermSlug',
  NUM_TOTAL_TERMS = 'taxonomyTotalNumTerms';

$(function () {
  $('[data-ajax]').each((index, ajaxInfoEl) =>
    handleAjaxLoadMore($(ajaxInfoEl)),
  );
});

function handleAjaxLoadMore($ajaxInfoEl) {
  const $taxonomy = $(idSelector($ajaxInfoEl.data(HTML_ID_TAXONOMY_FILTER))),
    $search = $(classSelector($ajaxInfoEl.data(CLASS_SEARCH_INPUT)));
  // if present, handle search input
  handleSearch($search, $taxonomy);
  // if present, handle taxonomy filter
  handleTaxonomy($taxonomy, $search);
}

function handleSearch($search, $taxonomy) {
  $search.on('change', buildSearchHandler($taxonomy));
}

function handleTaxonomy($taxonomy, $search) {
  // initialize labels
  updateLabels($taxonomy);
  // handle category selectors
  $taxonomy.on(
    'click',
    classSelector($taxonomy.data(CLASS_ITEM)),
    buildTaxonomyHandler($taxonomy, $search),
  );
}

// Building event handlers
// -----------------------

function buildSearchHandler($taxonomy) {
  return function ({ target: { value } }) {
    reloadAjaxItems($taxonomy, value);
  };
}

function buildTaxonomyHandler($taxonomy, $search) {
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
    reloadAjaxItems($taxonomy, $search.val());
  };
}

// Helpers
// -------

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

const reloadAjaxItems = _.debounce(
  ($taxonomy = Object.create(null), searchVal = '') => {
    if (window.ajaxloadmore) {
      const filterOpts = Object.create(null);
      // if has taxonomy filter defined
      if ($taxonomy.length) {
        const { $activeItems } = getItemsAndCounts($taxonomy),
          totalNumTerms = $taxonomy.data(NUM_TOTAL_TERMS);

        filterOpts.taxonomy = $taxonomy.data(ID_TAXONOMY);
        // if including all taxonomy terms, then set terms to empty string to also show
        // items that have zero taxonomy terms assigned
        if ($activeItems.length === totalNumTerms) {
          filterOpts.taxonomyTerms = '';
        } else {
          filterOpts.taxonomyTerms = $activeItems
            .map((index, item) => item.dataset[ITEM_TERM_SLUG])
            .get()
            .join(); // default join is ','
        }
      }
      // need to have `search: ''` in the filter object to get all results
      filterOpts.search = searchVal ? searchVal.trim() : '';

      window.ajaxloadmore?.filter('fade', 50, filterOpts);
    }
  },
  250,
);

function getItemsAndCounts($taxonomy) {
  if ($taxonomy?.length) {
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
