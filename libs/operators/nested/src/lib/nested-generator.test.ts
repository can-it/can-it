import { NestedGenerator } from './nested-generator';

describe('NestedGenerator with default ri pattern', () => {
  const generator = new NestedGenerator();

  test('should generate the same as single resource passed', () => {
    expect(generator.transform('z')).toBe('z');
  });
});

describe('NestedGenerator', () => {
  const generator = new NestedGenerator({ wildcard: '+', separator: ':', resourceRegex: '[a-z]+' });

  test('should contain the separator when having more than 1 resource passed', () => {
    expect(generator.transform('abc', 'xyz')).toBe('abc:xyz');
  });

  test('should contain the wildcard when existing empty resource string passed', () => {
    expect(generator.transform('a', '', 'b')).toBe('a:+:b');
  });

  test('should throw error when resource provided is not match with resourceRegex', () => {
    expect(() => generator.transform('ABC')).toThrow(/\[a-z\]\+/);
    expect(() => generator.transform('a3')).toThrow(/\[a-z\]\+/);
    expect(() => generator.transform('a3b')).toThrow(/\[a-z\]\+/);
  });
});
