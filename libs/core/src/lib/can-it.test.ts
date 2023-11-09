import { CanIt } from "./can-it";

describe('CanIt', () => {
  const equal = (a: string, b: string) => a === b;
  let canIt: CanIt;
  beforeEach(() => {
    canIt = new CanIt(
      {
        allow: [
          ['edit', 'users'],
          ['delete', 'products']
        ]
      },
      { isAllowed: equal, isDenied: equal },
      { isAllowed: equal, isDenied: equal }
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
  const isEqual = (a: string, b: string) => a === b;
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
      { isAllowed: isEqual, isDenied: isEqual },
      { isAllowed: isEqual, isDenied: isEqual }
    );
  });

  test('should receive false if request appear in deny permissions', () => {
    expect(canIt.allowTo('delete', 'users')).toBe(false);
  });

  test('should receive false if it appears in both "allow" and "deny" permissions', () => {
    expect(canIt.allowTo('delete', 'products')).toBe(false);
  });
});
