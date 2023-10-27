import RiOperator from '../types/ri-operator';

export default class EqualRiOperator implements RiOperator {
  generate(ri: string) {
    return ri;
  }

  isMatch(requestRi: string, permissionRi: string) {
    return requestRi === permissionRi;
  }
}
