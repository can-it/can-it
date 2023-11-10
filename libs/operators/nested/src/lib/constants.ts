import { NestedPattern } from '../types/nested-pattern';

export const DEFAULT_RI_PATTERN: NestedPattern = {
  separator: '::',
  wildcard: '*',
  resourceRegex: '[\\w-]*',
};
