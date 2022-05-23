import { addUniqueIdInApiVersionOne } from 'src/js/utils';

describe('addUniqueIdInApiVersionOne', () => {
  const idAttrName = 'uniqueId';
  const attributes = { name: { type: 'string' } };

  test('blockInfo is returned without changes if not an object', () => {
    const notObject = 88;
    expect(addUniqueIdInApiVersionOne(idAttrName, notObject)).toBe(notObject);
  });

  test('unique ID attribute is added to attributes object', () => {
    expect(addUniqueIdInApiVersionOne(idAttrName, { attributes })).toEqual(
      expect.objectContaining({
        attributes: {
          ...attributes,
          [idAttrName]: { type: 'string' },
        },
      }),
    );
  });

  test('forces api version 1', () => {
    expect(
      addUniqueIdInApiVersionOne(idAttrName, { apiVersion: 2, attributes }),
    ).not.toMatchObject({
      apiVersion: 2,
    });
  });

  test('replaces edit property with React class component', () => {
    const editComponent = addUniqueIdInApiVersionOne(idAttrName, {}).edit;

    expect(editComponent).toEqual(expect.any(Function));
    // see https://stackoverflow.com/a/41658173
    expect(editComponent.prototype.isReactComponent).toBeTruthy();
  });
});
