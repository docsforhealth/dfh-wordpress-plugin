import _ from 'lodash';

export function classSelector(...classNames) {
  let currentClassNames = classNames;

  if (currentClassNames.length === 0) {
    return '';
  } else if (currentClassNames.length === 1) {
    // if the only item is null or undefined
    if (!currentClassNames[0]) {
      return '';
    }
    // handle case of multiple space-separated classes within one entry here
    const splitClassNames = trySplitClassNames(currentClassNames[0]);
    // if still one item after trying to split, then is indeed one class, return base condition
    if (splitClassNames.length === 1) {
      return `.${splitClassNames[0]}`;
    } else {
      // else fall through to iterating through array
      currentClassNames = splitClassNames;
    }
  }

  return (
    currentClassNames
      // check if multiple space-separated classes in the length=1 recursive call case
      .map((className) => classSelector(className))
      .join('')
  );
}

export function idSelector(id) {
  return id ? `#${id}` : '';
}

// Helpers
// -------

// try splitting space-separated class names
function trySplitClassNames(className) {
  return _.isString(className)
    ? className?.trim()?.split(/\s+/) ?? []
    : className;
}
