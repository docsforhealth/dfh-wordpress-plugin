import { Button, ButtonGroup } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';
import _ from 'lodash';
import PropTypes from 'prop-types';
import * as Constants from 'src/js/constants';

/**
 * BUG: if you are checking the built-in taxonomy multi-select box in the editor sidebar, you will
 * notice a bug where the multi-select box fails to update if we programmatically clear the taxonomy
 * values by passing an empty array to `editPost`. However, this is a COSMETIC bug as the taxonomy
 * values have actually been cleared.
 */

export default function TaxonomySelector({
  className = '',
  taxonomySlug,
  allowMultiple = false,
}) {
  // need to make sure to use new array when updating per Redux rules
  // see https://gist.github.com/harisrozak/64764a84cd4b3bd7845084572850ba78
  const [id] = useState(_.uniqueId()),
    { editPost } = useDispatch(Constants.STORE_EDITOR),
    taxonomyInfo = useSelect((select) =>
      select(Constants.STORE_CORE).getTaxonomy(taxonomySlug),
    ),
    taxonomyValues = useSelect((select) =>
      select(Constants.STORE_CORE).getEntityRecords('taxonomy', taxonomySlug),
    ),
    // for the unsaved changes to be reflected, need to use `getEditedPostAttribute` instead of
    // `getCurrentPost` which only shows saved changes
    selectedValues = useSelect((select) =>
      select(Constants.STORE_EDITOR).getEditedPostAttribute(taxonomySlug),
    );

  return taxonomyValues ? (
    <div className={`taxonomy-selector ${className}`}>
      <span id={id} className="taxonomy-selector__label">
        {taxonomyInfo?.labels?.add_or_remove_items}
      </span>
      <ButtonGroup
        className="taxonomy-selector__button-group"
        aria-labelledby={id}
      >
        {taxonomyValues?.map((value) => {
          const isSelected = selectedValues?.includes(value.id);
          return (
            <Button
              key={value.id}
              aria-pressed={isSelected}
              className={`button button--small button--outline taxonomy-selector__button ${
                isSelected ? 'taxonomy-selector__button--active' : ''
              }`}
              label={`Toggle selection for ${value.name}`}
              onClick={() => {
                editPost({
                  [taxonomySlug]: buildTaxonomySelection(
                    selectedValues,
                    allowMultiple,
                    value.id,
                    isSelected,
                  ),
                });
              }}
            >
              {value.name}
            </Button>
          );
        })}
      </ButtonGroup>
    </div>
  ) : null;
}
TaxonomySelector.propTypes = {
  className: PropTypes.string,
  taxonomySlug: PropTypes.string.isRequired,
  allowMultiple: PropTypes.bool,
};

function buildTaxonomySelection(
  selectedValues,
  allowMultiple,
  valueId,
  isSelected,
) {
  let newVal;
  if (allowMultiple) {
    newVal = isSelected
      ? _.without(selectedValues, valueId)
      : [...selectedValues, valueId];
  } else {
    newVal = isSelected ? [] : [valueId];
  }
  return newVal;
}
