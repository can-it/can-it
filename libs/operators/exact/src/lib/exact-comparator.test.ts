import { ExactComparator } from './exact-comparator';

describe('ExactComparator.isAllowed', () => {
  const operator = new ExactComparator();

  test('should be true if 2 values are matched exactly', () => {
    expect(operator.isAllowed('edit', 'edit')).toBe(true);
  });

  test('should be false if 2 values are not matched exactly', () => {
    expect(operator.isAllowed('edit', 'Edit')).toBe(false);
  });
});

describe('ExactComparator.isDenied', () => {
  const operator = new ExactComparator();

  test('should deny if 2 values are matched exactly', () => {
    expect(operator.isDenied('edit', 'edit')).toBe(true);
  });

  test('should not deny if 2 values are not matched exactly', () => {
    expect(operator.isDenied('edit', 'Edit')).toBe(false);
  });
});
