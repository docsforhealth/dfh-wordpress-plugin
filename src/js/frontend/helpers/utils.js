export function classSelector(...classNames) {
  return classNames.map((className) => `.${className}`).join('');
}
