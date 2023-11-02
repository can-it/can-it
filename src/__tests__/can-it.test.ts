import { CanIt } from '../can-it';

describe('CanIt', () => {
  let canIt: CanIt;
  beforeEach(() => {
    canIt = new CanIt(
      {
        allow: [
          ['edit', 'users'],
          ['delete', 'products']
        ]
      },
      { isMatch: (a: string, b: string) => a === b },
      { isMatch: (a: string, b: string) => a === b }
    );
  });

  test('should receive false if action is not matched', () => {
    expect(canIt.allowTo('unmatch-action', 'users')).toBe(false);
  });

  test('should receive false if RI is not matched', () => {
    expect(canIt.allowTo('edit', 'unmatch-ri')).toBe(false);
  });

  test('should receive true if both action and ri are matched', () => {
    expect(canIt.allowTo('edit', 'users')).toBe(true);
  });
});

describe('CanIt with DENY', () => {
  let canIt: CanIt;
  beforeEach(() => {
    canIt = new CanIt(
      {
        allow: [
          ['edit', 'users'],
          ['delete', 'products']
        ],
        deny: [
          ['delete', 'products'],
          ['delete', 'users']
        ]
      },
      { isMatch: (a: string, b: string) => a === b },
      { isMatch: (a: string, b: string) => a === b }
    );
  });

  test('should receive false if request appear in deny permissions', () => {
    expect(canIt.allowTo('delete', 'users')).toBe(false);
  });
  
  test('should receive false if it appears in both "allow" and "deny" permissions', () => {
    expect(canIt.allowTo('delete', 'products')).toBe(false);
  });
});
