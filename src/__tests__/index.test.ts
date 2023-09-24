import { hasId } from '..';

describe('first', () => {
  test('should example', () => {
    expect(hasId({ id: 'dd', name: 'dd'})).toBe(true);
  });
});
