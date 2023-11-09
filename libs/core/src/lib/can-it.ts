import { Request } from './types/request';
import { Permission, PolicyState } from './types/policy-state';
import { Comparator } from '@can-it/shared/types';
export class CanIt {
  constructor(
    private policyState: PolicyState,
    private actionOperator: Comparator,
    private riOperator: Comparator,
  ) {}

  allowTo(action: string, resourceIdentity: string) {
    if (this.policyState.deny?.find(p => this.isRequestDenied([action, resourceIdentity], p))) {
      return false;
    }

    return !!this.policyState.allow.find(p => this.isRequestAllowed([action, resourceIdentity], p));
  }

  private isRequestDenied(request: Request, permission: Permission) {
    const [rAction, rRi] = request;
    const [action, ri] = permission;
    return this.riOperator.isDenied(rRi, ri) && this.actionOperator.isDenied(rAction, action);
  }

  private isRequestAllowed(request: Request, permission: Permission) {
    const [rAction, rRi] = request;
    const [action, ri] = permission;
    return this.riOperator.isAllowed(rRi, ri) && this.actionOperator.isAllowed(rAction, action);
  }
}
