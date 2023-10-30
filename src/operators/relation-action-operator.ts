import ActionOperator from '../types/action-operator';

interface ActionValue {
  [action: string]: number;
}

export default class RelationActionOperator implements ActionOperator {
  private relationValues!: ActionValue;
  private definitionValues!: ActionValue;
  
  constructor(
    actions: string[],
    relationship: Record<string, string[]>
  ) {
    this.formatActionRelation(actions, relationship!);
  }
  
  isMatch(requestAction: string, permissionAction: string) {
    return !!(this.definitionValues[requestAction]! & this.relationValues[permissionAction]!);
  }

  /**
   * Define bit flags for each action, and we can easily compare after that,
   * if a action that contains other it will have the sum of those action values
   * create, edit, delete, read = [1,2,4,8]
   * - create: edit, read = 2 + 8 + 1 = 11
   * - edit: read = 8 + 2 = 10
   * - delete: read = 8 + 4 = 12
   * - read = 8
   */ 
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
        this.definitionValues[action] || 0
      );

      pre[action] = relationValue;
      return pre;
    }, {} as ActionValue);
  }
}
