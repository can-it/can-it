import RiOperator from '../types/ri-operator';
import RiPattern from '../types/ri-pattern';

const DEFAULT_RI_PATTERN: RiPattern = {
  separator: '::',
  wildcard: '*',
  resource: '[\\w-]*',
};

const escapeRegex = (text: string) => text.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');

/**
 * Ri definition:
 * - User X belongs to org Y, the ri would be: `orgs::Y::users::X`
 * - Product Z belongs to user X: `orgs::Y::users::X::products::Z`
 * - Org Y has payment section: `orgs::Y::payments::payment-id-94kd03`
 * - Org Y has settings section: `orgs::Y::settings::setting-id-j8e84`
 *
 * Use cases and corresponding permissions:
 * - Access settings at any organization, including all settings' children resources: `orgs::*::settings`
 * - Access users at any organization, including all user's children resources: `orgs::*::users`
 * - Access users and their resources on specific org ID: `orgs::Y::users`
 * - Access user X on organization Y: `orgs::Y::users::X`
 * - Access users, excluding user's children resources at any organization: `orgs::*::users::*`
 * - Access users, excluding user's children resources at organization Y: `orgs::Y::users::*`
 * - Access products of users at any organization: `orgs::*::users::*::products`
 * - Access products of user X at organization Y: `orgs::*::users::X::products`
 * - Access product Z of user X at organization Y: `orgs::Y::users::X::products::Z`
 */
export default class NestedRiOperator implements RiOperator {
  constructor(
    private riPattern: RiPattern = DEFAULT_RI_PATTERN
  ) {}

  isMatch(ri: string, permissionRi: string) {
    return this.getTestableRi(permissionRi).test(ri);
  }

  private getTestableRi(ri: string) {
    const resourceWildcardRegex = new RegExp(`${escapeRegex(this.riPattern.wildcard)}${this.riPattern.separator}`, 'g');
    const endWildcardRegex = new RegExp(`${escapeRegex(this.riPattern.wildcard)}$`);
    const testableRi =
      ri
        // replace all the wildcard that appears at start and center of a ri
        .replace(resourceWildcardRegex, `${this.riPattern.resource}${this.riPattern.separator}`)
        // if the wildcard appears at the end, mean we only support up to that level
        .replace(endWildcardRegex, `${this.riPattern.resource}$`);

    return new RegExp(`^${testableRi}`);
  }
}
