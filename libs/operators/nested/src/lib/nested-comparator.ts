import { Comparator } from "@can-it/shared/types";
import { NestedPattern } from '../types/nested-pattern';
import { DEFAULT_RI_PATTERN } from './constants';
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
export class NestedComparator implements Comparator {
  constructor(
    private riPattern: NestedPattern = DEFAULT_RI_PATTERN
  ) {}

  isAllowed(ri: string, permissionRi: string) {
    return this.getTestableRi(permissionRi).test(ri);
  }

  isDenied(reqRi: string, permRi: string): boolean {
    return this.isAllowed(reqRi, permRi);
  }

  private getTestableRi(ri: string) {
    const resourceWildcardRegex = new RegExp(`${escapeRegex(this.riPattern.wildcard + this.riPattern.separator)}`, 'g');
    const endWildcardRegex = new RegExp(`${escapeRegex(this.riPattern.separator + this.riPattern.wildcard)}$`);
    const testableRi =
      ri
        // replace all the wildcard that appears at start and center of a ri
        .replace(resourceWildcardRegex, `${this.riPattern.resourceRegex}${this.riPattern.separator}`)
        // if the wildcard appears at the end, mean we only support up to that level
        .replace(endWildcardRegex, `(${this.riPattern.separator}${this.riPattern.resourceRegex})?$`);

    return new RegExp(`^${testableRi}`);
  }
}
