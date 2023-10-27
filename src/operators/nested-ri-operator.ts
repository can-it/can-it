import RiOperator from '../types/ri-operator';

interface RiPattern {
  separator: string;
  wildcard: string;
  resource: string;
}

const DEFAULT_RI_PATTERN: RiPattern = {
  separator: '::',
  wildcard: '*',
  resource: '[\\w-]*',
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
  
  generate(ris: string | string[]) {
    return ([] as string[]).concat(ris).join(this.riPattern.separator);
  }

  isMatch(ri: string, permissionRi: string) {
    return this.getTestableRi(ri).test(permissionRi);
  }

  private getTestableRi(ri: string) {
    const resourceWildcardRegex = new RegExp(`${this.riPattern.wildcard}${this.riPattern.separator}`, 'g');
    const endWildcardRegex = new RegExp(`${this.riPattern.wildcard}$`);
    const testableRi =
      ri
        .replace(resourceWildcardRegex, `${this.riPattern.resource}${this.riPattern.separator}`)
        .replace(endWildcardRegex, '.*');

    return new RegExp(`^${testableRi}`);
  }
}
