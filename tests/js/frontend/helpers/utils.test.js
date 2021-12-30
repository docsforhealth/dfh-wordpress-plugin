import { classSelector, idSelector } from 'src/js/frontend/helpers/utils';

describe('idSelector', () => {
  test('null conditions', () => {
    expect(idSelector(null)).toEqual('');
    expect(idSelector([])).toEqual('');
  });

  test('returns CSS id', () => {
    expect(idSelector('hi')).toEqual('#hi');
  });

  test('ignores all but first argument', () => {
    expect(idSelector('hi', 'world')).toEqual('#hi');
  });

  test('does not handle whitespace in arguments', () => {
    expect(idSelector('hi world')).toEqual('#hi world');
  });
});

describe('class selector', () => {
  test('null conditions', () => {
    expect(classSelector()).toEqual('');
    expect(classSelector(null)).toEqual('');
    expect(classSelector(null, undefined)).toEqual('');
    expect(classSelector([])).toEqual('');
    expect(classSelector([null, undefined])).toEqual('');
  });

  test('builds CSS class', () => {
    expect(classSelector('hi')).toEqual('.hi');
  });

  test('builds multiple arguments into a multi-class selector', () => {
    expect(classSelector('hi', 'world')).toEqual('.hi.world');
  });

  test('ignores non-string values and handles multiple classes within a string', () => {
    expect(classSelector(undefined, 'hello    world', [], 'world')).toEqual(
      '.hello.world.world',
    );
  });
});
