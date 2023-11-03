import { Comparator } from '../types/comparator';

export class ExactComparator implements Comparator {
  isAllowed(requestCode: string, permissionCode: string) {
    return requestCode === permissionCode;
  }

  isDenied(requestCode: string, permissionCode: string): boolean {
    return this.isAllowed(requestCode, permissionCode);
  }
}
