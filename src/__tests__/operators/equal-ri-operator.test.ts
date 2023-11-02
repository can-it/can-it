import { EqualRiOperator } from '../../operators/equal-ri-operator';

describe('EqualRiGenerator', () => {
  const operator = new EqualRiOperator();

  test('should be true if 2 ris are matched exactly', () => {
    expect(operator.isMatch('users', 'users')).toBe(true);
  });

  test('should be false if 2 ris are not matched exactly', () => {
    expect(operator.isMatch('users', 'UsErs')).toBe(false);
  });
});
