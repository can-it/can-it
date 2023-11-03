import { Comparator } from '../types/comparator';

interface ActionValue {
  [action: string]: number;
}

const MAX_SUPPORT_BITS = 32; // bytes
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
  private relationValues!: ActionValue;
  private definitionValues!: ActionValue;
  
  constructor(
    actions: string[],
    relationship: Record<string, string[]>
  ) {
    // TODO:: I will improve this problem later
    if (actions.length > MAX_SUPPORT_BITS) {
      throw new Error(`This comparator only supports up to ${MAX_SUPPORT_BITS} codes.
You provided ${actions.length} codes. The codes you provided are:
    [${actions.toString()}]`);
    }
    this.formatActionRelation(actions, relationship!);
  }
  
  isAllowed(requestCode: string, permissionCode: string) {
    return !!(this.definitionValues[requestCode]! & this.relationValues[permissionCode]!);
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

  private formatActionRelation(actions: string[], relationship: Record<string, string[]>) {
    this.definitionValues = actions.reduce(
      (pre, cur, index) => {
        pre[cur] = 1 << index;
        return pre;
      },
      {} as ActionValue
    );

    this.relationValues = actions.reduce((pre, action) => {
      const relationValue = (relationship[action] || []).reduce(
        (sum, v) => sum + (this.definitionValues[v] || 0),
        this.definitionValues[action]!
      );

      pre[action] = relationValue;
      return pre;
    }, {} as ActionValue);
  }
}
