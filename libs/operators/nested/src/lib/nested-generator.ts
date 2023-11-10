import { Generator } from '@can-it/shared/types';
import { NestedPattern } from '../types/nested-pattern';
import { DEFAULT_RI_PATTERN } from './constants';
/**
 * Default resource identifier (RI) pattern:
 * ```typescript
 * {
 *   separator: '::',
 *   wildcard: '*',
 *   resourceRegex: '[\\w-]*'
 * }
 * ```
 *
 * Examples of generated RIs:
 * - `orgs::*::users`
 * - `orgs::*::users::any-user-id_ksi8-38`
 */
export class NestedGenerator implements Generator {
  private resourceRegex: RegExp;

  constructor(
    private riPattern: NestedPattern = DEFAULT_RI_PATTERN
  ) {
    this.resourceRegex = new RegExp(`^${this.riPattern.resourceRegex}$`);
  }

  /**
   * Generate the resource identity from an array of strings.
   * @param resources string[] - List of strings. An empty string will be converted to a wildcard string.
   * @returns string - The generated resource identity.
   *
   * Example usage:
   * ```typescript
   * generate(['orgs', '', 'users', '']); // 'orgs::*::users::*'
   * ```
   */
  transform(resources: string[]) {
    this.validateResources(resources);

    return resources
      .map(ri => ri || this.riPattern.wildcard)
      .join(this.riPattern.separator);
  }

  private validateResources(resources: string[]) {
    resources.filter(Boolean).forEach(resource => this.validateResource(resource));
  }

  private validateResource(ri: string) {
    if (this.resourceRegex.test(ri)) {
      return;
    }

    throw new Error(`The resource does not match the provided "resourceRegex: ${this.riPattern.resourceRegex}"`);
  }
}
