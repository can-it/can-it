import { NestedGenerator } from './nested-generator';

describe('NestedGenerator with default ri pattern', () => {
  const operator = new NestedGenerator();

  test('should generate the same as single resource passed', () => {
    expect(operator.transform(['z'])).toBe('z');
  });
});

describe('NestedGenerator', () => {
  const operator = new NestedGenerator({ wildcard: '+', separator: ':', resourceRegex: '[a-z]+' });

  test('should contain the separator when having more than 1 resource passed', () => {
    expect(operator.transform(['abc', 'xyz'])).toBe('abc:xyz');
  });

  test('should contain the wildcard when existing empty resource string passed', () => {
    expect(operator.transform(['a', '', 'b'])).toBe('a:+:b');
  });

  test('should throw error when resource provided is not match with resourceRegex', () => {
    expect(() => operator.transform(['ABC'])).toThrow(/\[a-z\]\+/);
    expect(() => operator.transform(['a3'])).toThrow(/\[a-z\]\+/);
    expect(() => operator.transform(['a3b'])).toThrow(/\[a-z\]\+/);
  });
});
