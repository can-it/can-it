import { ActionOperator } from '../types/action-operator';

export class EqualActionOperator implements ActionOperator {
  isMatch(requestAction: string, permissionAction: string) {
    return requestAction === permissionAction;
  }
}
