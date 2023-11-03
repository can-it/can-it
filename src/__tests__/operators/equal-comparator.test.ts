import { ExactComparator } from '../../operators/exact-comparator';

describe('EqualRiGenerator', () => {
  const operator = new ExactComparator();

  test('should be true if 2 ris are matched exactly', () => {
    expect(operator.isAllowed('edit', 'edit')).toBe(true);
  });

  test('should be false if 2 ris are not matched exactly', () => {
    expect(operator.isAllowed('edit', 'Edit')).toBe(false);
  });
});
