import RiOperator from '../types/ri-operator';
import RiPattern from '../types/ri-pattern';

const DEFAULT_RI_PATTERN: RiPattern = {
  separator: '::',
  wildcard: '*',
  resourceRegex: '[\\w-]*',
};

/**
 * Sample Resource Identity (ri) formats:
 * - users
 * - users::id-3459
 * - orgs::org-id-87435::*
 * - orgs::org-id-87435::products
 * - orgs::*::users
 * - ...
 */
export default class NestedRiOperator implements RiOperator {
  constructor(
    private riPattern: RiPattern = DEFAULT_RI_PATTERN
  ) {}
  
  isMatch(ri: string, permissionRi: string) {
    return this.getTestableRi(ri).test(permissionRi);
  }

  private getTestableRi(ri: string) {
    const resourceWildcardRegex = new RegExp(`${this.riPattern.wildcard}${this.riPattern.separator}`, 'g');
    const endWildcardRegex = new RegExp(`${this.riPattern.wildcard}$`);
    const testableRi =
      ri
        .replace(resourceWildcardRegex, `${this.riPattern.resourceRegex}${this.riPattern.separator}`)
        .replace(endWildcardRegex, '.*');

    return new RegExp(`^${testableRi}`);
  }
}
