import { Request } from './types/request';
import { Permission, PolicyState } from './types/policy-state';
import { ActionOperator } from './types/action-operator';
import { RiOperator } from './types/ri-operator';
export class CanIt {
  constructor(
    private policyState: PolicyState,
    private actionOperator: ActionOperator,
    private riOperator: RiOperator
  ) {}

  allowTo(action: string, resourceIdentity: string) {
    if (this.policyState.deny?.find(p => this.isPermissionMatched([action, resourceIdentity], p))) {
      return false;
    }
  
    return !!this.policyState.allow.find(p => this.isPermissionMatched([action, resourceIdentity], p));
  }

  private isPermissionMatched(request: Request, permission: Permission) {
    const [rAction, rRi] = request;
    const [action, ri] = permission;
    return this.riOperator.isMatch(rRi, ri) && this.actionOperator.isMatch(rAction, action);
  }
}
