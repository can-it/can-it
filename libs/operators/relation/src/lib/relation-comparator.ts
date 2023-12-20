import { Comparator } from '@can-it/types';

/**
 * ```typescript
 *  const operator = new RelationActionOperator(
 *    ['create', 'edit', 'delete', 'get', '*'],
 *    {
 *      edit: ['get'], // The "edit" action allows performing the "get" action.
 *      create: ['edit', 'get'], // The "create" action allows performing the "edit" and "get" actions.
 *      ['*']: ['create', 'edit', 'delete', 'get'] // The "*" action allows performing all other actions.
 *    }
 *  );
 *
 *  operator.isAllowed('create', '*'); // true
 *  operator.isAllowed('get', 'edit'); // true
 *  operator.isAllowed('get', 'get'); // true
 *  operator.isAllowed('delete', 'delete'); // true
 *  operator.isAllowed('get', 'create'); // false
 *  operator.isAllowed('get', 'delete'); // false
 *
 *
 *  operator.isDenied('create', 'create'); // true
 *
 *  // Note: If the permission deny policy includes 'create', and 'create' can still perform 'edit' in the allow policy,
 *  // it will not deny 'edit'.
 *  operator.isDenied('edit', 'create'); // false
 * ```
 */
export class RelationComparator implements Comparator {
  private relationship: Record<string, string[]>;
  private codes: string[];

  constructor(codes: string[], relationship: Record<string, string[]>) {
    this.codes = codes;
    this.relationship = relationship;
    this.validateRelationship();
  }

  /**
   * - actions: `['view', 'click']`
   * - relationship: `{ click: ['view'] }`
   *
   * Meaning:
   * - Denying **"click"** in the state means only denying **"click"**, it does not imply denying **"view"**.
   * - Denying **"view"** in the state means only denying **"view"**, it does not imply denying **"click"**.
   */
  isDenied(requestCode: string, permissionCode: string): boolean {
    return requestCode === permissionCode;
  }

  isAllowed(requestCode: string, permissionCode: string) {
    if (!this.codes.includes(requestCode)) {
      return false;
    }

    if (this.isBiggestCode(permissionCode)) {
      return true;
    }

    return (this.relationship[permissionCode] || []).concat(permissionCode).includes(requestCode);
  }

  /**
   * the biggest code which has the empty array ([]) in the `relationship` object passed via this constructor.
   * Which has the value included all other codes in the `codes` passed via this constructor
   */
  private isBiggestCode(permissionCode: string) {
    if (!this.relationship[permissionCode]) {
      return false;
    }

    return this.relationship[permissionCode].length === 0;
  }

  private validateRelationship() {
    const code = Object.keys(this.relationship).find(code => !this.codes.includes(code));

    if (code) {
      throw new Error(`${code} not found in codes ${this.codes}`);
    }
  }
}
