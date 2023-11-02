import { NestedRiGenerator } from '../../generators/nested-ri-generator';

describe('NestedRiGenerator with default ri pattern', () => {
  const operator = new NestedRiGenerator();

  test('should generate the same as single resource passed', () => {
    expect(operator.generate(['z'])).toBe('z');
  });
});

describe('NestedRiGenerator', () => {
  const operator = new NestedRiGenerator({ wildcard: '+', separator: ':', resourceRegex: '[a-z]+' });

  test('should contain the separator when having more than 1 resource passed', () => {
    expect(operator.generate(['abc', 'xyz'])).toBe('abc:xyz');
  });

  test('should contain the wildcard when existing empty resource string passed', () => {
    expect(operator.generate(['a', '', 'b'])).toBe('a:+:b');
  });

  test('should throw error when resource provided is not match with resourceRegex', () => {
    expect(() => operator.generate(['ABC'])).toThrow(/\[a-z\]\+/);
    expect(() => operator.generate(['a3'])).toThrow(/\[a-z\]\+/);
    expect(() => operator.generate(['a3b'])).toThrow(/\[a-z\]\+/);
  });
});
