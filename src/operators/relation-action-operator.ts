import ActionOperator from '../types/action-operator';

export default class RelationActionOperator implements ActionOperator {
  private actionValues: Record<string, number>;
  
  constructor(
    actions: string[],
    relationship: Record<string, string[]>
  ) {
    this.actionValues = this.defineActionFamily(actions, relationship!);
  }
  
  isMatch(requestAction: string, permissionAction: string) {
    return !!(this.getActionValue(requestAction) & this.getActionValue(permissionAction));
  }

  private getActionValue(action: string) {
    return this.actionValues[action] || 0;
  }

  private defineActionFamily(actions: string[], relationship: Record<string, string[]>) {
    console.log(actions, relationship);
    // define action relation values for each one.
    return {};
  }
}
