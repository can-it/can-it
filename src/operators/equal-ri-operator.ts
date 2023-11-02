import { RiOperator } from '../types/ri-operator';

export class EqualRiOperator implements RiOperator {
  isMatch(requestRi: string, permissionRi: string) {
    return requestRi === permissionRi;
  }
}
