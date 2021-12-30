import { INNER_BLOCKS_FORCE_ATTRS_ALL } from 'src/js/constants';
import { addUniqueIdInApiVersionOne, handleForceAllAttrs } from 'src/js/utils';

describe('handleForceAllAttrs', () => {
  test('calling without arguments', () => {
    expect(handleForceAllAttrs()).toBeUndefined();
  });

  test('returns object if no `INNER_BLOCKS_FORCE_ATTRS_ALL` key', () => {
    const obj = jest.fn();
    expect(handleForceAllAttrs(obj)).toBe(obj);
  });

  test('copies `INNER_BLOCKS_FORCE_ATTRS_ALL` to all others then removes it', () => {
    const obj = {
      hello: { a: 'b' },
      [INNER_BLOCKS_FORCE_ATTRS_ALL]: { c: 'd' },
      world: { e: 'f' },
    };
    expect(handleForceAllAttrs(obj)).toEqual({
      hello: { a: 'b', c: 'd' },
      world: { e: 'f', c: 'd' },
    });
  });
});

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
    expect(editComponent.name).toEqual('Component');
  });
});
