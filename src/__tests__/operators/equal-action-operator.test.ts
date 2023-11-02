import { EqualActionOperator } from '../../operators/equal-action-operator';

describe('EqualRiGenerator', () => {
  const operator = new EqualActionOperator();

  test('should be true if 2 ris are matched exactly', () => {
    expect(operator.isMatch('edit', 'edit')).toBe(true);
  });

  test('should be false if 2 ris are not matched exactly', () => {
    expect(operator.isMatch('edit', 'Edit')).toBe(false);
  });
});
